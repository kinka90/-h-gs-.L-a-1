/* ai-quiz-topic.js — versi scrollable + highlight soal aktif */
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

    document.addEventListener('keydown', (e)=> {
      if(e.key === 'Escape') closeOverlay();
      if(e.key === 'ArrowRight') nextQuestion();
      if(e.key === 'ArrowLeft') prevQuestion();
    });
  }

  function safeOn(selector, event, handler){
    const el = qs(selector);
    if(!el) return;
    el.addEventListener(event, handler);
  }

  function showIntro(){ toggleScreens('intro'); }
  function toggleScreens(which){
    const map = { intro:'#quiz-intro', quiz:'#quiz-screen', result:'#quiz-result' };
    Object.keys(map).forEach(k=>{
      const el = qs(map[k]);
      if(!el) return;
      el.style.display = (k===which) ? 'block' : 'none';
    });
  }
  function closeOverlay(){ const ov = qs('#quiz-overlay'); if(ov) ov.style.display='none'; }

  // ---------- start quiz ----------
  async function startQuiz(){
    const nameEl = qs('#q-name'), classEl = qs('#q-class'), topicEl = qs('#q-topic'), countEl = qs('#q-count');
    if(!nameEl || !classEl || !topicEl || !countEl){ alert('Form tidak ditemukan'); return; }
    const name = nameEl.value.trim(), kelas = classEl.value.trim(), topic = topicEl.value.trim();
    const count = Number(countEl.value) || 10;
    const langRadio = document.querySelector('input[name="lang"]:checked');
    const lang = langRadio ? langRadio.value : 'id';
    if(!name || !kelas || !topic){ alert('Isi Nama, Kelas, Topik terlebih dahulu'); return; }

    STATE.user = { name, kelas };
    STATE.config = { count, lang, topic };

    toggleScreens('quiz');
    updateSummaryHeader();

    const wrap = qs('#questions-wrap');
    if(wrap) wrap.innerHTML = `<div class="question-card"><p class="muted">💭 AI sedang membuat ${count} soal untuk topik "${escapeHtml(topic)}" (bahasa ${lang})... Mohon tunggu.</p></div>`;

    try {
      const payload = await fetchQuestionsFromAI(topic,count,lang);
      const normalized = normalizeQuestions(payload.questions || [], count);
      STATE.questions = normalized;
      STATE.answers = STATE.questions.map(()=> ({ choice:null, locked:false, review:null }));
      STATE.current = 0;
      renderAllQuestions();
      showQuestionAt(0);
      updateSummary();
    } catch(err){
      console.error(err);
      if(wrap) wrap.innerHTML = `<div class="question-card"><p class="muted" style="color:#b00">Gagal membuat soal: ${escapeHtml(err.message)}</p></div>`;
      setTimeout(()=> showIntro(), 2500);
    }
  }

  function updateSummaryHeader(){
    safeSetText('#summary-name', STATE.user.name);
    safeSetText('#summary-class', STATE.user.kelas);
    safeSetText('#summary-topic', STATE.config.topic);
    safeSetText('#summary-count', STATE.config.count);
  }
  function safeSetText(sel, txt){ const el = qs(sel); if(el) el.textContent = txt; }

  // ---------- AI request ----------
  function buildPromptForTopic(topic,count,lang){
    const languageNote = lang==='ternate'
      ? 'Semua soal dan opsi HARUS dalam BAHASA TERNATE. Sertakan terjemahan singkat pertanyaan ke Bahasa Indonesia di translation_id.'
      : 'Semua soal dan opsi HARUS dalam BAHASA INDONESIA.';
    return [
      { role:'system', content:'Kamu pembuat soal MCQ profesional. Output HARUS JSON.' },
      { role:'user', content:
        `Buat ${count} soal MCQ topik: "${topic}". ${languageNote}\nFormat JSON persis:\n`+
        `{"questions":[{"question":"...","choices":{"A":"...","B":"...","C":"...","D":"..."},"answer":"A","translation_id":"..."},...]}\n`+
        `Aturan:\n- 'answer' salah satu key choices\n- soal faktual, jelas, unik\n- jangan sertakan jawaban di teks soal\n- jika bahasa Ternate sertakan translation_id\n- output MURNI JSON`
      }
    ];
  }

  async function fetchQuestionsFromAI(topic,count,lang){
    const messages = buildPromptForTopic(topic,count,lang);
    const body = { model:MODEL, messages, temperature:0.7, max_tokens:1600 };
    const controller = new AbortController();
    const id = setTimeout(()=> controller.abort(), FETCH_TIMEOUT);
    let resp;
    try { resp = await fetch(API_PROXY,{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body), signal:controller.signal }); }
    catch(e){ clearTimeout(id); throw new Error('Gagal terhubung AI'); }
    clearTimeout(id);
    if(!resp.ok) throw new Error('AI gagal merespons: '+resp.status);
    const j = await resp.json();
    const text = j?.choices?.[0]?.message?.content || j?.result || JSON.stringify(j);
    const parsed = tryParseJSON(text);
    if(parsed && Array.isArray(parsed.questions)) return parsed;
    throw new Error('AI tidak mengembalikan JSON valid');
  }

  function normalizeQuestions(arr,expectedCount){
    const out = [];
    for(let i=0;i<arr.length;i++){
      const q=arr[i]||{}; const choices = q.choices||{};
      ['A','B','C','D'].forEach(L=>{ if(!(L in choices)) choices[L]=''; });
      out.push({ question:q.question||'[soal kosong]', choices, answer:(q.answer||'A').toUpperCase(), translation_id:q.translation_id||'' });
    }
    while(out.length<expectedCount) out.push({ question:`Soal cadangan ${out.length+1}`, choices:{A:'A',B:'B',C:'C',D:'D'}, answer:'A', translation_id:'' });
    if(out.length>expectedCount) out.length=expectedCount;
    return out;
  }

  // ---------- render ----------
  function renderAllQuestions(){
    const wrap = qs('#questions-wrap'); if(!wrap){ console.warn('questions-wrap tidak ditemukan'); return; }
    wrap.innerHTML='';
    STATE.questions.forEach((q,idx)=>{
      const card = document.createElement('div');
      card.className='question-card';
      card.dataset.idx=idx;
      card.innerHTML = buildQuestionHtml(q,idx);
      wrap.appendChild(card);
    });
    wireChoiceDelegation();
    wireAnswerButtons();
  }

  function buildQuestionHtml(q,idx){
    const num=idx+1;
    let html=`<div class="q-number">Soal ${num}</div>`;
    html+=`<div class="q-text">${escapeHtml(q.question)}</div>`;
    html+=`<div class="choices-wrap">`;
    ['A','B','C','D'].forEach(L=>{
      html+=`<div class="choice" data-idx="${idx}" data-choice="${L}"><div class="letter">${L}</div><div class="choice-text">${escapeHtml(q.choices[L])}</div></div>`;
    });
    html+=`</div>`;
    html+=`<div style="margin-top:10px; display:flex; gap:8px; align-items:center;"><button class="btn-ghost btn-answer" data-idx="${idx}">Jawab & Kunci</button><div id="label-${idx}" class="small-muted" style="margin-left:8px"></div></div>`;
    html+=`<div id="result-${idx}" style="margin-top:10px;"></div>`;
    if(STATE.config.lang==='ternate') html+=`<div class="small-muted" style="margin-top:8px">Terjemahan (ID): ${escapeHtml(q.translation_id)}</div>`;
    return html;
  }

  function wireChoiceDelegation(){
    const wrap = qs('#questions-wrap'); if(!wrap) return;
    wrap.removeEventListener('click', choiceClickHandlerProxy);
    wrap.addEventListener('click', choiceClickHandlerProxy);
  }
  function choiceClickHandlerProxy(e){
    const el = e.target.closest('.choice'); if(!el) return;
    const idx = Number(el.dataset.idx), choice=el.dataset.choice;
    if(isNaN(idx)||!choice) return;
    if(!STATE.answers[idx]) STATE.answers[idx]={ choice:null, locked:false, review:null };
    if(STATE.answers[idx].locked) return;
    const card = el.closest('.question-card');
    if(card) card.querySelectorAll('.choice').forEach(c=>c.classList.remove('selected'));
    el.classList.add('selected');
    STATE.answers[idx].choice=choice;
  }

  function wireAnswerButtons(){
    qsa('.btn-answer').forEach(btn=>{
      btn.removeEventListener('click', onAnswerButtonProxy);
      btn.addEventListener('click', onAnswerButtonProxy);
    });
  }
  function onAnswerButtonProxy(e){ const idx=Number(e.currentTarget.dataset.idx); if(isNaN(idx)) return; handleAnswer(idx).catch(console.error); }

  async function handleAnswer(idx){
    const q = STATE.questions[idx]; if(!q) return;
    if(STATE.answers[idx] && STATE.answers[idx].locked){ alert('Soal sudah dikunci'); return; }
    const chosen = STATE.answers[idx] && STATE.answers[idx].choice;
    if(!chosen) { alert('Pilih opsi terlebih dahulu'); return; }
    const resDiv = qs(`#result-${idx}`); if(resDiv) resDiv.innerHTML='<div class="muted">Memeriksa jawaban... (AI)</div>';
    try {
      const review = await reviewAnswerWithAI(q,chosen,STATE.config.lang);
      STATE.answers[idx]={ choice:chosen, locked:true, review };
      const card = qs(`#questions-wrap .question-card[data-idx="${idx}"]`);
      if(card) card.querySelectorAll('.choice').forEach(c=>c.style.pointerEvents='none');
      const btn = qs(`.btn-answer[data-idx="${idx}"]`); if(btn) btn.disabled=true;

      const perPoint = computePerQuestionPoint();
      const earned = review.correct ? perPoint : 0;
      let html = `<div style="padding:8px;border-radius:8px;background:#f9fefe;"><div><strong>Hasil:</strong> ${review.correct?'✅ Benar':'❌ Salah'} — Skor soal ini: ${earned.toFixed(2)}</div>`;
      if(review.reason) html+=`<div style="margin-top:8px;"><strong>Alasan:</strong><div style="margin-top:6px">${escapeHtml(review.reason)}</div></div>`;
      if(review.reason_id) html+=`<div style="margin-top:8px;"><strong>Terjemahan (ID):</strong><div style="margin-top:6px">${escapeHtml(review.reason_id)}</div></div>`;
      html+='</div>';
      if(resDiv) resDiv.innerHTML=html;

      const lbl = qs(`#label-${idx}`); if(lbl) lbl.textContent='✅ Dijawab';
      updateSummary();
    } catch(err){
      console.error(err);
      const isCorrect = String(chosen).toUpperCase()===String(q.answer||'').toUpperCase();
      STATE.answers[idx]={ choice:chosen, locked:true, review:{ correct:isCorrect, reason:isCorrect?'Jawaban benar.':'Jawaban salah.', reason_id:isCorrect?'Jawaban benar.':'Jawaban salah.' } };
      updateSummary();
    }
  }

  function computePerQuestionPoint(){ return 100/(STATE.questions.length||1); }
  function computeCurrentScore(){ let sum=0; const per=computePerQuestionPoint(); STATE.answers.forEach(a=>{ if(a && a.locked && a.review && a.review.correct) sum+=per; }); return Math.min(100, Math.round(sum*100)/100); }
  function updateSummary(){
    safeSetText('#summary-score', `${Math.round(computeCurrentScore())} / 100`);
    safeSetText('#quiz-progress', `Soal ${STATE.current+1} / ${STATE.questions.length}`);
    const done = STATE.answers.filter(a=>a&&a.locked).length;
    const s = qs('#qa-summary')||qs('#summary-score'); if(s) s.textContent=`Terjawab: ${done} dari ${STATE.questions.length}`;
  }

  // ---------- navigation + scroll ----------
  function showQuestionAt(i){
    const cards = qsa('#questions-wrap .question-card');
    if(cards.length===0) return;
    if(i<0) i=0; if(i>=cards.length) i=cards.length-1;
    STATE.current=i;
    cards.forEach((c,idx)=>c.classList.toggle('active-question',idx===i));
    const target = cards[i]; if(target) target.scrollIntoView({behavior:'smooth', block:'center'});
    updateSummary();
  }
  function nextQuestion(){ if(STATE.current<STATE.questions.length-1) showQuestionAt(STATE.current+1); }
  function prevQuestion(){ if(STATE.current>0) showQuestionAt(STATE.current-1); }

  async function reviewAnswerWithAI(q, choice, lang){
    const sys={role:'system',content:'Kamu penilai soal MCQ. Output JSON'};
    const user={role:'user',content:`Soal: ${q.question}\nPilihan: ${JSON.stringify(q.choices)}\nKunci: ${q.answer}\nJawaban pengguna: ${choice}\nJSON: { "correct":true|false,"reason":"...","reason_id":"..." }`};
    const body={ model:MODEL, messages:[sys,user], temperature:0.15 };
    const controller=new AbortController();
    const id=setTimeout(()=>controller.abort(), FETCH_TIMEOUT);
    let resp;
    try{ resp=await fetch(API_PROXY,{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body), signal:controller.signal }); }
    catch(e){ clearTimeout(id); throw new Error('Gagal menghubungi AI'); }
    clearTimeout(id);
    if(!resp.ok) throw new Error('AI review gagal: '+resp.status);
    const j = await resp.json();
    const text = j?.choices?.[0]?.message?.content || j?.result || JSON.stringify(j);
    const parsed = tryParseJSON(text);
    if(parsed && typeof parsed.correct!=='undefined') return { correct:!!parsed.correct, reason:parsed.reason||'', reason_id:parsed.reason_id||'' };
    const isCorrect = String(choice).toUpperCase()===String(q.answer||'').toUpperCase();
    return { correct:isCorrect, reason:isCorrect?'Jawaban benar.':'Jawaban salah.', reason_id:isCorrect?'Jawaban benar.':'Jawaban salah.' };
  }

  async function finishAndScore(){
    if(STATE.questions.length===0) return alert('Belum ada soal');
    const unanswered = STATE.answers.map((a,i)=>(!a||!a.locked)?i+1:null).filter(Boolean);
    if(unanswered.length && !confirm(`Masih ada soal belum dijawab: ${unanswered.join(', ')}. Lanjutkan?`)) return;
    const final=computeCurrentScore();

    let comment='Kerja bagus! Terus semangat belajar.';
    toggleScreens('result');
    safeSetText('#result-score',`${final} / 100`);
    safeSetText('#result-motivation',comment);
    safeSetText('#result-summary',`Nama: ${STATE.user.name}    Kelas: ${STATE.user.kelas}    Topik: ${STATE.config.topic}    Tanggal: ${(new Date()).toLocaleString()}`);

    const det = qs('#result-details'); if(det){
      det.innerHTML='';
      STATE.questions.forEach((q,i)=>{
        const a=STATE.answers[i]||{};
        const userChoice=a.choice||'(tidak dijawab)';
        const isCorrect=a.review&&a.review.correct;
        const reason=a.review&&(a.review.reason_id||a.review.reason)||'';
        const row = document.createElement('div');
        row.style.padding='10px'; row.style.borderBottom='1px solid rgba(3,59,99,0.04)';
        row.innerHTML=`<div style="font-weight:700;">${i+1}. ${escapeHtml(q.question)}</div>
          <div style="margin-top:6px;">Jawaban Anda: <strong>${escapeHtml(userChoice)}</strong> — ${isCorrect?'<span style="color:green">Benar</span>':'<span style="color:crimson">Salah</span>'}</div>
          <div style="margin-top:6px;">Kunci: <strong>${escapeHtml(q.answer)}</strong></div>
          <div style="margin-top:6px;color:var(--muted);">Alasan: ${escapeHtml(reason)}</div>`;
        det.appendChild(row);
      });
    }
    fireConfetti();
  }

  // ---------- download PDF ----------
  async function downloadPDF(){
    try {
      await ensureJsPDF();
    } catch(e){
      alert('Gagal muat engine PDF: ' + e.message);
      return;
    }
    const { jsPDF } = window.jspdf || window.jspPDF || {};
    if(!jsPDF){ alert('jsPDF tidak tersedia.'); return; }
    const doc = new jsPDF({ unit:'pt', format:'a4' });
    let y = 40;
    doc.setFontSize(14);
    doc.text('Lembar Ujian — AI Quiz', 40, y); y += 20;
    doc.setFontSize(10);
    doc.text(`Nama: ${STATE.user.name}    Kelas: ${STATE.user.kelas}`, 40, y); y += 14;
    doc.text(`Topik: ${STATE.config.topic}    Bahasa soal: ${STATE.config.lang === 'id' ? 'Indonesia' : 'Ternate'}`, 40, y); y += 14;
    doc.text(`Tanggal: ${(new Date()).toLocaleString()}`, 40, y); y += 18;

    const per = computePerQuestionPoint();
    let totalScore = computeCurrentScore();
    doc.text(`Skor akhir: ${totalScore} / 100`, 40, y); y += 18;

    doc.setFontSize(11);
    doc.text('Rincian soal:', 40, y); y += 14;
    STATE.questions.forEach((q,i) => {
      if(y > 720){ doc.addPage(); y = 40; }
      doc.text(`${i+1}. ${q.question}`, 40, y); y += 12;
      ['A','B','C','D'].forEach(L=>{
        const txt = q.choices[L] || '';
        doc.text(`   ${L}. ${txt}`, 56, y); y += 10;
      });
      const a = STATE.answers[i] || {};
      const ua = a.choice || '-';
      const isCorrect = a.review && a.review.correct;
      const score = isCorrect ? per : 0;
      doc.text(`   Jawaban Anda: ${ua}    Kunci: ${q.answer}    Skor: ${Math.round(score*100)/100}`, 56, y); y += 12;
      const reason = (a.review && (a.review.reason_id || a.review.reason)) || '';
      if(reason){
        const truncated = reason.length > 140 ? reason.slice(0,137) + '...' : reason;
        doc.text(`   Alasan: ${truncated}`, 56, y); y += 14;
      } else y += 6;
    });

    const fname = `lembar_ujian_${STATE.user.name.replace(/\s+/g,'_')}_${(new Date()).toISOString().slice(0,19).replace(/[:T]/g,'-')}.pdf`;
    doc.save(fname);
  }

  // ---------- confetti ----------
  async function fireConfetti(){
    try {
      if(!window.confetti) await loadScript('https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js');
      window.confetti && window.confetti({ particleCount: 100, spread: 65, origin: { y: 0.6 } });
    } catch(e){}
  }

  // ---------- helpers ----------
  function tryParseJSON(text){
    if(!text) return null;
    // direct parse
    try { return JSON.parse(text); } catch(e){}
    // code block
    const codeMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if(codeMatch){ try { return JSON.parse(codeMatch[1]); } catch(e){} }
    // find braces
    const s = text.indexOf('{'), e = text.lastIndexOf('}');
    if(s>=0 && e>0){ try { return JSON.parse(text.substring(s,e+1)); } catch(e){} }
    // array only
    const sa = text.indexOf('['), ea = text.lastIndexOf(']');
    if(sa>=0 && ea>0){ try { return JSON.parse(text.substring(sa,ea+1)); } catch(e){} }
    return null;
  }
  function escapeHtml(s){ if(s==null) return ''; return String(s).replace(/[&<>"']/g, ch=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[ch])); }
  function loadScript(src){ return new Promise((res, rej)=>{ const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = ()=> rej(new Error('Gagal muat '+src)); document.head.appendChild(s); }); }
  function ensureJsPDF(){ if(window.jspdf) return Promise.resolve(window.jspdf); return new Promise((res, rej)=>{ const s = document.createElement('script'); s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'; s.onload = ()=> res(window.jspdf || window.jspPDF || window.jspdf); s.onerror = ()=> rej(new Error('Gagal memuat jsPDF')); document.head.appendChild(s); }); }

  // mount
  init();

})();
