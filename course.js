import {teachingPlate} from './teaching-figures.js?v=readingedit1';
import {decisionLab, updateDecisionLab} from './decision-lab.js?v=readingedit1';
import {lessons} from './course-data.js?v=readingedit1';

import {mountSpatial,spatialStep,spatialURL} from './spatial-case.js?v=spacecase1';

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
  const spatial = mountSpatial(t);
  let part = 0;
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
      <h1 tabindex="-1">${t('Which AI model works better for your task?','怎样判断哪个 AI 模型更适合你的任务？')}</h1>
      <p>${t('Suppose a new model is cheaper to run but makes more mistakes. Which would you choose? Try the cost comparison, then follow six lessons from training a model to reading its test results.', '假设新模型使用起来更便宜，却更容易答错，你会选哪个？先动手比较每个正确答案的成本，再用六节短课了解模型怎样训练、测试结果该怎样读。')}</p>
      <button class="course-primary" data-unit="${resume}">${action}</button>
      <button class="studio-case" data-case>${t('Read the model release case study','阅读模型发布案例')}</button></div>
      ${decisionLab(t, successes)}</div>
      <section class="spatial-entry"><div><h2>${t('Can a model tell left from right?','模型能分清左右吗？')}</h2><p>${t('Turn a robot, make a prediction, then compare your reasoning with a published experiment.','转动机器人，判断箱子的方位，再读一张真实的论文图表。')}</p></div><a href="${spatialURL(0)}">${t('Try the spatial reasoning lesson','进入空间推理课')}</a></section>
      <section class="course-outline"><div><h2>${t('Your learning path','你的学习路径')}</h2><p>${completed.size} / 6 ${t('checks passed','项练习已通过')}</p><progress aria-label="${t('Course progress','课程进度')}" value="${completed.size}" max="6"></progress></div><nav aria-label="${t('Course lessons','课程目录')}">${outline()}</nav></section>`;
  }
  function lessonPage() {
    const lesson = lessons[index];
    const relatedPapers = [
      ['thinkinginspace','Compare models with a human test group','看论文怎样用人类成绩做对照'],
      ['gpt3','See how GPT-3 uses a prompt','读 GPT-3 论文中的提示示例'],
      ['transformer','Try the attention exercise','做 Transformer 注意力练习'],
      ['rag','Read the retrieval experiment','读检索增强生成的实验'],
      ['claudefable52','Inspect a model evaluation','看一份真实的模型评测'],
      ['gpt62','Open the model report','读这份模型报告']
    ];
    const [paperId,paperEn,paperZh] = relatedPapers[index];
    const chartKeys = ['split', 'llm', 'attention', 'rag', 'inference-eval'];
    const chartAlt = lesson.rows.map(row => read(row) + ' ' + row[2]).join(', ');
    return `<div class="course-desk"><aside><button data-home>← ${t('Course overview','课程概览')}</button><nav aria-label="${t('Course lessons','课程目录')}">${outline()}</nav></aside><article><small>${t('Lesson','课程')} ${index+1} / 6</small><h1 tabindex="-1">${read(lesson.question)}</h1><p>${read(lesson.text)}</p>${index===5?decisionLab(t,successes):`<figure class="course-figure"><figcaption>${read(lesson.figure)}</figcaption>${teachingPlate(chartKeys[index], chartAlt)}<p>${read(lesson.caption)}</p></figure>`}<section class="course-check"><small>${t('Check your understanding','检验理解')}</small><h2>${read(lesson.test)}</h2>${lesson.options.map((option,i)=>`<button data-answer="${i}" aria-pressed="${choice===i}">${read(option)}</button>`).join('')}<div role="status">${choice===null?'':choice===lesson.correct?`<p><b>${t('Correct.','回答正确。')}</b> ${read(lesson.why)}</p>`:`<p>${t('Try again. Look at the example above, then choose the answer you can verify.','再试一次。回看上面的例子，选择有证据支持的答案。')}</p>`}</div></section><div class="course-actions">${choice===lesson.correct||completed.has(index)?`<button data-next class="course-primary">${index<5?t('Next lesson','下一课'):t('Review my progress','查看我的进度')} →</button>`:''}<a href="?view=basics&term=${lesson.term}">${t('Explore the concept','深入学习概念')} →</a><a href="?view=library#${paperId}">${t(paperEn,paperZh)}</a></div><footer>${t('Further reading','延伸阅读')} · <a href="${lesson.source[2]}" target="_blank" rel="noopener">${read(lesson.source)} ↗</a></footer></article></div>`;
  }
  function render() {
    root.innerHTML = screen === 'spatial' ? spatial.content(part) : screen === 'lesson' ? lessonPage() : homepage();
    if (root.querySelector('.decision-lab')) updateDecisionLab(root,t,successes);
    root.parentElement.classList.toggle('course-reading', screen !== 'home');
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
    if (screen==='spatial' && spatial.act(button,part)) {
      const attr = button.hasAttribute('data-face') ? 'data-face' : 'data-spatial-answer';
      const value = button.getAttribute(attr);
      render();
      root.querySelector('['+attr+'="'+value+'"]').focus({preventScroll:true});
      return;
    }
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
  return () => {
    const requested=spatialStep();
    screen=requested===null?'home':'spatial';
    part=requested??0;
    render();
    if(screen==='spatial') root.querySelector('h1').focus({preventScroll:true});
  };
}
