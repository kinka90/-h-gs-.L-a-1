/* ai-quiz-topic.js — versi diperbaiki: AI dipanggil 1x untuk membuat soal; penilaian lokal */
(function(){
  'use strict';

  const API_PROXY = (typeof API_PROXY_URL !== 'undefined') ? API_PROXY_URL : '/api/correct';
  const MODEL = (typeof OPENAI_MODEL !== 'undefined') ? OPENAI_MODEL : 'gpt-4o-mini';
  const FETCH_TIMEOUT = 60000; // ms
  const MAX_RETRIES = 4;

  // safe DOM helpers
  const qs = sel => document.querySelector(sel);
  const qsa = sel => Array.from(document.querySelectorAll(sel));

  // State
  let STATE = {
    user: { name:'', kelas:'' },
    config: { count:10, lang:'id', topic:'' },
    questions: [],   // { question, choices:{A..D}, answer, explanation, translation_id }
    answers: [],     // per index: { choice, locked, review }
    current: 0,
    loading: false
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
    const map = { intro: '#quiz-intro', quiz: '#quiz-screen', result: '#quiz-result' };
    Object.keys(map).forEach(k => {
      const el = qs(map[k]);
      if(!el) return;
      el.style.display = (k === which) ? 'block' : 'none';
    });
  }
  function closeOverlay(){ const ov = qs('#quiz-overlay'); if(ov) ov.style.display = 'none'; }

  // ---------- util ----------
  function sleep(ms){ return new Promise(r=>setTimeout(r, ms)); }

  async function fetchWithRetries(url, options = {}, maxRetries = MAX_RETRIES){
    let attempt = 0;
    while(true){
      attempt++;
      const controller = new AbortController();
      const id = setTimeout(()=> controller.abort(), FETCH_TIMEOUT);
      try {
        const resp = await fetch(url, Object.assign({}, options, { signal: controller.signal }));
        clearTimeout(id);

        if(resp.status === 429){
          const ra = resp.headers.get('Retry-After');
          let wait = 1000 * Math.pow(2, attempt);
          if(ra){ const val = parseInt(ra,10); if(!isNaN(val)) wait = Math.max(wait, val*1000); }
          if(attempt >= maxRetries){
            const txt = await resp.text().catch(()=> '');
            throw new Error(`AI membatasi permintaan (429). Coba lagi nanti. ${txt}`);
          }
          await sleep(wait);
          continue;
        }

        if(resp.status >= 500 && resp.status < 600){
          if(attempt >= maxRetries){
            const txt = await resp.text().catch(()=> '');
            throw new Error(`Server AI error (${resp.status}). ${txt}`);
          }
          await sleep(500 * Math.pow(2, attempt));
          continue;
        }

        if(!resp.ok){
          const txt = await resp.text().catch(()=> '');
          throw new Error(`AI gagal merespons: ${resp.status} ${txt}`);
        }

        return resp;
      } catch(err){
        clearTimeout(id);
        const isAbort = err && err.name === 'AbortError';
        if((isAbort || /network|failed/i.test(String(err.message))) && attempt < maxRetries){
          await sleep(500 * Math.pow(2, attempt));
          continue;
        }
        throw err;
      }
    }
  }

  // ---------- Start quiz ----------
  async function startQuiz(){
    if(STATE.loading) return;
    const nameEl = qs('#q-name'), classEl = qs('#q-class'), topicEl = qs('#q-topic'), countEl = qs('#q-count');
    if(!nameEl || !classEl || !topicEl || !countEl){ alert('Elemen form tidak ditemukan. Periksa HTML.'); return; }
    const name = nameEl.value.trim(), kelas = classEl.value.trim(), topic = topicEl.value.trim();
    const count = Math.max(1, Math.min(30, Number(countEl.value) || 10));
    const langRadio = document.querySelector('input[name="lang"]:checked');
    const lang = langRadio ? langRadio.value : 'id';
    if(!name || !kelas || !topic){ alert('Isi Nama, Kelas, dan Topik terlebih dahulu.'); return; }

    STATE.user.name = name;
    STATE.user.kelas = kelas;
    STATE.config.count = count;
    STATE.config.lang = lang;
    STATE.config.topic = topic;

    const startBtn = qs('#q-start');
    if(startBtn){ startBtn.disabled = true; startBtn.textContent = 'Membuat soal...'; }
    STATE.loading = true;

    toggleScreens('quiz');
    updateSummaryHeader();
    const wrap = qs('#questions-wrap');
    if(wrap) wrap.innerHTML = `<div class="question-card"><p class="muted">💭 AI sedang membuat ${count} soal untuk topik "${escapeHtml(topic)}" (bahasa ${lang === 'id' ? 'Indonesia' : 'Ternate'})... Mohon tunggu.</p></div>`;

    try {
      const payload = await fetchQuestionsFromAI(topic, count, lang);
      const normalized = normalizeQuestions(payload.questions || [], count);
      STATE.questions = normalized;
      STATE.answers = STATE.questions.map(()=> ({ choice: null, locked: false, review: null }));
      STATE.current = 0;
      renderAllQuestions();
      showQuestionAt(0);
      updateSummary();
    } catch(err){
      console.error('fetchQuestionsFromAI error', err);
      if(wrap) wrap.innerHTML = `<div class="question-card"><p class="muted" style="color:#b00">Gagal membuat soal: ${escapeHtml(err.message)}</p></div>`;
      setTimeout(()=> showIntro(), 2500);
    } finally {
      STATE.loading = false;
      if(startBtn){ startBtn.disabled = false; startBtn.textContent = 'Mulai Quiz'; }
    }
  }

  function updateSummaryHeader(){
    safeSetText('#summary-name', STATE.user.name);
    safeSetText('#summary-class', STATE.user.kelas);
    safeSetText('#summary-topic', STATE.config.topic);
    safeSetText('#summary-count', STATE.config.count);
  }
  function safeSetText(sel, txt){ const el = qs(sel); if(el) el.textContent = txt; }

  // ---------- AI request: generate questions (one call) ----------
  function buildPromptForTopic(topic, count, lang){
    const languageNote = lang === 'ternate'
      ? 'Semua soal dan opsi HARUS dalam BAHASA TERNATE. Sertakan terjemahan singkat pertanyaan ke Bahasa Indonesia pada field translation_id. Sertakan juga "Penjelasan:" untuk tiap soal.'
      : 'Semua soal dan opsi HARUS dalam BAHASA INDONESIA. Sertakan juga "Penjelasan:" untuk tiap soal.';
    // Prefer JSON but accept plain text example as fallback
    return [
      { role: 'system', content: 'Kamu adalah pembuat soal pilihan ganda profesional. Output DIUTAMAKAN dalam JSON. Jika tidak memungkinkan, gunakan format teks terstruktur (lihat instruksi).' },
      { role: 'user', content:
        `Buat ${count} soal pilihan ganda (A-D) tentang topik: "${topic}". ${languageNote}\n\n` +
        `UTAMAKAN OUTPUT JSON persis seperti:\n{\n  "questions":[\n    { "question":"...","choices":{"A":"...","B":"...","C":"...","D":"..."},"answer":"A","explanation":"...","translation_id": "..." },\n    ...\n  ]\n}\n\n` +
        `Jika kamu tidak dapat memberikan JSON, berikan format teks seperti:\n1. Pertanyaan...\nA. ...\nB. ...\nC. ...\nD. ...\nJawaban benar: C\nPenjelasan: ...\n\nUlangi untuk setiap soal. Jangan sertakan teks penjelas lain di luar struktur ini.` }
    ];
  }

  async function fetchQuestionsFromAI(topic, count, lang){
    const messages = buildPromptForTopic(topic, count, lang);
    const body = { model: MODEL, messages, temperature: 0.7, max_tokens: 2000 };

    const resp = await fetchWithRetries(API_PROXY, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(body)
    });

    const j = await resp.json().catch(()=> null);
    const text = j?.choices?.[0]?.message?.content || j?.result || (typeof j === 'string' ? j : JSON.stringify(j || {}));

    // try JSON first
    const parsed = tryParseJSON(text);
    if(parsed && Array.isArray(parsed.questions)) {
      // ensure fields exist
      return parsed;
    }

    // if not JSON, try parse plain text structured format
    const parsedText = parsePlainQuestions(text);
    if(parsedText && parsedText.questions && parsedText.questions.length){
      return parsedText;
    }

    // try to salvage JSON embedded inside text
    const s = text.indexOf('{'), e = text.lastIndexOf('}');
    if(s>=0 && e>0){
      try {
        const obj = JSON.parse(text.substring(s,e+1));
        if(obj && Array.isArray(obj.questions)) return obj;
      } catch(e){}
    }

    // last attempt: try array only inside
    const sa = text.indexOf('['), ea = text.lastIndexOf(']');
    if(sa>=0 && ea>0){
      try {
        const arr = JSON.parse(text.substring(sa,ea+1));
        return { questions: arr };
      } catch(e){}
    }

    // if nothing worked, throw
    throw new Error('AI tidak mengembalikan soal dalam format yang dapat diproses.');
  }

  // ---------- parse plain text format ----------
  function parsePlainQuestions(text){
    if(!text || typeof text !== 'string') return null;
    // normalize line endings
    const t = text.replace(/\r\n/g,'\n').replace(/\r/g,'\n').trim();
    // split by question number lines like "1." or "1 )"
    const parts = t.split(/\n(?=\s*\d+\s*\.)/g);
    const questions = [];
    for(const part of parts){
      const p = part.trim();
      if(!p) continue;
      // get question number and first line
      const qMatch = p.match(/^\s*(\d+)\s*\.\s*(.+?)(?:\n|$)/);
      let questionText = p;
      if(qMatch){
        questionText = qMatch[2].trim() + p.substring(qMatch[0].length).replace(/^\s*/,'');
      }
      // extract choices
      const choices = {};
      const choiceRegex = /^[ \t]*([A-D])[\.\)]\s*(.+)$/gim;
      let m;
      while((m = choiceRegex.exec(p)) !== null){
        const key = m[1].toUpperCase();
        const val = m[2].trim();
        if(key && val) choices[key] = val;
      }
      // sometimes choices are like "A. text" but with no newline separation; try alternate
      if(Object.keys(choices).length < 4){
        const alt = p.match(/A\.[\s\S]*?B\.[\s\S]*?C\.[\s\S]*?D\.[\s\S]*/i);
        if(alt){
          const block = alt[0];
          const lines = block.split(/\n/);
          lines.forEach(line=>{
            const mm = line.match(/^\s*([A-D])[\.\)]\s*(.+)$/i);
            if(mm) choices[mm[1].toUpperCase()] = mm[2].trim();
          });
        }
      }
      // extract answer line like "Jawaban benar: C" or "Answer: C" or "Kunci: C"
      let answer = '';
      const ansMatch = p.match(/(?:Jawaban\s*(?:benar)?|Kunci|Answer|Jawab)\s*[:\-]\s*([A-D])/i);
      if(ansMatch) answer = ansMatch[1].toUpperCase();
      // extract explanation lines "Penjelasan:" or "Explanation:"
      let explanation = '';
      const explMatch = p.match(/(?:Penjelasan|Explanation)\s*[:\-]\s*([\s\S]*)$/i);
      if(explMatch) explanation = explMatch[1].trim();
      // if explanation contains next question, trim by first numbered line
      if(explanation){
        const cut = explanation.search(/\n\s*\d+\s*\./);
        if(cut >= 0) explanation = explanation.substring(0, cut).trim();
      }
      // get question prompt (remove choices/answer/explanation)
      let qPrompt = p;
      // remove leading number
      qPrompt = qPrompt.replace(/^\s*\d+\s*\.\s*/,'');
      // remove choices block
      qPrompt = qPrompt.replace(/([A-D][\.\)]\s*.+\n?){1,4}/ig, '');
      // remove answer/penjelasan trailing parts
      qPrompt = qPrompt.replace(/(?:Jawaban\s*(?:benar)?|Kunci|Answer|Penjelasan|Explanation)[\s\S]*$/i, '').trim();
      // fallback: try first line as question
      if(!qPrompt){
        const firstLine = p.split('\n')[0];
        qPrompt = firstLine.replace(/^\s*\d+\s*\.\s*/,'').trim();
      }

      // ensure choices A-D exist (fill empty if not)
      ['A','B','C','D'].forEach(L=>{ if(!(L in choices)) choices[L] = ''; });

      // push only if we have a question
      questions.push({
        question: qPrompt,
        choices,
        answer: (answer || '').toUpperCase(),
        explanation: explanation || '',
        translation_id: '' // placeholder; if AI provided, could parse more rules
      });
    }
    return { questions };
  }

  // ---------- normalize ----------
  function normalizeQuestions(arr, expectedCount){
    const out = [];
    for(let i=0;i<arr.length;i++){
      const q = arr[i] || {};
      const choices = q.choices || {};
      ['A','B','C','D'].forEach(L => { if(!(L in choices)) choices[L] = choices[L] || ''; });
      out.push({
        question: q.question || ('[soal kosong]'),
        choices,
        answer: (q.answer || 'A').toUpperCase(),
        explanation: q.explanation || q.explain || q.penjelasan || '',
        translation_id: q.translation_id || ''
      });
    }
    while(out.length < expectedCount){
      const i = out.length;
      out.push({ question:`Soal cadangan ${i+1}`, choices:{A:'A',B:'B',C:'C',D:'D'}, answer:'A', explanation:'', translation_id:'' });
    }
    if(out.length > expectedCount) out.length = expectedCount;
    return out;
  }

  // ---------- render ----------
  function renderAllQuestions(){
    const wrap = qs('#questions-wrap');
    if(!wrap){
      console.warn('questions-wrap tidak ditemukan!');
      return;
    }
    wrap.innerHTML = '';
    STATE.questions.forEach((q, idx) => {
      const card = document.createElement('div');
      card.className = 'question-card';
      card.dataset.idx = idx;
      card.innerHTML = buildQuestionHtml(q, idx);
      wrap.appendChild(card);
    });
    wireChoiceDelegation();
    wireAnswerButtons();
  }

  function buildQuestionHtml(q, idx){
    const num = idx + 1;
    let html = `<div class="q-number">Soal ${num}</div>`;
    html += `<div class="q-text">${escapeHtml(q.question)}</div>`;
    html += `<div class="choices-wrap">`;
    ['A','B','C','D'].forEach(L => {
      const txt = q.choices[L] || '';
      html += `<div class="choice" data-idx="${idx}" data-choice="${L}"><div class="letter">${L}</div><div class="choice-text">${escapeHtml(txt)}</div></div>`;
    });
    html += `</div>`;
    html += `<div style="margin-top:10px; display:flex; gap:8px; align-items:center;"><button class="btn-ghost btn-answer" data-idx="${idx}">Jawab & Kunci</button><div id="label-${idx}" class="small-muted" style="margin-left:8px"></div></div>`;
    html += `<div id="result-${idx}" style="margin-top:10px;"></div>`;
    if(STATE.config.lang === 'ternate' && q.translation_id) html += `<div class="small-muted" style="margin-top:8px">Terjemahan (ID): ${escapeHtml(q.translation_id || '')}</div>`;
    return html;
  }

  function wireChoiceDelegation(){
    const wrap = qs('#questions-wrap');
    if(!wrap) return;
    wrap.removeEventListener('click', choiceClickHandlerProxy);
    wrap.addEventListener('click', choiceClickHandlerProxy);
  }
  function choiceClickHandlerProxy(e){
    const el = e.target.closest('.choice');
    if(!el) return;
    const idx = Number(el.dataset.idx), choice = el.dataset.choice;
    if(isNaN(idx) || !choice) return;
    if(!STATE.answers[idx]) STATE.answers[idx] = { choice:null, locked:false, review:null };
    if(STATE.answers[idx].locked) return;
    const card = el.closest('.question-card');
    if(card) card.querySelectorAll('.choice').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    STATE.answers[idx].choice = choice;
  }

  function wireAnswerButtons(){
    qsa('.btn-answer').forEach(btn => {
      btn.removeEventListener('click', onAnswerButtonProxy);
      btn.addEventListener('click', onAnswerButtonProxy);
    });
  }
  function onAnswerButtonProxy(e){
    const idx = Number(e.currentTarget.dataset.idx);
    if(isNaN(idx)) return;
    handleAnswer(idx).catch(err => {
      console.error('handleAnswer error', err);
      const resDiv = qs(`#result-${idx}`);
      if(resDiv) resDiv.innerHTML = `<div class="muted" style="color:#b00">Gagal menilai: ${escapeHtml(err.message)}</div>`;
    });
  }

  // ---------- handle answer (lokal, tanpa AI) ----------
  async function handleAnswer(idx){
    const q = STATE.questions[idx];
    if(!q) return;
    if(STATE.answers[idx] && STATE.answers[idx].locked){
      alert('Soal ini sudah dijawab dan dikunci.');
      return;
    }
    const chosen = STATE.answers[idx] && STATE.answers[idx].choice;
    if(!chosen) { alert('Pilih salah satu opsi terlebih dahulu.'); return; }

    const resDiv = qs(`#result-${idx}`);
    if(resDiv) resDiv.innerHTML = `<div class="muted">Memeriksa jawaban...</div>`;

    // local check using kunci dari STATE.questions
    const isCorrect = String(chosen).toUpperCase() === String(q.answer || '').toUpperCase();
    const reason = q.explanation || (isCorrect ? 'Jawaban benar.' : 'Jawaban salah.');
    const reason_id = q.translation_id || '';

    const review = { correct: !!isCorrect, reason, reason_id };

    // mark answer locked
    STATE.answers[idx] = { choice: chosen, locked: true, review };

    // disable click for card
    const card = qs(`#questions-wrap .question-card[data-idx="${idx}"]`);
    if(card) card.querySelectorAll('.choice').forEach(c => c.style.pointerEvents = 'none');

    // disable answer button
    const btn = qs(`.btn-answer[data-idx="${idx}"]`); if(btn) btn.disabled = true;

    // show result with explanation
    const perPoint = computePerQuestionPoint();
    const earned = review.correct ? perPoint : 0;
    let html = `<div style="padding:8px;border-radius:8px;background:#f9fefe;">`;
    html += `<div><strong>Hasil:</strong> ${review.correct ? '✅ Benar' : '❌ Salah'} — Skor soal ini: ${earned.toFixed(2)}</div>`;
    if(review.reason) html += `<div style="margin-top:8px;"><strong>Alasan:</strong><div style="margin-top:6px">${escapeHtml(review.reason)}</div></div>`;
    if(review.reason_id) html += `<div style="margin-top:8px;"><strong>Terjemahan (ID):</strong><div style="margin-top:6px">${escapeHtml(review.reason_id)}</div></div>`;
    html += `</div>`;
    if(resDiv) resDiv.innerHTML = html;

    const lbl = qs(`#label-${idx}`); if(lbl) lbl.textContent = '✅ Dijawab';
    updateSummary();
  }

  // ---------- scoring ----------
  function computePerQuestionPoint(){
    const total = STATE.questions.length || 1;
    return 100 / total;
  }
  function computeCurrentScore(){
    const per = computePerQuestionPoint();
    let sum = 0;
    STATE.answers.forEach(a => {
      if(a && a.locked && a.review && a.review.correct) sum += per;
    });
    return Math.min(100, Math.round(sum * 100) / 100);
  }
  function updateSummary(){
    safeSetText('#summary-score', `${Math.round(computeCurrentScore())} / 100`);
    safeSetText('#quiz-progress', `Soal ${STATE.current+1} / ${STATE.questions.length}`);
    const done = STATE.answers.filter(a => a && a.locked).length;
    const s = qs('#qa-summary') || qs('#summary-score');
    if(s) s.textContent = `Terjawab: ${done} dari ${STATE.questions.length}`;
  }

  // ---------- navigation ----------
  function showQuestionAt(i){
    const cards = qsa('#questions-wrap .question-card');
    if(cards.length === 0) return;
    if(i < 0) i = 0;
    if(i >= cards.length) i = cards.length - 1;
    STATE.current = i;
    cards.forEach((c, idx) => c.style.display = (idx === i ? 'block' : 'none'));
    updateSummary();
  }
  function nextQuestion(){ showQuestionAt(STATE.current + 1); }
  function prevQuestion(){ showQuestionAt(STATE.current - 1); }

  // ---------- finish & results (no AI calls) ----------
  async function finishAndScore(){
    if(STATE.questions.length === 0) return alert('Belum ada soal.');
    const unanswered = STATE.answers.map((a,i) => (!a || !a.locked) ? i+1 : null ).filter(Boolean);
    if(unanswered.length && !confirm(`Masih ada soal belum dijawab (nomor: ${unanswered.join(', ')}). Lanjutkan penilaian?`)) return;

    const final = computeCurrentScore();

    // local motivational comment based on score
    let comment = 'Kerja bagus! Terus semangat belajar.';
    if(final >= 90) comment = 'Luar biasa — skor sangat tinggi! Pertahankan prestasimu.';
    else if(final >= 75) comment = 'Bagus! Ada beberapa yang bisa diperbaiki, tetap semangat.';
    else if(final >= 50) comment = 'Cukup, tapi coba ulang fokus di beberapa topik.';
    else comment = 'Jangan putus asa. Pelajari kembali materi dan coba lagi.';

    toggleScreens('result');
    safeSetText('#result-score', `${final} / 100`);
    safeSetText('#result-motivation', comment);
    safeSetText('#result-summary', `Nama: ${STATE.user.name}    Kelas: ${STATE.user.kelas}    Topik: ${STATE.config.topic}    Tanggal: ${(new Date()).toLocaleString()}`);

    const det = qs('#result-details');
    if(det){
      det.innerHTML = '';
      STATE.questions.forEach((q,i) => {
        const a = STATE.answers[i] || {};
        const userChoice = a.choice || '(tidak dijawab)';
        const isCorrect = a.review && a.review.correct;
        const reason = a.review && (a.review.reason_id || a.review.reason) || (q.explanation || '');
        const row = document.createElement('div');
        row.style.padding = '10px';
        row.style.borderBottom = '1px solid rgba(3,59,99,0.04)';
        row.innerHTML = `<div style="font-weight:700;">${i+1}. ${escapeHtml(q.question)}</div>
          <div style="margin-top:6px;">Jawaban Anda: <strong>${escapeHtml(userChoice)}</strong> — ${isCorrect ? '<span style="color:green">Benar</span>' : '<span style="color:crimson">Salah</span>'}</div>
          <div style="margin-top:6px;">Kunci: <strong>${escapeHtml(q.answer)}</strong></div>
          <div style="margin-top:6px;color:var(--muted);">Alasan: ${escapeHtml(reason)}</div>`;
        det.appendChild(row);
      });
    }

    fireConfetti();
  }

  // ---------- download PDF ----------
  async function downloadPDF(){
    try { await ensureJsPDF(); } catch(e){ alert('Gagal muat engine PDF: ' + e.message); return; }
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
      const reason = (a.review && (a.review.reason_id || a.review.reason)) || (q.explanation || '');
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
    try { return JSON.parse(text); } catch(e){}
    const codeMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if(codeMatch){ try { return JSON.parse(codeMatch[1]); } catch(e){} }
    const s = text.indexOf('{'), e = text.lastIndexOf('}');
    if(s>=0 && e>0){ try { return JSON.parse(text.substring(s,e+1)); } catch(e){} }
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
