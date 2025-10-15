/* ai-quiz-topic.js — versi full final, auto-scroll, tombol selalu terlihat */
(function(){
  'use strict';

  const API_PROXY = (typeof API_PROXY_URL !== 'undefined') ? API_PROXY_URL : '/api/correct';
  const MODEL = (typeof OPENAI_MODEL !== 'undefined') ? OPENAI_MODEL : 'gpt-4o-mini';
  const FETCH_TIMEOUT = 30000; // ms

  const qs = sel => document.querySelector(sel);
  const qsa = sel => Array.from(document.querySelectorAll(sel));

  let STATE = {
    user: { name:'', kelas:'' },
    config: { count:10, lang:'id', topic:'' },
    questions: [],
    answers: [],
    current: 0
  };

  // ---------- Init ----------
  function init(){
    document.addEventListener('DOMContentLoaded', ()=> {
      wireGlobalButtons();
      showIntro();
      const ov = qs('#quiz-overlay'); if(ov) ov.style.display = 'flex';
    });
  }

  function wireGlobalButtons(){
    safeOn('#quiz-close','click', closeOverlay);
    safeOn('#q-cancel','click', closeOverlay);
    safeOn('#q-start','click', startQuiz);
    safeOn('#quiz-abort','click', ()=> location.reload());
    safeOn('#prev-q','click', prevQuestion);
    safeOn('#next-q','click', nextQuestion);
    safeOn('#finish-q','click', finishAndScore);
    safeOn('#download-pdf','click', downloadPDF);
    safeOn('#retry-quiz','click', ()=> location.reload());
    document.addEventListener('keydown', (e)=>{
      if(e.key==='Escape') closeOverlay();
      if(e.key==='ArrowRight') nextQuestion();
      if(e.key==='ArrowLeft') prevQuestion();
    });
  }

  function safeOn(sel,event,handler){ const el=qs(sel); if(el) el.addEventListener(event,handler); }

  function showIntro(){ toggleScreens('intro'); }
  function toggleScreens(which){
    const map={intro:'#quiz-intro',quiz:'#quiz-screen',result:'#quiz-result'};
    Object.keys(map).forEach(k=>{
      const el=qs(map[k]); if(!el) return;
      el.style.display=(k===which)?'block':'none';
    });
  }

  function closeOverlay(){ const ov=qs('#quiz-overlay'); if(ov) ov.style.display='none'; }

  // ---------- Start Quiz ----------
  async function startQuiz(){
    const nameEl=qs('#q-name'),classEl=qs('#q-class'),topicEl=qs('#q-topic'),countEl=qs('#q-count');
    if(!nameEl||!classEl||!topicEl||!countEl){ alert('Elemen form tidak ditemukan'); return; }
    const name=nameEl.value.trim(), kelas=classEl.value.trim(), topic=topicEl.value.trim(), count=Number(countEl.value)||10;
    const langRadio=document.querySelector('input[name="lang"]:checked'); const lang=langRadio?langRadio.value:'id';
    if(!name||!kelas||!topic){ alert('Isi Nama, Kelas, dan Topik terlebih dahulu.'); return; }

    STATE.user.name=name; STATE.user.kelas=kelas;
    STATE.config.count=count; STATE.config.lang=lang; STATE.config.topic=topic;

    toggleScreens('quiz'); updateSummaryHeader();

    const wrap=qs('#questions-wrap');
    if(wrap) wrap.innerHTML=`<div class="question-card"><p class="muted">💭 AI sedang membuat ${count} soal untuk topik "${escapeHtml(topic)}"... Mohon tunggu.</p></div>`;

    try{
      const payload=await fetchQuestionsFromAI(topic,count,lang);
      const normalized=normalizeQuestions(payload.questions||[],count);
      STATE.questions=normalized;
      STATE.answers=STATE.questions.map(()=>({choice:null,locked:false,review:null}));
      STATE.current=0;
      renderAllQuestions();
      showQuestionAt(0);
      updateSummary();
    }catch(err){
      console.error('fetchQuestionsFromAI error',err);
      if(wrap) wrap.innerHTML=`<div class="question-card"><p class="muted" style="color:#b00">Gagal membuat soal: ${escapeHtml(err.message)}</p></div>`;
      setTimeout(()=>showIntro(),2500);
    }
  }

  function updateSummaryHeader(){
    safeSetText('#summary-name',STATE.user.name);
    safeSetText('#summary-class',STATE.user.kelas);
    safeSetText('#summary-topic',STATE.config.topic);
    safeSetText('#summary-count',STATE.config.count);
  }

  function safeSetText(sel,txt){ const el=qs(sel); if(el) el.textContent=txt; }

  // ---------- Fetch Questions ----------
  function buildPromptForTopic(topic,count,lang){
    const languageNote=lang==='ternate'?'Semua soal dan opsi HARUS dalam BAHASA TERNATE. Sertakan terjemahan singkat pertanyaan ke Bahasa Indonesia pada field translation_id.':'Semua soal dan opsi HARUS dalam BAHASA INDONESIA.';
    return [
      {role:'system',content:'Kamu adalah pembuat soal pilihan ganda profesional. Output HARUS JSON.'},
      {role:'user',content:`Buat ${count} soal pilihan ganda (MCQ) tentang topik: "${topic}". ${languageNote}\nFormat OUTPUT HARUS persis JSON tanpa teks tambahan.\n{\n  "questions":[{"question":"...","choices":{"A":"...","B":"...","C":"...","D":"..."},"answer":"A","translation_id":"..."}]\n}\nAturan:\n- 'answer' harus salah satu key dari choices.\n- Pertanyaan faktual, jelas, sesuai topik.\n- Setiap soal unik.\n- Jangan sertakan jawaban di teks soal.\n- Jika bahasa Ternate: sertakan terjemahan singkat ke Bahasa Indonesia di translation_id.\n- Output MURNI JSON.`}
    ];
  }

  async function fetchQuestionsFromAI(topic,count,lang){
    const messages=buildPromptForTopic(topic,count,lang);
    const body={model:MODEL,messages,temperature:0.7,max_tokens:1600};
    const controller=new AbortController();
    const id=setTimeout(()=>controller.abort(),FETCH_TIMEOUT);
    let resp;
    try{
      resp=await fetch(API_PROXY,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:controller.signal});
    }catch(err){ clearTimeout(id); throw new Error('Gagal terhubung ke AI'); }
    clearTimeout(id);
    if(!resp.ok) throw new Error('AI gagal merespons: '+resp.status);
    const j=await resp.json();
    const text=j?.choices?.[0]?.message?.content||j?.result||JSON.stringify(j);
    const parsed=tryParseJSON(text);
    if(parsed&&Array.isArray(parsed.questions)) return parsed;
    throw new Error('AI tidak mengembalikan JSON soal yang valid.');
  }

  // ---------- Normalize ----------
  function normalizeQuestions(arr,expectedCount){
    const out=[];
    for(let i=0;i<arr.length;i++){
      const q=arr[i]||{};
      const choices=q.choices||{};
      ['A','B','C','D'].forEach(L=>{ if(!(L in choices)) choices[L]=''; });
      out.push({question:q.question||'[soal kosong]',choices,answer:(q.answer||'A').toUpperCase(),translation_id:q.translation_id||''});
    }
    while(out.length<expectedCount){ out.push({question:`Soal cadangan ${out.length+1}`,choices:{A:'A',B:'B',C:'C',D:'D'},answer:'A',translation_id:''}); }
    if(out.length>expectedCount) out.length=expectedCount;
    return out;
  }

  // ---------- Render ----------
  function renderAllQuestions(){
    const wrap=qs('#questions-wrap'); if(!wrap) return;
    wrap.innerHTML='';
    STATE.questions.forEach((q,idx)=>{
      const card=document.createElement('div'); card.className='question-card'; card.dataset.idx=idx;
      card.innerHTML=buildQuestionHtml(q,idx);
      wrap.appendChild(card);
    });
    wireChoiceDelegation(); wireAnswerButtons();
  }

  function buildQuestionHtml(q,idx){
    const num=idx+1;
    let html=`<div class="q-number">Soal ${num}</div>`;
    html+=`<div class="q-text">${escapeHtml(q.question)}</div>`;
    html+=`<div class="choices-wrap">`;
    ['A','B','C','D'].forEach(L=>{ html+=`<div class="choice" data-idx="${idx}" data-choice="${L}"><div class="letter">${L}</div><div class="choice-text">${escapeHtml(q.choices[L]||'')}</div></div>`; });
    html+=`</div><div style="margin-top:10px; display:flex; gap:8px; align-items:center;"><button class="btn-ghost btn-answer" data-idx="${idx}">Jawab & Kunci</button><div id="label-${idx}" class="small-muted" style="margin-left:8px"></div></div>`;
    html+=`<div id="result-${idx}" style="margin-top:10px;"></div>`;
    if(STATE.config.lang==='ternate') html+=`<div class="small-muted" style="margin-top:8px">Terjemahan (ID): ${escapeHtml(q.translation_id||'')}</div>`;
    return html;
  }

  // ---------- Choice Delegation ----------
  function wireChoiceDelegation(){
    const wrap=qs('#questions-wrap'); if(!wrap) return;
    wrap.removeEventListener('click', choiceClickHandlerProxy);
    wrap.addEventListener('click', choiceClickHandlerProxy);
  }
  function choiceClickHandlerProxy(e){
    const el=e.target.closest('.choice'); if(!el) return;
    const idx=Number(el.dataset.idx), choice=el.dataset.choice; if(isNaN(idx)||!choice) return;
    if(!STATE.answers[idx]) STATE.answers[idx]={choice:null,locked:false,review:null};
    if(STATE.answers[idx].locked) return;
    const card=el.closest('.question-card');
    if(card) card.querySelectorAll('.choice').forEach(c=>c.classList.remove('selected'));
    el.classList.add('selected');
    STATE.answers[idx].choice=choice;
  }

  function wireAnswerButtons(){ qsa('.btn-answer').forEach(btn=>{ btn.removeEventListener('click',onAnswerButtonProxy); btn.addEventListener('click',onAnswerButtonProxy); }); }
  function onAnswerButtonProxy(e){ const idx=Number(e.currentTarget.dataset.idx); if(isNaN(idx)) return; handleAnswer(idx).catch(console.error); }

  async function handleAnswer(idx){
    const q=STATE.questions[idx]; if(!q) return;
    if(STATE.answers[idx]&&STATE.answers[idx].locked){ alert('Soal ini sudah dijawab dan dikunci.'); return; }
    const chosen=STATE.answers[idx]?.choice; if(!chosen){ alert('Pilih salah satu opsi terlebih dahulu.'); return; }

    const resDiv=qs(`#result-${idx}`); if(resDiv) resDiv.innerHTML=`<div class="muted">Memeriksa jawaban... (AI)</div>`;
    try{
      const review=await reviewAnswerWithAI(q,chosen,STATE.config.lang);
      STATE.answers[idx]={choice:chosen,locked:true,review};
      const card=qs(`#questions-wrap .question-card[data-idx="${idx}"]`);
      if(card) card.querySelectorAll('.choice').forEach(c=>c.style.pointerEvents='none');
      const btn=qs(`.btn-answer[data-idx="${idx}"]`); if(btn) btn.disabled=true;
      if(resDiv){
        const per=computePerQuestionPoint();
        const earned=review.correct?per:0;
        let html=`<div style="padding:8px;border-radius:8px;background:#f9fefe;"><div><strong>Hasil:</strong> ${review.correct?'✅ Benar':'❌ Salah'} — Skor soal ini: ${earned.toFixed(2)}</div>`;
        if(review.reason) html+=`<div style="margin-top:8px;"><strong>Alasan:</strong><div style="margin-top:6px">${escapeHtml(review.reason)}</div></div>`;
        if(review.reason_id) html+=`<div style="margin-top:8px;"><strong>Terjemahan (ID):</strong><div style="margin-top:6px">${escapeHtml(review.reason_id)}</div></div>`;
        html+=`</div>`; resDiv.innerHTML=html;
      }
      const lbl=qs(`#label-${idx}`); if(lbl) lbl.textContent='✅ Dijawab';
      updateSummary();
    }catch(err){
      console.error('reviewAnswerWithAI error',err);
      const isCorrect=String(chosen).toUpperCase()===String(q.answer||'').toUpperCase();
      STATE.answers[idx]={choice:chosen,locked:true,review:{correct:isCorrect,reason:isCorrect?'Jawaban benar.':'Jawaban salah.',reason_id:isCorrect?'Jawaban benar.':'Jawaban salah.'}};
      updateSummary();
      if(resDiv) resDiv.innerHTML=`<div class="muted" style="color:#b00">Gagal menilai: ${escapeHtml(err.message)}</div>`;
    }
  }

  function computePerQuestionPoint(){ const total=STATE.questions.length||1; return 100/total; }
  function computeCurrentScore(){ const per=computePerQuestionPoint(); let sum=0; STATE.answers.forEach(a=>{ if(a&&a.locked&&a.review&&a.review.correct) sum+=per; }); return Math.min(100,Math.round(sum*100)/100); }
  function updateSummary(){ safeSetText('#summary-score',`${Math.round(computeCurrentScore())} / 100`); safeSetText('#quiz-progress',`Soal ${STATE.current+1} / ${STATE.questions.length}`); const done=STATE.answers.filter(a=>a&&a.locked).length; const s=qs('#qa-summary')||qs('#summary-score'); if(s) s.textContent=`Terjawab: ${done} dari ${STATE.questions.length}`; }

  // ---------- Navigation ----------
  function showQuestionAt(i){
    const cards=qsa('#questions-wrap .question-card');
    if(cards.length===0) return;
    if(i<0) i=0; if(i>=cards.length) i=cards.length-1;
    STATE.current=i;
    cards.forEach((c,idx)=>c.style.display=(idx===i?'block':'none'));
    const card=cards[i]; if(card) card.scrollIntoView({behavior:'smooth',block:'start'});
    updateSummary();
  }
  function nextQuestion(){ showQuestionAt(STATE.current+1); }
  function prevQuestion(){ showQuestionAt(STATE.current-1); }

  // ---------- AI review ----------
  async function reviewAnswerWithAI(questionObj,userChoice,lang){
    const sys={role:'system',content:'Kamu adalah penilai soal pilihan ganda. Kembalikan hasil dalam JSON.'};
    const user={role:'user',content:`Soal: ${questionObj.question}\nPilihan: ${JSON.stringify(questionObj.choices)}\nKunci: ${questionObj.answer}\nJawaban pengguna: ${userChoice}\n\nKeluaran JSON tunggal: { "correct": true|false, "reason":"...", "reason_id":"..." }`};
    const body={model:MODEL,messages:[sys,user],temperature:0.15};
    const controller=new AbortController();
    const id=setTimeout(()=>controller.abort(),FETCH_TIMEOUT);
    let resp;
    try{ resp=await fetch(API_PROXY,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:controller.signal}); }catch(err){ clearTimeout(id); throw new Error('Gagal menghubungi AI'); }
    clearTimeout(id); if(!resp.ok) throw new Error('AI review gagal: '+resp.status);
    const j=await resp.json(); const text=j?.choices?.[0]?.message?.content||j?.result||JSON.stringify(j);
    const parsed=tryParseJSON(text);
    if(parsed&&typeof parsed.correct!=='undefined') return {correct:!!parsed.correct,reason:parsed.reason||'',reason_id:parsed.reason_id||''};
    const isCorrect=String(userChoice).toUpperCase()===String(questionObj.answer||'').toUpperCase();
    return {correct:isCorrect,reason:isCorrect?'Jawaban benar.':'Jawaban salah.',reason_id:isCorrect?'Jawaban benar.':'Jawaban salah.'};
  }

  // ---------- Finish ----------
  async function finishAndScore(){
    if(STATE.questions.length===0) return alert('Belum ada soal.');
    const unanswered=STATE.answers.map((a,i)=>(!a||!a.locked)?i+1:null).filter(Boolean);
    if(unanswered.length&&!confirm(`Masih ada soal belum dijawab (nomor: ${unanswered.join(', ')}). Lanjutkan penilaian?`)) return;
    const final=computeCurrentScore();
    let comment='Kerja bagus! Terus semangat belajar.';
    try{
      const sys={role:'system',content:'Kamu adalah pembimbing, buat komentar singkat motivasi (jawaban: JSON).'};
      const user={role:'user',content:`Nama:${STATE.user.name}\nSkor:${final}\nOutput JSON: { "feedback":"..." }`};
      const body={model:MODEL,messages:[sys,user],temperature:0.7};
      const resp=await fetch(API_PROXY,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
      const j=await resp.json(); const text=j?.choices?.[0]?.message?.content||j?.result||JSON.stringify(j);
      const parsed=tryParseJSON(text);
      if(parsed?.feedback) comment=parsed.feedback;
    }catch(err){ console.warn('feedback AI gagal',err); }
    toggleScreens('result');
    safeSetText('#result-score',`${final} / 100`);
    safeSetText('#result-feedback',comment);
    // confetti
    if(typeof confetti==='function'){ confetti({particleCount:100,spread:70,origin:{y:0.6}}); }
  }

  function downloadPDF(){
  const wrap = qs('#questions-wrap');
  if(!wrap){ alert('Konten soal tidak ditemukan.'); return; }

  const pdfContent = document.createElement('div');
  pdfContent.style.padding = '20px';
  pdfContent.style.fontFamily = 'Arial, sans-serif';
  pdfContent.innerHTML = `
    <h2 style="text-align:center; color:#1f3c88;">Quiz Hasil</h2>
    <p><strong>Nama:</strong> ${escapeHtml(STATE.user.name)}<br>
    <strong>Kelas:</strong> ${escapeHtml(STATE.user.kelas)}<br>
    <strong>Topik:</strong> ${escapeHtml(STATE.config.topic)}<br>
    <strong>Skor:</strong> ${computeCurrentScore()} / 100</p>
    <hr style="border:1px solid #1f3c88;">
  `;

  STATE.questions.forEach((q,idx)=>{
    const userAnswer = STATE.answers[idx]?.choice || '-';
    const locked = STATE.answers[idx]?.locked;
    const review = STATE.answers[idx]?.review || {};
    pdfContent.innerHTML += `
      <div style="margin-bottom:15px; padding:10px; border-radius:8px; background:#f0f4ff;">
        <div style="font-weight:bold; color:#1f3c88;">Soal ${idx+1}:</div>
        <div>${escapeHtml(q.question)}</div>
        <ul style="list-style-type:none; padding-left:0; margin-top:8px;">
          <li>A. ${escapeHtml(q.choices.A)}</li>
          <li>B. ${escapeHtml(q.choices.B)}</li>
          <li>C. ${escapeHtml(q.choices.C)}</li>
          <li>D. ${escapeHtml(q.choices.D)}</li>
        </ul>
        <div><strong>Jawaban Anda:</strong> ${escapeHtml(userAnswer)} ${locked ? `(Benar: ${review.correct?'✅':'❌'})` : '(Belum dijawab)'}</div>
        ${review.reason ? `<div><em>Alasan:</em> ${escapeHtml(review.reason)}</div>` : ''}
        ${review.reason_id ? `<div><em>Terjemahan (ID):</em> ${escapeHtml(review.reason_id)}</div>` : ''}
      </div>
    `;
  });

  if(typeof html2pdf === 'undefined'){
    alert('html2pdf.js belum dimuat! Tambahkan <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>');
    return;
  }

  const opt = {
    margin: 10,
    filename: `Quiz_${STATE.user.name}_${STATE.config.topic}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(pdfContent).save();
}

  // ---------- Utils ----------
  function escapeHtml(s){ if(s==null) return ''; return String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }
  function tryParseJSON(txt){ try{return JSON.parse(txt);}catch(e){return null;} }

  // ---------- Mount ----------
  init();
})();

