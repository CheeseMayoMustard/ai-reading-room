import {mountCourse} from './course.js?v=spacecase1';
const arrow='<span aria-hidden="true" class="editorial-arrow">↗</span>';
export function setupExplore({papers,conceptCount,onShow}){
 const shell=document.createElement('main');shell.id='explore';shell.className='explore-page';shell.hidden=true;document.body.append(shell);
 shell.innerHTML=`
 <section id="literacy-course"></section>
 <section class="editorial-section" aria-labelledby="featured-title">
  <div class="editorial-section-head"><div><span class="editorial-kicker">AI BASICS</span><h2 id="featured-title">Three questions about language models</h2></div><a href="?view=basics&study=terms">All ${conceptCount} concepts ${arrow}</a></div>
  <div class="story-grid">
   <a class="story" href="?view=basics&term=llm"><div class="story-image"><img data-figure="tokens" loading="lazy" width="560" height="375"></div><span class="editorial-kicker">TEXT GENERATION</span><h3>How does a model choose what to write next?</h3><p>After “Tighten the bolt”, compare three possible continuations and their probabilities.</p>${arrow}</a>
   <a class="story" href="?view=basics&term=descent"><div class="story-image"><img data-figure="descent" loading="lazy" width="560" height="375"></div><span class="editorial-kicker">MATHEMATICS · OPTIMIZATION</span><h3>How does a model learn from an error?</h3><p>Start with one adjustable number. See how changing it reduces the error in this example.</p>${arrow}</a>
   <a class="story" href="?view=basics&term=rag"><div class="story-image"><img data-figure="retrieval" loading="lazy" width="560" height="375"></div><span class="editorial-kicker">DOCUMENT RETRIEVAL</span><h3>Which record can answer the question?</h3><p>For “How many bags are in stock?”, see how software selects an inventory record to include with the question.</p>${arrow}</a>
  </div>
 </section>
 <section class="research-feature" aria-labelledby="research-title"><div class="research-art" aria-hidden="true"><svg viewBox="0 0 600 520"><defs><linearGradient id="paper-light" x2="1" y2="1"><stop stop-color="#f8f9fc"/><stop offset="1" stop-color="#d4d9e4"/></linearGradient></defs><g transform="translate(120 55) rotate(8 180 210)"><rect x="15" y="15" width="350" height="430" fill="#526078"/><rect width="350" height="430" fill="url(#paper-light)"/><text x="30" y="45" font-family="Arial" font-size="12" fill="#707888">2017 / A LANDMARK PAPER</text><text x="30" y="93" font-family="Arial" font-weight="700" font-size="27" fill="#111827">Attention Is</text><text x="30" y="128" font-family="Arial" font-weight="700" font-size="27" fill="#111827">All You Need</text><path d="M30 155H320M30 175H290M30 195H310" stroke="#a5acb9" stroke-width="4"/><g stroke="#aeb7c9" stroke-width="2" fill="none"><path d="M70 345L175 255L280 345M70 255L175 345L280 255M70 255H280M70 345H280M175 255V345"/></g><g fill="#cc4335"><circle cx="70" cy="255" r="10"/><circle cx="175" cy="255" r="10"/><circle cx="280" cy="255" r="10"/></g><g fill="#202b47"><circle cx="70" cy="345" r="10"/><circle cx="175" cy="345" r="10"/><circle cx="280" cy="345" r="10"/></g><text x="30" y="405" font-family="Arial" font-size="11" fill="#707888">CONCEPTUAL COVER · NOT THE ORIGINAL PAGE</text></g></svg></div><div><span class="editorial-kicker">READ WITH A GUIDE</span><h2 id="research-title">How the Transformer<br>uses attention</h2><p>Open the 2017 paper <em>Attention Is All You Need</em>. The guide explains how the authors used attention for translation and where to find their results.</p><a class="editorial-primary" href="?view=library#transformer">Open the paper ${arrow}</a><a class="editorial-text-link" href="?view=learn&lesson=transformer">Take the guided lesson →</a></div></section>
 <footer class="explore-footer"><div><strong>The AI Reading Room</strong><p>Read the original papers, work through examples and keep notes as you go.</p></div><div><a href="?view=learn">Learning paths →</a><a href="?view=basics&study=industry">Industry essentials →</a><span>Your notes and progress stay in this browser.</span></div></footer>`;
 const figureDescriptions = {
  tokens: ['After “Tighten the bolt”, the example assigns until 50%, to 30%, and with 20%.','在“Tighten the bolt”之后，示例给 until、to、with 分别分配 50%、30%、20% 的概率。'],
  descent: ['Four gradient steps move w from 3 toward zero on a quadratic loss curve.','在二次损失曲线上，四次梯度更新使 w 从 3 向零移动。'],
  retrieval: ['A relevance matrix matches a quantity question to stock, a price question to prices, and a shipping question to dispatch.','相关度矩阵将数量、价格和发货问题分别匹配到库存、价格和发货记录。']
 };
 function setFigureLanguage() {
   const chinese = document.documentElement.lang.startsWith('zh');
   shell.querySelectorAll('[data-figure]').forEach(img => {
     const key = img.dataset.figure;
     img.src = 'media/figures/' + key + '-' + (chinese ? 'zh' : 'en') + '.svg';
     img.alt = figureDescriptions[key][chinese ? 1 : 0];
   });
 }
 document.addEventListener('room-language', setFigureLanguage);
 setFigureLanguage();
 const showCourse = mountCourse(shell.querySelector("#literacy-course"));
 function show(){onShow();shell.hidden=false;showCourse();document.body.classList.add('overview-mode');shell.scrollTop=0;if(new URLSearchParams(location.search).get('case')!=='spatial')history.replaceState(null,'','?view=explore');}
 return {show,hide:()=>{shell.hidden=true}};
}
