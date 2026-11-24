const language = () => document.documentElement.lang.startsWith('zh') ? 'zh' : 'en';
export const chartText = (en, zh) => language() === 'zh' ? zh : en;
const imagePath = key => 'media/teaching/' + key + '-' + language() + '.svg';
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<','&lt;');

export function teachingPlate(key, alt) {
  return `<picture class="teaching-picture"><source media="(max-width:600px)" srcset="${imagePath(key).replace('.svg','-compact.svg')}"><img class="teaching-plate" data-teaching-key="${key}" src="${imagePath(key)}" width="600" height="300" alt="${escape(alt)}"></picture>`;
}

// Backgrounds have a common axes rectangle, set in render_teaching_figures.py.
const domains = {
  cost: [25,100,8,42], weights: [0,100,9,21], memory: [1,4,0,52], routing: [1,8,0,106]
};
function position(key, x, y) {
  const [x0,x1,y0,y1] = domains[key];
  return [96 + 462 * (x-x0)/(x1-x0), 222 - 180 * (y-y0)/(y1-y0)];
}
export function movingPlate(key, alt, x, y) {
  const [cx,cy] = position(key,x,y);
  return `<div class="teaching-live" data-moving-plate="${key}">${teachingPlate(key,alt)}<svg viewBox="0 0 600 300" aria-hidden="true"><line x1="${cx}" x2="${cx}" y1="${cy}" y2="222" stroke="#53636f" stroke-width="1.5" stroke-dasharray="3 4"/><circle cx="${cx}" cy="${cy}" r="6.5" fill="#bc562b" stroke="white" stroke-width="2"/></svg></div>`;
}
export function moveMarker(root,key,x,y) {
  const plate = root.querySelector('[data-moving-plate="'+key+'"]');
  const [cx,cy] = position(key,x,y);
  const marker = plate.querySelector('circle'), guide = plate.querySelector('line');
  marker.setAttribute('cx',cx); marker.setAttribute('cy',cy);
  guide.setAttribute('x1',cx); guide.setAttribute('x2',cx); guide.setAttribute('y1',cy);
}
