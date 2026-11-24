import {nestedFields} from './field-board.js?v=readingedit1';
import {talks} from './seminar-notes.js?v=readingedit1';
import {talkSlides} from './seminar-content.js?v=readingedit1';
import {conceptFigure,bindFigures} from './concept-figures.js?v=readingedit1';
import {lessonMedia,prepareLessonMedia,prepareNarration} from './lesson-media.js?v=readingedit1';

const esc = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
let speed=1,autoAdvance=false;
try {speed=Number(localStorage.getItem('ai-room-narration-speed'))||1;autoAdvance=localStorage.getItem('ai-room-narration-advance')==='true'}catch{}
if(![.85,1,1.15,1.3].includes(speed))speed=1;
function savePrefs(){try{localStorage.setItem('ai-room-narration-speed',speed);localStorage.setItem('ai-room-narration-advance',autoAdvance)}catch{}}
export function seminar(term){return '<section class="mini-talk" data-talk="'+term.id+'"></section>'}
export function stopNarration(){
 document.querySelectorAll('.mini-talk audio,.mini-talk video').forEach(media=>media.pause());
 // Cancel any older browser narration that was running before a view change.
 window.speechSynthesis?.cancel();
}
function attach(box,term){
 if(!term||!talks[term.id])return;
 const [, ,question,answer]=talks[term.id];
 const slides=talkSlides(term);let step=0,revealed=false;const last=slides.length;
 function board(){
  if(step===last)return '';
  const animation=lessonMedia(term.id,step);
  let figure=term.id==='ai'?nestedFields(step):term.id==='llm'?'':step===0?conceptFigure(term.id):'';
  if(animation&&figure)figure='<details class="talk-diagram"><summary>'+ (term.id==='ai'?'See how the fields fit together':'Explore the diagram & mathematics')+'</summary>'+figure+'</details>';
  return animation+figure;
 }
 function paint(focus=false,continuePlaying=false){
  const isCheck=step===last;
  const [heading,body]=isCheck?[question,'Take a moment to answer in your own words.']:slides[step];
  const clip=term.id+'-'+(isCheck?(revealed?'answer':'question'):step);
  box.innerHTML='<div class="talk-position"><span>'+(isCheck?'Check your reasoning':'Guided explanation')+'</span><span>'+(step+1)+' / '+(last+1)+'</span></div>'+
   '<h3 tabindex="-1">'+esc(heading)+'</h3>'+ (lessonMedia(term.id,step)?'<details class="talk-transcript"><summary>Read the explanation</summary><p class="talk-voice">'+esc(body)+'</p></details>':'<p class="talk-voice">'+esc(body)+'</p>')+board()+
   (isCheck?'<button class="talk-answer" aria-expanded="'+revealed+'">'+(revealed?'Hide explanation':'Show explanation')+'</button>'+(revealed?'<p class="talk-response">'+esc(answer)+'</p>':''):'')+
   '<div class="talk-player"><div class="talk-player-title"><span>'+ (isCheck&&revealed?'Listen to the answer':'Listen to this part')+'</span><small>AI-generated voice</small></div>'+
   '<audio controls preload="metadata" aria-label="'+(isCheck&&revealed?'Answer narration':'Lesson narration')+'" data-audio-src="media/narration/'+clip+'.mp3?v=readingedit1"></audio>'+
   '<div class="talk-audio-options"><label>Speed <select aria-label="Narration speed">'+[.85,1,1.15,1.3].map(n=>'<option value="'+n+'" '+(speed===n?'selected':'')+'>'+n+'×</option>').join('')+'</select></label>'+ (!isCheck?'<label><input type="checkbox" data-advance '+(autoAdvance?'checked':'')+'> Continue automatically</label>':'<small>Pause and think before revealing the answer.</small>')+'</div><small role="status" class="talk-audio-status"></small></div>'+
   '<div class="talk-nav"><button data-back '+(step===0?'disabled':'')+'>← Back</button><button class="talk-forward" data-next>'+ (isCheck?'Start again':step===last-1?'Try the question →':'Continue →')+'</button></div>';
  if(lessonMedia(term.id,step))box.querySelector('h3').after(box.querySelector('.talk-player'));
  bindFigures(box);
  function move(n){stopNarration();step=n;revealed=false;paint(true)}
  box.querySelector('[data-back]').onclick=()=>move(step-1);
  box.querySelector('[data-next]').onclick=()=>move(isCheck?0:step+1);
  const reveal=box.querySelector('.talk-answer');
  if(reveal)reveal.onclick=()=>{stopNarration();revealed=!revealed;paint();box.querySelector('.talk-answer').focus({preventScroll:true})};
  const audio=box.querySelector('audio'),video=box.querySelector('video'),status=box.querySelector('.talk-audio-status');
  prepareLessonMedia(video);
  const audioReady=prepareNarration(audio);
  audio.playbackRate=speed;
  box.querySelector('select').onchange=e=>{speed=Number(e.target.value);audio.playbackRate=speed;savePrefs()};
  const advance=box.querySelector('[data-advance]');if(advance)advance.onchange=()=>{autoAdvance=advance.checked;savePrefs()};
  audio.onplay=()=>{
   document.querySelectorAll('.mini-talk audio,.mini-talk video').forEach(other=>{if(other!==audio)other.pause()});
   status.textContent='';
   if(video&&video.readyState===0)video.load();
  };
  // Scrub the silent animation alongside the spoken explanation. It remains
  // separately playable with its native controls when narration is paused.
  function syncVideo(){if(video&&Number.isFinite(video.duration)&&Number.isFinite(audio.duration)&&audio.duration>0){video.currentTime=Math.min(video.duration-.01,audio.currentTime/audio.duration*video.duration)}}
  audio.ontimeupdate=()=>{if(!audio.paused)syncVideo()};audio.onseeking=syncVideo;
  if(video)video.onplay=()=>{if(!audio.paused)audio.pause()};
  audio.onended=()=>{
   if(autoAdvance&&step<last&&box.isConnected){step++;paint(true,step<last)}
  };
  audio.onerror=()=>{status.textContent='The narration could not load. Check your connection, then retry.';if(!box.querySelector('[data-retry]')){const retry=document.createElement('button');retry.dataset.retry='';retry.textContent='Retry audio';retry.onclick=()=>{audio.load();audio.play().catch(()=>{status.textContent='Tap the audio play control to listen.'})};status.append(' ',retry)}};
  if(continuePlaying)audioReady.then(()=>{if(audio.isConnected&&!box.closest('[hidden]'))return audio.play()}).catch(()=>{status.textContent='Press play to continue listening.'});
  if(focus){box.scrollIntoView({block:'start',behavior:'instant'});box.querySelector('h3').focus({preventScroll:true})}
 }
 paint();
}
export function bindSeminars(root,terms){for(const box of root.querySelectorAll('[data-talk]'))attach(box,terms.get(box.dataset.talk))}
