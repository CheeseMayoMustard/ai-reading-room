import {activities,readingClues} from './paper-activities.js?v=readingedit1';

const tr = value => {
  const [en, zh] = value.split('|');
  return document.documentElement.lang.startsWith('zh') && zh ? zh : en;
};
const escaped = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const action = (id, label, major=false) => '<button type="button" data-work="'+id+'" class="'+(major?'ws-major':'ws-link')+'">'+tr(label)+'</button>';
const stateKey = id => 'paper-workshop-v1-'+id;
function clean(raw={}) {
  return {
    stage: [0,1,2].includes(raw?.stage) ? raw.stage : 0,
    choice: [0,1,2].includes(raw?.choice) ? raw.choice : null,
    hint: raw?.hint===true,
    input: Number.isFinite(raw?.input) ? raw.input : null,
    reflection: typeof raw?.reflection==='string' ? raw.reflection : ''
  };
}
export function workshopState(id,get) {
  try { return clean(JSON.parse(get(stateKey(id)))); } catch { return clean(); }
}
export function importWorkshop(id,raw,get,set) {
  if(!raw || typeof raw!=='object') return;
  const incoming=clean(raw);
  const local=workshopState(id,get);
  if(!get(stateKey(id))) { set(stateKey(id),JSON.stringify(incoming)); return; }
  if(incoming.reflection && !local.reflection.includes(incoming.reflection)) {
    local.reflection=[local.reflection,incoming.reflection].filter(Boolean).join('\n\n');
    set(stateKey(id),JSON.stringify(local));
  }
}

// These follow the same numerical examples as the prompt. The learner can change one input.
const simulations = {
  transformer:{label:'Share given to the 10 °C sensor|10 °C 传感器的权重',min:0,max:100,step:10,start:80,ymax:10,f:n=>n/10,input:'%',unit:'°C'},
  lora:{label:'Adapter rank|适配器的秩',min:1,max:8,step:1,start:2,ymax:1600,f:n=>200*n,unit:'trainable entries|个可训练元素'},
  vllm:{label:'Tokens to store|要存储的词元数',min:1,max:16,step:1,start:6,ymax:4,f:n=>Math.ceil(n/4),unit:'blocks|块'},
  qlora:{label:'Bits per stored weight|每个权重的位数',min:2,max:16,step:2,start:4,ymax:16,f:n=>n,input:' bit',unit:'MB'},
  kimi25:{label:'Minutes per parallel check|每项并行核查的分钟数',min:1,max:20,step:1,start:10,ymax:22,f:n=>n+2,input:' min',unit:'min'},
  chinchilla:{label:'Model size in budget units|模型大小（预算单位）',min:5,max:25,step:5,start:20,ymax:20,f:n=>100/n,unit:'data units|个数据单位'}
};
function marker({min,max,ymax,f},n) {
  return [330*(.205+.735*(n-min)/(max-min)),185*(.71-.60*f(n)/ymax)];
}
function result(config,n) {
  return n+(config.input||'')+' → '+Number(config.f(n).toFixed(2))+' '+tr(config.unit);
}
function experiment(id,savedInput) {
  const config=simulations[id];
  const descriptions={
    gemini4neon:'A one-million-token window with 980,000 used and 20,000 left.|100 万词元的窗口已用 98 万，还剩 2 万。',
    claudefable52:'Fable 5.2 scored 85.6% before and 91.6% after the counter was added.|Fable 5.2 加入计数器前得分 85.6%，加入后为 91.6%。',
    gpt62:'Cases enter this evaluation through a user report about an earlier mistake.|用户先报告之前回答中的错误，相应案例才可能进入这项评测。'
  };
  if(descriptions[id]){
    const language=document.documentElement.lang.startsWith('zh')?'zh':'en';
    return '<div class="ws-chart"><img src="media/workshop/'+id+'-'+language+'.svg" alt="'+tr(descriptions[id])+'"></div>';
  }
  if(!config)return '';
  const {label,min,max,step,start}=config;
  const n=Number.isFinite(savedInput) && savedInput>=min && savedInput<=max && (savedInput-min)%step===0 ? savedInput : start;
  const [cx,cy]=marker(config,n);
  const lang=document.documentElement.lang.startsWith('zh')?'zh':'en';
  const graphic='<div class="ws-chart"><img src="media/workshop/'+id+'-'+lang+'.svg" alt="'+tr(label)+'"><svg aria-hidden="true" viewBox="0 0 330 185"><circle cx="'+cx+'" cy="'+cy+'" r="5.5" fill="#bc562b" stroke="white" stroke-width="1.6"/></svg></div>';
  return '<div class="ws-experiment">'+graphic+'<label for="ws-slider">'+tr(label)+'</label><input type="range" id="ws-slider" min="'+min+'" max="'+max+'" step="'+step+'" value="'+n+'"><output for="ws-slider">'+result(config,n)+'</output></div>';
}
export function mountWorkshop(root,id,{get,set,evidence,more}) {
  const activity=activities[id];
  if(!activity)return;
  const [prompt,options,correct,hint,worked,page,cue]=activity;
  const state=workshopState(id,get);
  const save=()=>set(stateKey(id),JSON.stringify(state));
  const steps=['Try it|动手试试','Work it out|拆解思路','Read the evidence|回到原文'];
  function draw(focus=false) {
    let body;
    if(state.stage===0) {
      const tried=state.choice!==null;
      const right=state.choice===correct;
      body='<h3 tabindex="-1">'+tr('Choose an answer|选择答案')+'</h3><p class="ws-prompt">'+tr(prompt)+'</p><div class="ws-choices">'+options.map((opt,i)=>
        '<button data-choice="'+i+'" aria-pressed="'+(state.choice===i)+'"><span aria-hidden="true">'+String.fromCharCode(65+i)+'</span>'+tr(opt)+'</button>'
      ).join('')+'</div>';
      if(tried)body+='<p role="status" class="ws-feedback">'+tr(right?'Yes. Read the solution to check your reasoning.|答对了。可以打开解题过程，核对自己的思路。':'Try again, or open the worked example.|可以再试一次，也可以查看解题过程。')+'</p>';
      if(state.hint || (tried&&!right))body+='<p class="ws-hint">'+tr(hint)+'</p>';
      body+='<div class="ws-actions">'+(!state.hint&&(!tried||right)?action('hint','Give me a hint|给我一点提示'):'')+action('worked','Show worked example|查看解题过程',tried)+'</div>';
    } else if(state.stage===1) {
      body='<h3 tabindex="-1">'+tr('How to work it out|这道题怎样解')+'</h3><p class="ws-solution"><strong>'+tr(options[correct])+'</strong></p><p>'+tr(worked)+'</p>'+experiment(id,state.input)+'<div class="ws-actions">'+action('verify','Find it in the paper|去论文里找依据',true)+action('retry','Try the question again|重做这道题')+'</div>';
    } else {
      body='<h3 tabindex="-1">'+tr('Find the evidence|找到原文依据')+'</h3><p>'+tr(cue)+'</p><details class="ws-clue"><summary>'+tr('Key terms in this passage|这段原文中的关键术语')+'</summary><p>'+tr(readingClues[id])+'</p></details>'+action('page','Open PDF page '+page+'|跳到 PDF 第 '+page+' 页',true)+'<p class="ws-page-status" role="status"></p><label class="ws-reflection" for="ws-reflection">'+tr('How does the passage connect to your example?|这段原文和刚才的例子有什么联系？')+'</label><textarea id="ws-reflection" rows="3" placeholder="'+tr('One sentence in your own words…|用自己的话写一句……')+'">'+escaped(state.reflection)+'</textarea><small>'+tr('Saved in this browser and included in your journal export.|保存在此浏览器，也会包含在导出的阅读日志里。')+'</small><div class="ws-actions">'+action('worked','Worked example|解题过程')+action('more','More practice|更多练习')+'</div>';
    }
    root.innerHTML='<section class="paper-workshop"><div class="ws-progress" aria-label="'+tr('Exercise progress|练习进度')+'">'+steps.map((label,i)=>'<span '+(state.stage===i?'aria-current="step"':'')+'>'+ (i+1)+' · '+tr(label)+'</span>').join('')+'</div>'+body+'</section>';
    root.querySelectorAll('[data-choice]').forEach(button=>button.onclick=()=>{state.choice=Number(button.dataset.choice);save();draw();root.querySelector('[data-choice="'+state.choice+'"]').focus({preventScroll:true})});
    root.querySelectorAll('[data-work]').forEach(button=>button.onclick=async()=>{
      switch(button.dataset.work) {
        case 'page': {
          const message=root.querySelector('.ws-page-status');
          message.textContent=tr('Opening the page…|正在打开页面……');
          const found=await evidence(page,id);
          if(message.isConnected)message.textContent=found?tr('Showing PDF page '+page+'.|当前显示 PDF 第 '+page+' 页。'):tr('The PDF is still loading. Try this button again.|PDF 仍在加载，请稍后再试。');
          return;
        }
        case 'more': more();return;
        case 'hint': state.hint=true;break;
        case 'retry': state.stage=0;state.choice=null;state.hint=false;state.input=null;break;
        case 'worked': state.stage=1;break;
        case 'verify': state.stage=2;break;
      }
      save();draw(true);
    });
    const reflection=root.querySelector('#ws-reflection');
    if(reflection)reflection.oninput=()=>{state.reflection=reflection.value;save()};
    const slider=root.querySelector('#ws-slider');
    if(slider)slider.oninput=()=>{const config=simulations[id],n=Number(slider.value);state.input=n;save();const [x,y]=marker(config,n);const dot=root.querySelector('.ws-chart circle');dot.setAttribute('cx',x);dot.setAttribute('cy',y);root.querySelector('output').textContent=result(config,n)};
    if(focus)root.querySelector('h3').focus({preventScroll:true});
  }
  draw();
}
