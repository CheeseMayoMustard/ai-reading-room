import {teachingPlate} from './teaching-figures.js?v=paperstudio1';
import {decisionLab, updateDecisionLab} from './decision-lab.js?v=paperstudio1';
import {lessons} from './course-data.js?v=paperstudio1';

export function mountCourse(root) {
  const key = 'ai-room-intro-course-v1';
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(key)) || {}; } catch {}
  let index = Number.isInteger(saved.index) && lessons[saved.index] ? saved.index : 0;
  let completed = new Set(Array.isArray(saved.completed) ? saved.completed.filter(i => Number.isInteger(i) && lessons[i]) : []);
  let successes = 50;
  let screen = 'home', choice = null;
  const language = () => document.documentElement.lang.startsWith('zh') ? 1 : 0;
  const t = (en, zh) => language() ? zh : en;
  const read = pair => pair[language()];
  function save() {
    try { localStorage.setItem(key, JSON.stringify({started:true,index, completed: [...completed]})); } catch {}
  }
  function focusHeading() {
    const heading = root.querySelector('h1');
    heading.focus({preventScroll:true});
    root.closest('main').scrollTop = 0;
  }
  function openLesson(i) {
    index = i;
    screen = 'lesson';
    saved.started=true;
    choice = null;
    save();
    render();
    focusHeading();
  }
  function outline() {
    return lessons.map((lesson,i) => `<button data-unit="${i}" ${screen==='lesson' && index===i?'aria-current="step"':''}><span>${completed.has(i)?'✓':String(i+1).padStart(2,'0')}</span>${read(lesson.title)}</button>`).join('');
  }
  function homepage() {
    const next = completed.has(index) ? lessons.findIndex((_, i) => !completed.has(i)) : index;
    const resume = next < 0 ? 0 : next;
    const started = saved.started || completed.size > 0;
    const action = completed.size === lessons.length ? t('Review the course','复习课程') :
      started ? t('Resume lesson','继续第') + ' ' + (resume + 1) + t('',' 课') : t('Start with lesson one','从第一课开始');
    return `<div class="studio-lead"><div class="studio-intro"><small>${t('The beginner’s guide to AI','AI 入门指南')}</small>
      <h1 tabindex="-1">${t('What makes one AI model better?','怎样判断一个 AI 模型更好？')}</h1>
      <p>${t('Try comparing two models on a task you can measure. Then work through six short lessons to read a model release and judge the evidence yourself.', '先在一项可衡量的任务上比较两个模型，再通过六节短课学会阅读模型发布说明，自己判断证据是否充分。')}</p>
      <button class="course-primary" data-unit="${resume}">${action}</button>
      <button class="studio-case" data-case>${t('Read the model release case study','阅读模型发布案例')}</button></div>
      ${decisionLab(t, successes)}</div>
      <section class="course-outline"><div><h2>${t('Your learning path','你的学习路径')}</h2><p>${completed.size} / 6 ${t('checks passed','项练习已通过')}</p><progress aria-label="${t('Course progress','课程进度')}" value="${completed.size}" max="6"></progress></div><nav aria-label="${t('Course lessons','课程目录')}">${outline()}</nav></section>`;
  }
  function lessonPage() {
    const lesson = lessons[index];
    const chartKeys = ['split', 'llm', 'attention', 'rag', 'inference-eval'];
    const chartAlt = lesson.rows.map(row => read(row) + ' ' + row[2]).join(', ');
    return `<div class="course-desk"><aside><button data-home>← ${t('Course overview','课程概览')}</button><nav aria-label="${t('Course lessons','课程目录')}">${outline()}</nav></aside><article><small>${t('Lesson','课程')} ${index+1} / 6</small><h1 tabindex="-1">${read(lesson.question)}</h1><p>${read(lesson.text)}</p>${index===5?decisionLab(t,successes):`<figure class="course-figure"><figcaption>${read(lesson.figure)}</figcaption>${teachingPlate(chartKeys[index], chartAlt)}<p>${read(lesson.caption)}</p></figure>`}<section class="course-check"><small>${t('Check your understanding','检验理解')}</small><h2>${read(lesson.test)}</h2>${lesson.options.map((option,i)=>`<button data-answer="${i}" aria-pressed="${choice===i}">${read(option)}</button>`).join('')}<div role="status">${choice===null?'':choice===lesson.correct?`<p><b>${t('Correct.','回答正确。')}</b> ${read(lesson.why)}</p>`:`<p>${t('Try again. Look at the example above, then choose the answer you can verify.','再试一次。回看上面的例子，选择有证据支持的答案。')}</p>`}</div></section><div class="course-actions">${choice===lesson.correct||completed.has(index)?`<button data-next class="course-primary">${index<5?t('Next lesson','下一课'):t('Review my progress','查看我的进度')} →</button>`:''}<a href="?view=basics&term=${lesson.term}">${t('Explore the concept','深入学习概念')} →</a></div><footer>${t('Further reading','延伸阅读')} · <a href="${lesson.source[2]}" target="_blank" rel="noopener">${read(lesson.source)} ↗</a></footer></article></div>`;
  }
  function render() {
    root.innerHTML = screen === 'lesson' ? lessonPage() : homepage();
    if (root.querySelector('.decision-lab')) updateDecisionLab(root,t,successes);
    root.parentElement.classList.toggle('course-reading', screen === 'lesson');
  }
  root.addEventListener('input', event => {
    if (event.target.id !== 'trial-count') return;
    successes = Number(event.target.value);
    updateDecisionLab(root,t,successes);
  });
  root.addEventListener('click', event => {
    if (event.target.closest('[data-case]')) {
      event.preventDefault();
      openLesson(5);
      return;
    }
    const button = event.target.closest('button');
    if (!button) return;
    if (button.hasAttribute('data-home') || (button.hasAttribute('data-next') && index===5)) {
      screen='home'; render(); focusHeading(); return;
    }
    if (button.hasAttribute('data-next')) return openLesson(index+1);
    if (button.hasAttribute('data-unit')) return openLesson(Number(button.dataset.unit));
    if (button.hasAttribute('data-answer')) {
      choice=Number(button.dataset.answer);
      if (choice===lessons[index].correct) completed.add(index);
      save(); render();
      root.querySelector(`[data-answer="${choice}"]`).focus({preventScroll:true});
    }
  });
  document.addEventListener('room-language', render);
  render();
  return () => { screen='home'; render(); };
}
