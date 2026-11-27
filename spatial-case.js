// Coordinates follow the printed map. Rotating the observer leaves the room fixed.
const names = [
  ['North', '北'], ['East', '东'], ['South', '南'], ['West', '西']
];
const directions = [
  ['Ahead','前方'], ['Right','右侧'], ['Behind','后方'], ['Left','左侧']
];
const steps = [
  ['Change your viewpoint','换个朝向'], ['Read the experiment','读论文数据'], ['Choose a robot test','设计机器人测试']
];
export const spatialURL = step => '?view=explore&case=spatial&part=' + (step+1);
export function spatialStep() {
  const q = new URLSearchParams(location.search);
  if (q.get('view') !== 'explore' || q.get('case') !== 'spatial') return null;
  return ['2','3'].includes(q.get('part')) ? Number(q.get('part'))-1 : 0;
}
function room(t, heading) {
  return `<svg viewBox="0 0 390 235" role="img" aria-label="${t('Top view. The crate is east of the robot.','俯视图。箱子在机器人正东面。')}${t(' Robot facing ','机器人朝')}${t(...names[heading])}">
  <defs><pattern id="floor-grid" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M25 0H0V25" fill="none" stroke="#dae4e6" stroke-width="1"/></pattern></defs>
  <rect x="15" y="15" width="360" height="205" rx="4" fill="#f5f9f8" stroke="#839496" stroke-width="2"/>
  <rect x="16" y="16" width="358" height="203" fill="url(#floor-grid)"/>
  <g fill="#3b515b" font-size="15"><path d="M46 65V39m-5 7 5-8 5 8" fill="none" stroke="#3b515b" stroke-width="2"/><text x="59" y="49">${t('N','北')}</text></g>
  <g transform="translate(164 116) rotate(${heading*90})"><path d="M-24 -47L0 0 24 -47Z" fill="#c0dedc"/><circle r="18" fill="#226975"/><path d="M-7 2L0 -10 7 2" fill="none" stroke="white" stroke-width="3"/></g>
  <g fill="#f7e5ca" stroke="#8b5527" stroke-width="2"><rect x="274" y="101" width="34" height="30" rx="2"/><path d="M275 102l32 28m-32 0 32-28"/></g>
  <g fill="#263e47" font-size="16" font-weight="600" text-anchor="middle"><text x="164" y="181">${t('Robot','机器人')}</text><text x="291" y="160">${t('Crate','箱子')}</text></g></svg>`;
}
export function mountSpatial(t) {
  let heading = 0;
  const choices = [null,null,null];
  const titles = [
    ['Where is the crate from the robot’s point of view?','从机器人的角度看，箱子在哪边？'],
    ['On which task did the model come close to people?','在哪项任务上，模型得分接近人类？'],
    ['What would show that a robot can use what it sees?','怎样验证机器人能根据眼前的变化调整动作？']
  ];
  const intro = [
    ['The room stays still. Turn the robot and follow the white arrow with your eyes. Now imagine standing where it stands.','房间和箱子都不动。试着让机器人转个身。想象你站在它的位置，面朝白色箭头的方向。'],
    ['In a 2025 study, people and models watched videos of indoor spaces. Compare two tasks from the same 400-question test in Table 1.','在 2025 年的一项研究中，受试者和模型观看室内视频，再回答问题。下图取自论文表 1，比较的是同一组 400 道题中的两类任务。'],
    ['Suppose a robot sees a crate and starts moving toward it. Someone slides the crate to another spot. Which trial would test whether the robot adjusts?','假设机器人看见箱子后开始靠近，这时有人把箱子挪开了。下面哪个实验能检验机器人会不会随之调整？']
  ];
  function content(part) {
    const options = [directions, [['Object size','估计物体尺寸'],['Relative direction','判断相对方向']], [
      ['Ask it to name the object in the first photo.','让它说出第一张照片里的物体名称。'],
      ['Ask it to describe its original route.','让它描述原先打算走的路线。'],
      ['Move the crate on several trials. Record whether the robot reaches its new position.','多次改变箱子的位置，记录机器人是否到达箱子的新位置。']
    ]][part];
    const correct = [(1-heading+4)%4,0,2][part];
    let visual = '';
    if (part===0) visual = `<figure class="field-figure">${room(t,heading)}<figcaption>${t('The map faces north. The white arrow shows the robot’s heading.','图上方是北。白色箭头表示机器人的朝向。')}</figcaption></figure><div class="field-headings" role="group" aria-label="${t('Robot heading','机器人朝向')}"><strong>${t('Face','面朝')}</strong>${names.map((name,i)=>`<button data-face="${i}" aria-pressed="${i===heading}">${t(...name)}</button>`).join('')}</div>`;
    if (part===1) visual = `<figure class="field-figure"><img width="585" height="330" src="media/figures/spatial-comparison-${t('en','zh')}.svg" alt="${t('Human and Gemini scores. Object size, 60.4 and 58.6. Relative direction, 95.8 and 48.1.','人类和 Gemini 的得分：物体尺寸分别为 60.4 和 58.6，相对方向分别为 95.8 和 48.1。')}"><figcaption>${t('Object size rewards estimates close to the true size. Relative direction counts correct choices. Compare the two markers within each row.','尺寸估计越接近实测值，得分越高。方向题按选对的比例计分。请在同一行内比较两个点。')}</figcaption></figure>`;
    const explanations = [
      t('The crate stays east of the robot. When the robot faces '+names[heading][0].toLowerCase()+', the crate is '+['straight ahead','on its right','behind it','on its left'][(1-heading+4)%4]+'.','箱子一直在机器人正东面。当它面朝'+names[heading][1]+'时，箱子就在它的'+directions[(1-heading+4)%4][1]+'。'),
      t('The size scores differ by 1.8 points. On direction the gap is 47.7 points. Both statements describe the same model and the same study.','估计尺寸只差 1.8 分，判断方向却差了 47.7 分。两句话说的都是同一项研究里的同一个模型。'),
      t('The last trial tests a complete sequence. The robot must observe the change, alter its movement and reach the new location. Record successes out of all trials, including failures.','最后一个实验检验了完整过程。机器人要发现箱子移动、改变自己的运动方向，再到达新位置。用成功次数除以总尝试次数，失败的尝试也要计入分母。')
    ];
    const corrections = [
      t('Follow the white arrow. Imagine your nose pointing that way and try again.','沿着白色箭头看，想象自己的鼻尖朝着那个方向，再判断一次。'),
      t('Compare the gap between the dots on each row. On which row are they almost touching?','分别比较每一行的两个点。哪一行的两个点几乎挨在一起？'),
      t('This checks what the robot can describe. What observation would tell you whether its movement changed?','这能检验它会描述什么。你要观察到什么，才能知道它真的改变了动作？')
    ];
    const question=[t('Which side is the crate on now?','现在箱子在它哪边？'),t('Where is the smaller gap?','哪一项的人机差距更小？'),t('Which result would you measure?','你会测量哪一种结果？')][part];
    return `<section class="spatial-case"><div class="field-top"><a href="?view=explore">${t('Course overview','课程概览')}</a><span>${t('Spatial reasoning','空间推理')} · ${part+1} / 3</span></div>
    <nav class="field-steps" aria-label="${t('Case study steps','案例学习步骤')}">${steps.map((s,i)=>`<a href="${spatialURL(i)}" ${part===i?'aria-current="step"':''}>${t(...s)}</a>`).join('')}</nav>
    <article><h1 tabindex="-1">${t(...titles[part])}</h1><p class="field-intro">${t(...intro[part])}</p>${visual}
    <section class="field-check"><h2>${question}</h2><div class="field-options">${options.map((o,i)=>`<button data-spatial-answer="${i}" aria-pressed="${choices[part]===i}">${t(...o)}</button>`).join('')}</div>
    <p class="field-response" role="status">${choices[part]===null?'':choices[part]===correct?t('Correct. ','答对了。')+explanations[part]:corrections[part]}</p></section>
    <div class="field-actions">${part<2?`<a class="field-next" href="${spatialURL(part+1)}">${t(...steps[part+1])}</a>`:`<a class="field-next" href="?view=library#thinkinginspace">${t('Open the paper workshop','进入论文练习')}</a>`}${part===1?`<a href="?view=library&page=5#thinkinginspace">${t('Check Table 1 in the reader','在阅读器中核对表 1')}</a>`:''}</div>
    ${part===2?`<p class="field-source">${t('For a real robot experiment, see the RT-2 authors’ examples of how camera inputs guide the next action.','想看真实机器人怎样根据摄像头的新画面决定下一步，可以读 RT-2 团队的实验。')} <a href="https://robotics-transformer.github.io/" target="_blank" rel="noopener">RT-2</a></p>`:''}</article></section>`;
  }
  function act(button,part) {
    if(button.hasAttribute('data-face')) {heading=Number(button.dataset.face);choices[0]=null;return true;}
    if(button.hasAttribute('data-spatial-answer')) {choices[part]=Number(button.dataset.spatialAnswer);return true;}
    return false;
  }
  return {content,act};
}
