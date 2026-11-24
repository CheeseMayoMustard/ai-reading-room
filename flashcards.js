import {seminar} from './seminar.js?v=readingedit1';
const escapeText = value => String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export function setupFlashcards({data,get,set,render,open}) {
  let group = 'All', mode = 'all', position = 0, flipped = false;
  let ratings = {};
  try { const saved=JSON.parse(get('vocabulary-ratings')||'{}');if(saved&&typeof saved==='object'&&!Array.isArray(saved))ratings=saved; } catch {}
  const groups = [...new Set(data.terms.map(t=>t.group))];
  function deck() {return data.terms.filter(t=>(group==='All'||t.group===group)&&(mode==='all'||ratings[t.id]!=='familiar'));}
  function start(id) {
    group='All';mode='all';position=Math.max(0,data.terms.findIndex(t=>t.id===id));flipped=false;
  }
  function view() {
    const cards=deck();position=Math.min(position,Math.max(0,cards.length-1));
    const card=cards[position];
    const familiar=data.terms.filter(t=>ratings[t.id]==='familiar').length;
    return '<div class="bs-section-head"><div><span class="section-label">Vocabulary practice</span><h2>Explain a term from memory</h2><p>Say what the term means and give an example. Then open the explanation and decide whether you want to practice it again.</p></div><span>'+familiar+' / '+data.terms.length+' marked familiar</span></div><div class="fc-controls"><label>Topic<select id="fc-group">'+['All',...groups].map(g=>'<option '+(g===group?'selected':'')+'>'+g+'</option>').join('')+'</select></label><label>Deck<select id="fc-mode"><option value="all" '+(mode==='all'?'selected':'')+'>All terms</option><option value="review" '+(mode==='review'?'selected':'')+'>Needs review</option></select></label><span>'+cards.length+' cards</span></div>'+
    (!card?'<div class="fc-card"><h3>You have reviewed this deck.</h3><p>Choose All terms to practice again, or select another topic.</p></div>':
    '<section class="fc-card"><span class="section-label">'+'<span>'+escapeText(card.group)+'</span> · '+(position+1)+' / '+cards.length+'</span><h3>'+escapeText(card.name)+'</h3>'+
    (flipped?'<div class="fc-definition">'+seminar(card)+'</div>':'<p class="fc-prompt">What does it mean, and where would you use it?</p>')+
    '<button id="fc-flip" class="lp-primary" aria-expanded="'+flipped+'">'+(flipped?'Hide explanation':'Reveal explanation')+'</button>'+
    (flipped?'<div class="fc-ratings"><button id="fc-again">Revisit this</button><button id="fc-known">Feels familiar ✓</button><button id="fc-details">Full definition & source ↗</button></div>':'')+'</section><div class="fc-pagination"><button id="fc-prev" '+(position===0?'disabled':'')+'>← Previous</button><span>'+ (position+1)+' of '+cards.length+'</span><button id="fc-next" '+(position===cards.length-1?'disabled':'')+'>Next →</button></div>');
  }
  function bind(root) {
    const select=root.querySelector('#fc-group');if(!select)return;
    select.onchange=e=>{group=e.target.value;position=0;flipped=false;render()};
    root.querySelector('#fc-mode').onchange=e=>{mode=e.target.value;position=0;flipped=false;render()};
    const flip=root.querySelector('#fc-flip');if(!flip)return;
    flip.onclick=()=>{flipped=!flipped;render();const target=flipped?root.querySelector('.mini-talk h3'):root.querySelector('#fc-flip');target.scrollIntoView({block:'start',behavior:'instant'});target.focus({preventScroll:true})};
    function move(delta) {position+=delta;flipped=false;render();}
    root.querySelector('#fc-prev').onclick=()=>move(-1);
    root.querySelector('#fc-next').onclick=()=>move(1);
    if(flipped) {
      const card=deck()[position];
      for(const [id,rating] of [['fc-again','review'],['fc-known','familiar']]) {
        root.querySelector('#'+id).onclick=()=>{
          ratings[card.id]=rating;set('vocabulary-ratings',JSON.stringify(ratings));
          if(mode==='all')position=Math.min(position+1,deck().length-1);
          flipped=false;render();
        };
      }
      root.querySelector('#fc-details').onclick=()=>open(card.id);
    }
  }
  function importRatings(incoming) {
    if(!incoming||typeof incoming!=='object')return;
    for(const term of data.terms)if(['familiar','review'].includes(incoming[term.id])&&!ratings[term.id])ratings[term.id]=incoming[term.id];
    set('vocabulary-ratings',JSON.stringify(ratings));
  }
  return {view,bind,start,exportRatings:()=>({...ratings}),importRatings};
}
