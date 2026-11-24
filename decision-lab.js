import {movingPlate, moveMarker} from './teaching-figures.js?v=readingedit1';
// Fixed spending and a shared 100-task workload keep the comparison interpretable.
export function decisionLab(t, successes) {
  return `<section class="decision-lab" aria-labelledby="decision-title">
    <header><small>${t('Interactive example','交互示例')}</small><h2 id="decision-title">${t('Which model costs less per correct answer?', '哪个模型每答对一题的成本更低？')}</h2></header>
    <p>${t('Two models each answer 100 questions. A costs $12 and gets 80 right. B costs $10. Change how many answers B gets right.', '两个模型各回答 100 道题。A 花费 12 美元，答对 80 道。B 花费 10 美元。试着改变 B 的答对题数。')}</p>
    <label for="trial-count">${t('Correct answers from B','B 答对的题数')} <strong data-count>${successes} / 100</strong></label>
    <input id="trial-count" type="range" min="25" max="100" step="1" value="${successes}">
    ${movingPlate('cost',t('Model B spends $10 in every trial. As it gets more answers right, its cost per correct answer falls. Model A’s cost stays at 15 cents per correct answer.', 'B 每次测试都花 10 美元，答对越多，每答对一题的成本越低。A 每答对一题花 15 美分，图中的虚线表示这个基准。'),successes,1000/successes)}
    <div class="trial-prices">${['A','B'].map(id=>`<span>${t('Model','模型')} ${id} <strong data-price="${id}"></strong></span>`).join('')}</div><output data-verdict for="trial-count"></output>
    <details><summary>${t('See the calculation','查看计算过程')}</summary><p data-math></p></details></section>`;
}

export function updateDecisionLab(root, t, successes) {
  const costA = 1200 / 80;
  const costB = 1000 / successes;
  root.querySelector('[data-count]').textContent = successes + ' / 100';
  moveMarker(root, 'cost', successes, costB);
  for (const [id, cost] of [['A', costA], ['B', costB]]) {
    root.querySelector('[data-price="'+id+'"]').textContent = cost.toFixed(1) + '¢';
  }
  root.querySelector('[data-verdict]').textContent = costB < costA
    ? t('B now costs less per correct answer.', '现在 B 每答对一题的成本更低。')
    : t('A costs less per correct answer, even with the higher total bill.', '虽然 A 的总账单更高，但每答对一题的成本更低。');
  root.querySelector('[data-math]').textContent = t('Total cents spent ÷ correct answers. ', '总费用（美分）÷ 答对题数。') + 'A: 1200 ÷ 80 = 15¢. B: 1000 ÷ ' + successes + ' ≈ ' + costB.toFixed(2) + '¢.';
}
