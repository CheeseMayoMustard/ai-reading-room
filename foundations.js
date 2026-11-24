import {movingPlate, moveMarker, chartText as t} from './teaching-figures.js?v=readingedit1';
import { units } from './foundation-content.js?v=readingedit1';

const escapeText = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const byId = new Map(units.map(unit => [unit.id, unit]));
const keyFor = (unit, index) => unit.id + '-' + index;
const allChecks = units.flatMap(unit => unit.checks.map((_, index) => ({unit,index})));
const checkIds = new Set(allChecks.map(({unit,index}) => keyFor(unit,index)));

export function foundations({shell, state, save, render, papers, showPaper, enter}) {
  const initial = new URL(location.href).searchParams.get('unit');
  let selected = byId.get(initial) || units[0];
  let origin = null;
  let mix = null;
  let position = 0;
  let firstCorrect = 0;
  const choices = new Map();
  const hints = new Set();
  const solutions = new Set();
  const firstAttempts = new Set();

  function progress() {
    state.foundationChecks ||= {};
    return state.foundationChecks;
  }
  function merge(incoming) {
    for (const [id, result] of Object.entries(incoming || {})) {
      if (checkIds.has(id) && result === true) progress()[id] = true;
    }
  }
  function start(id, paper) {
    selected = byId.get(id) || units[0];
    origin = paper || null;
    mix = null;
    clearAttempt();
    enter();
  }
  function clearAttempt() {
    choices.clear();
    hints.clear();
    solutions.clear();
    firstAttempts.clear();
  }
  function openUnit(unit) {
    selected = unit;
    mix = null;
    clearAttempt();
    enter();
  }
  function startMix() {
    // Sample different topics, putting those with unfinished checks first.
    const candidates = units.map(unit => {
      const unfinished = unit.checks.map((_,i) => i).filter(i => !progress()[keyFor(unit,i)]);
      const pool = unfinished.length ? unfinished : [0,1];
      return {unit,index:pool[Math.floor(Math.random()*pool.length)],priority:unfinished.length ? 0 : 1,order:Math.random()};
    });
    mix = candidates.sort((a,b) => a.priority-b.priority || a.order-b.order).slice(0,5);
    position = 0;
    firstCorrect = 0;
    clearAttempt();
    enter();
  }
  function related(paperId) {
    const topics = units.filter(unit => unit.papers.includes(paperId));
    if (!topics.length) return '';
    return '<section class="fd-related"><span class="section-label">Before this paper</span><h3>Background lessons for this paper</h3><p>Choose a topic below. Each lesson includes one worked example and two questions.</p>' +
      topics.map(unit => '<button class="lp-outline" data-foundation="'+unit.id+'" data-origin="'+paperId+'">'+escapeText(unit.term)+' →</button>').join(' ')+'</section>';
  }
  function check(unit, index) {
    const [prompt, options, correct, hint, answer] = unit.checks[index];
    const key = keyFor(unit,index);
    const choice = choices.get(key);
    let feedback = '';
    if (choice !== undefined) {
      feedback = choice === correct ? 'Correct. Open the worked answer to compare your reasoning.' : 'Try again, or open the hint.';
    }
    return '<section class="fd-check" data-check-key="'+key+'"><span class="section-label">'+(mix ? 'Review question' : index ? 'Apply the idea' : 'First question')+'</span><h3>'+escapeText(prompt)+'</h3><div class="fd-options" role="group" aria-label="Choose an answer">'+
      options.map((option,i) => '<button data-fd-choice="'+i+'" aria-pressed="'+(choice===i)+'">'+escapeText(option)+'</button>').join('')+
      '</div><p class="fd-feedback" role="status">'+feedback+'</p><div class="fd-help"><button data-fd-hint aria-expanded="'+hints.has(key)+'">'+(hints.has(key)?'Hide hint':'Give me a hint')+'</button><button data-fd-answer aria-expanded="'+solutions.has(key)+'">'+(solutions.has(key)?'Hide answer':'Show worked answer')+'</button></div>'+
      (hints.has(key)?'<p class="fd-nudge">'+escapeText(hint)+'</p>':'')+
      (solutions.has(key)?'<div class="fd-worked"><strong>Worked answer</strong><p>'+escapeText(answer)+'</p></div>':'')+'</section>';
  }
  const labs = {
    weights: {
      label: ['Weight on the 10-day estimate','10 天估计值的权重'], min:0, max:100, value:80,
      y:n => 20 - n / 10,
      alt:['The estimate drops from 20 to 10 days as the weight rises from 0 to 100%.','权重从 0 增至 100% 时，估计值从 20 天减至 10 天。'],
      describe:n => n+'% · '+(20-n/10).toFixed(1)+t(' days. The other estimate receives ',' 天。另一项估计的权重为 ')+(100-n)+'%.'
    },
    memory: {
      label:['Bytes per number for 12 numbers','存储 12 个数值时，每个数值占用的字节数'], min:1, max:4, value:2,
      y:n => 12*n, alt:['Storage grows by 12 bytes for every additional byte per number.','每个数值多用 1 字节，总存储量增加 12 字节。'],
      describe:n => '12 × '+n+' = '+12*n+t(' bytes of raw storage.',' 字节原始存储量。')
    },
    routing: {
      label:['Active specialists out of eight','8 个专家中启用的数量'], min:1, max:8, value:1,
      y:n => n/8*100, alt:['Activating each additional expert raises the active share by 12.5 percentage points.','每多启用一个专家，启用比例上升 12.5 个百分点。'],
      describe:n => n+' ÷ 8 = '+n/8*100+t('% active. All eight are available.','% 已启用。8 个专家均可用。')
    }
  };
  function lab() {
    const spec = labs[selected.id];
    if (!spec) return '';
    return `<div class="fd-lab"><label for="fd-slider">${t(...spec.label)}</label><input id="fd-slider" type="range" min="${spec.min}" max="${spec.max}" value="${spec.value}"><output for="fd-slider">${spec.describe(spec.value)}</output>${movingPlate(selected.id,t(...spec.alt),spec.value,spec.y(spec.value))}</div>`;
  }
  document.addEventListener('room-language',()=>{
    const slider = shell.querySelector('#fd-slider'), spec = labs[selected.id];
    if (!slider || !spec) return;
    const node = slider.closest('.fd-lab'), oldValue = slider.value;
    node.outerHTML = lab();
    const replacement = shell.querySelector('#fd-slider');
    replacement.value = oldValue;
    bindSlider(replacement);
    replacement.oninput();
  });
  function bindSlider(slider) {
    if (!slider) return;
    const spec = labs[selected.id];
    slider.oninput=()=>{
      const n = Number(slider.value);
      slider.nextElementSibling.textContent = spec.describe(n);
      moveMarker(shell,selected.id,n,spec.y(n));
    };
  }
  function view() {
    const completed = Object.keys(progress()).length;
    if (mix && position === mix.length) {
      return '<section class="fd-main"><span class="section-label">Mixed practice complete</span><h2>'+firstCorrect+' of 5 correct on the first try without help</h2><p>Choose a topic to see the example and try its questions again.</p><div class="fd-links">'+mix.map(({unit}) => '<button class="lp-outline" data-fd-unit="'+unit.id+'">'+unit.term+'</button>').join('')+'</div><button class="lp-primary" data-fd-mix>Try five more →</button></section>';
    }
    if (mix) {
      const item = mix[position];
      const key = keyFor(item.unit,item.index);
      return '<section class="fd-main"><button class="fd-back" data-fd-unit="'+selected.id+'">← Back to lessons</button><p class="section-label">Mixed practice · '+(position+1)+' of 5</p>'+check(item.unit,item.index)+'<button class="lp-primary" data-fd-next '+(!choices.has(key)&&!solutions.has(key)?'disabled':'')+'>'+(position===4?'See results':'Next challenge')+' →</button></section>';
    }
    const n = units.indexOf(selected);
    const relatedPapers = origin && selected.papers.includes(origin) ? [origin,...selected.papers.filter(id=>id!==origin)] : selected.papers;
    return '<section class="fd-main"><div class="fd-controls"><label>Choose a background lesson<select id="fd-topic">'+units.map((unit,i) => '<option value="'+unit.id+'" '+(unit===selected?'selected':'')+'>'+(i+1)+'. '+escapeText(unit.title)+'</option>').join('')+'</select></label><div><span>'+completed+' of 20 questions answered correctly</span><button class="lp-outline" data-fd-mix>Try five mixed questions →</button></div></div>'+
      '<div class="fd-intro"><span class="section-label">Start from zero · Lesson '+(n+1)+' of 10</span><h2>'+escapeText(selected.title)+'</h2><p>'+escapeText(selected.scene)+'</p><div class="fd-worked"><strong>A worked example</strong><p>'+escapeText(selected.example)+'</p>'+lab()+'</div><h3>How AI systems use this idea</h3><p>'+escapeText(selected.bridge)+'</p></div>'+
      selected.checks.map((_,i) => check(selected,i)).join('')+'<div class="fd-controls"><button class="lp-outline" data-fd-unit="'+selected.id+'">Practice this lesson again</button>'+
      (n<units.length-1?'<button class="lp-primary" data-fd-unit="'+units[n+1].id+'">Next · '+escapeText(units[n+1].term)+' →</button>':'<button class="lp-primary" data-fd-mix>Try mixed practice →</button>')+'</div>'+
      '<div class="fd-related"><span class="section-label">Papers that use this idea</span><div class="fd-links">'+relatedPapers.map(id => '<button class="lp-outline" data-fd-paper="'+id+'">'+(origin===id?'Return to ':'')+escapeText(papers.find(p=>p.id===id).title)+' →</button>').join('')+'</div></div></section>';
  }
  function bind() {
    shell.querySelectorAll('[data-foundation]').forEach(b => b.onclick=()=>start(b.dataset.foundation,b.dataset.origin));
    shell.querySelectorAll('[data-fd-unit]').forEach(b => b.onclick=()=>openUnit(byId.get(b.dataset.fdUnit)));
    shell.querySelectorAll('[data-fd-paper]').forEach(b => b.onclick=()=>showPaper(b.dataset.fdPaper));
    shell.querySelectorAll('[data-fd-mix]').forEach(b => b.onclick=startMix);
    const select = shell.querySelector('#fd-topic');
    if (select) select.onchange=()=>openUnit(byId.get(select.value));
    bindSlider(shell.querySelector('#fd-slider'));
    for (const card of shell.querySelectorAll('[data-check-key]')) {
      const key = card.dataset.checkKey;
      const {unit,index} = allChecks.find(item => keyFor(item.unit,item.index)===key);
      function refresh(selector) {
        render();
        shell.querySelector('[data-check-key="'+key+'"] '+selector)?.focus({preventScroll:true});
      }
      card.querySelectorAll('[data-fd-choice]').forEach(button=>button.onclick=()=>{
        const choice = Number(button.dataset.fdChoice);
        const correct = choice===unit.checks[index][2];
        if (mix && correct && !firstAttempts.has(key) && !solutions.has(key) && !hints.has(key)) firstCorrect++;
        firstAttempts.add(key);
        choices.set(key,choice);
        if (correct) { progress()[key]=true; save(); }
        refresh('[data-fd-choice="'+choice+'"]');
      });
      for (const [attr,collection] of [['data-fd-hint',hints],['data-fd-answer',solutions]]) {
        card.querySelector('['+attr+']').onclick=()=>{
          if (collection.has(key)) collection.delete(key);
          else { collection.add(key); if(mix) firstAttempts.add(key); }
          refresh('['+attr+']');
        };
      }
    }
    const next = shell.querySelector('[data-fd-next]');
    if (next) next.onclick=()=>{position++;render();shell.querySelector('.fd-main').scrollIntoView({block:'start'});};
  }
  return {view, bind, related, merge, unitId:()=>selected.id};
}
