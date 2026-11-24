import {conceptZh} from './concept-zh.js?v=readingedit1';
import {figureText} from './figure-locale.js?v=readingedit1';
import {lineChart,bars,colors,maskPlot,processTrace} from './concept-chart.js?v=readingedit1';
import {nestedFields} from './field-board.js?v=readingedit1';
import {lossPlot,vectorPlot,frame} from './visual-studio.js?v=readingedit1';

// Schematics show a concrete example. Each arrow has a defined reading order.
const schemes = {
  fewshot:['Classify a new message from examples',['Example 1 · invoice → finance','Example 2 · fault → maintenance','New message · damaged pump','Predicted label · maintenance'],'The demonstrations and new request share the same prompt. The example labels show the task.'],
  grounding:['Trace one factual claim',['Answer · 50 bags in stock','Follow the cited inventory row','Record · 50 bags in stock'],'The record supports this count. A price claim would need its own evidence.'],
  alignment:['Evaluate a desired behavior',['Goal · cite a supplied record','Run a held-out question','Check whether the citation supports the answer'],'Define a behavior you can inspect. One evaluation measures one aspect of the broader alignment problem.'],
  nf:['Represent a weight with NF4',['Start with a block of weights','Scale the block','Store a four-bit code per weight','Decode using the codebook and scale'],'Four bits select one of 16 possible codebook entries. NF4 spaces the levels to suit approximately normally distributed weights.'],
  linearscaling:['Double the sequence length',['100 positions → 100 steps','200 positions → 200 steps','400 positions → 400 steps'],'In this illustration the work per position stays constant, so doubling the length doubles the step count.'],
  mla:['Reuse a compressed attention state',['Compress a token’s features','Keep the compressed state','Use it for later attention'],'For later attention steps, the model keeps a shorter list of numbers for each token. Several heads can use information from that same list. The full method also stores position information.'],
  reinforcementlearning:['Learn from a reward',['Choose a reply','Score its outcome','Update the policy','Sample another reply'],'Over many examples the training rule changes how likely the model is to choose different replies.'],
  ngram:['Slide a two-token window',['Tokens · the red car stops','Pair 1 · the red','Pair 2 · red car','Pair 3 · car stops'],'An n-gram is a contiguous window of n tokens. This four-token sequence contains three bigrams.'],
  asynchronousrl:['Collect replies while training continues',['Generate example replies','Train on the previous examples','Queue the new examples','Use the updated model for later replies'],'One process generates replies while another uses earlier replies to update the model. A reply can therefore come from a slightly older version of the model being trained.'],
  sparseattention:['Select a neighborhood',['Query at position 8','Window uses positions 6, 7, 8','Score and mix those three values'],'This local window is one sparse pattern. Other methods choose positions differently.'],
  residualconnection:['Carry an input past a layer',['Input x = 2','Layer computes F(x) = 3','Combine x + F(x) = 5'],'The unchanged input and the layer output both contribute to the next layer.'],

  computeBudget:['Compare training allocations',['Fixed training budget','Choose model size and token count','Measure loss on held-out text'],'For dense Transformers, a common first approximation is C ≈ 6ND for N parameters and D training tokens. Multiple allocations can fit the same budget.'],
  draftVerify:['A speculative decoding round',['Draft several tokens','Score proposals with the target','Accept a prefix','Correct a rejection or continue'],'The acceptance and correction rule uses target probabilities. The speed benefit depends on how many proposals are accepted.'],
  patternLookup:['Look up a group of nearby tokens',['Read adjacent tokens','Compute their table address','Read the stored vector','Combine it with the model’s current features'],'For the same token pattern, the lookup rule points to the same table entry. Training determines the numbers stored there.'],
  parallelTasks:['Which steps can run at the same time?',['Split catalogue extraction','Read A and B concurrently','Wait for both results','Reconcile totals'],'Parallel reads shorten the independent stage. The final comparison depends on both results.'],
  scalingPlot:['Loss against a compute budget',['C = 1 → excess loss a','C = 4 → a/2','C = 16 → a/4'],'Illustrative power law L−L∞ = a/√C. Each fourfold increase halves the excess loss.'],
  flashIO:['Compute attention in small blocks',['Load a block into fast memory','Update the running sums','Load the next block','Write final output'],'A tile is a small rectangular block of a matrix. By working on one block at a time, FlashAttention can compute the answer without writing the full attention matrix to GPU main memory.'],
  kvHeads:['Sharing keys and values',['32 query heads','4 queries per group','8 KV heads'],'For equal dimensions and precision, the KV head-dependent storage is 8/32 of that with 32 KV heads.'],
  cacheUse:['Allocate cache as it grows',['Request needs 6 slots','Two blocks of 4 slots','6 used / 8 allocated'],'Illustrative utilization is 75%. Block allocation can still leave unused slots in the final block.'],
  preferencePair:['Train on one pair of answers',['Same prompt','Compare preferred and rejected replies','Increase relative odds of preferred reply'],'For the same prompt, compare the probabilities of the preferred and rejected answers. DPO trains the model to favor the preferred answer more strongly relative to a fixed reference model.'],
  depthWeights:['Choose among earlier layers',['Earlier layer outputs','Scores over depth','Normalized weights','Weighted layer mixture'],'Each weight here belongs to an earlier layer. For one token, the current layer combines the earlier layers’ outputs using those weights.'],
  ai:['Nested fields',['Artificial intelligence','Machine learning','Deep learning'],'Each field on the right is a subset of the preceding field.'],
  model:['One model inside an application',['User uploads a PDF','App extracts text','Model drafts an answer','App displays sources'],'File handling and source display belong to the surrounding application.'],
  llm:['One generation step',['Text so far','Token scores','Choose next token','Append and repeat'],'Each new token becomes part of the input for the following prediction.'],
  token:['One possible split',['un','help','ful','!'],'Four pieces in this illustrative tokenizer. A different tokenizer can split the same text differently.'],
  tokenizer:['Text becomes IDs',['“unhelpful!”','un | help | ful | !','31 | 9 | 74 | 5'],'The numbers are invented vocabulary IDs. The model receives the sequence of IDs.'],
  parameters:['A learned setting',['Input x = 3','Weight w = 2','Output wx = 6'],'Changing this weight to 4 changes the same input’s output to 12.'],
  transformer:['One simplified encoder block',['Token representations','Self-attention','Feed-forward layer','Updated representations'],'Attention mixes information across positions. The feed-forward layer transforms each position. Residual paths and normalization are omitted.'],
  multimodal:['Two input types, one task',['Chart image + question','Visual and text representations','Joint processing','Answer about the chart'],'The model needs evidence from the plot as well as the words in the question.'],
  pretraining:['Learning from a collection of texts',['Many texts','Prediction task','Compute loss','Update shared weights'],'The resulting weights can be reused for many downstream tasks.'],
  finetuning:['Adapting a trained model',['Pretrained weights','Labeled examples','Weight updates','Task-adapted model'],'For example, if training pairs each report with a department, the model can use the correct department label to improve its predictions.'],
  posttraining:['A possible training sequence',['Pretrained model','Instruction demonstrations','Preference training','Instruction-following model'],'A team can train a model on example instructions and replies, then use people’s preferences to refine its answers. The stages vary from model to model.'],
  inference:['Using a learned rule',['New input','Fixed model settings','Compute prediction','Return output'],'A fresh input can change the output while the learned settings stay fixed.'],
  rlhf:['How preferences enter training',['Compare two replies','Fit reward model','Optimize policy','Evaluate replies'],'In this simplified InstructGPT example, people rank replies. Their rankings train a scoring model, which provides feedback during further training. New prompts test whether the improvement carries over.'],
  distillation:['Teaching a smaller model',['Teacher responses','Student predictions','Compare signals','Update student'],'The student learns from the teacher’s behavior on examples.'],
  prompt:['Parts of a request',['Instruction','Relevant context','Examples','Question'],'These pieces together communicate the task and supply context for the answer.'],
  context:['A shared 100-token budget',['Instructions · 20','Document · 65','Answer room · 15'],'In this example, 20 + 65 + 15 fills the shared window.'],
  rag:['Find the record before answering',['Question','Retrieve passages','Generate with passages','Check cited evidence'],'A retrieval failure happens before generation. An unsupported answer can also arise after the correct passage was found.'],
  hallucination:['Locate the unsupported detail',['Source: date pending','Model: arrives Friday','Check source','Friday unsupported'],'The generated delivery date has no supporting statement in the supplied record.'],
  reasoning:['Extra work for a calculation',['3 pallets × 24 bags','72 bags total','Subtract 5 damaged','67 usable bags'],'Intermediate steps make this calculation inspectable. Additional steps also consume resources.'],
  agent:['Choose the next action',['Inspect inventory','Query a table','Observe unit mismatch','Choose a conversion'],'The observation changes which action the system chooses next.'],
  workflow:['A predefined sequence',['Read invoice','Extract rows','Sum amounts','Compare total'],'The processing steps are specified in advance. An agent can choose parts of its sequence dynamically.'],
  tool:['A software operation',['Model requests SUM','Spreadsheet executes','Numeric result returned'],'The returned value comes from executing the operation.'],
  harness:['Around the model',['Supply files and tools','Run model','Execute requested tool','Feed observation back'],'The surrounding software manages context, permissions and steps.'],
  verification:['Check the actual outcome',['Request an edit','Open saved file','Compare values','Confirm or correct'],'Reopen the file and read the cell that was supposed to change. Does it now contain the requested value?'],
  gpu:['Parallel numerical work',['Split a matrix operation','Compute many products in parallel','Combine partial sums'],'Accelerators can process many arithmetic operations concurrently. Data movement affects the resulting speed.'],
  moe:['Routing one token',['Token representation','Router scores experts','Select expert(s)','Combine output'],'A different token may activate a different subset of experts.'],
  kvcache:['Reusing past attention state',['Earlier tokens → saved K,V','New token → new query','Attend to cached K,V'],'The cache grows as the sequence grows, avoiding repeated calculation of earlier keys and values.'],
  prefill:['Two phases of a request',['Process input together','First output token','Generate next token','Repeat decode'],'Input length affects prefill. Output generation repeats decode steps.'],
  latency:['Time to first token',['Submit at 0 s','First token at 0.5 s','Last token at 4.0 s'],'TTFT is 0.5 s. Total latency is 4.0 s in this example.'],
  throughput:['A shared service',['4 simultaneous requests','200 output tokens total','2 seconds elapsed','100 tokens/s aggregate'],'Aggregate throughput combines the work served to all users.'],
  benchmark:['What a score depends on',['Fixed tasks','Defined tools and budget','Scoring rule','Reported score'],'Check the setup before comparing two reported scores.'],
  ablation:['Change one component',['Reference setup · 80%','Remove component','Matched evaluation · 76%'],'The illustrative difference is four percentage points under the matched conditions.'],
  checkpoint:['A saved training state',['Train to step 1000','Save weights','Reload checkpoint','Resume or run inference'],'Resuming training exactly may also require optimizer and other training state.'],
  openweights:['Inspect a model release',['Downloadable weights','Read license','Check code and data availability'],'These checks answer different questions about use and reproducibility.'],
  preprint:['Trace a publication claim',['Announcement','Find technical report','Inspect experiment','Check review status'],'A claim can appear in several formats. Each source documents a different part of the evidence.'],
  flops:['Counting operations',['4 multiplications','3 additions','Dot product of 4 pairs','7 arithmetic operations'],'A direct four-element dot product uses seven operations by this counting convention. Hardware FLOP conventions can differ.'],
  sgd:['Why gradient estimates vary between batches',['Sample a mini-batch','Estimate its gradient','Update weights','Draw next batch'],'Changing the sample can change the estimated direction even at the same weights.'],
  minibatch:['One training batch',['Example losses: 1, 2, 3, 2','Mean loss = 2','Differentiate batch mean','Update weights'],'The examples contribute jointly to this update.'],
  epoch:['One full pass',['1,000 examples','50 per batch','20 batches','1 epoch'],'With one update per batch, this epoch contains 20 updates.'],
  backprop:['The chain rule along a path',['w = 2, x = 3','u = wx = 6','L = u²/2 = 18','∂L/∂w = u·x = 18'],'Follow the computation forward for the value, then multiply local derivatives backward.'],
  split:['Three separate uses',['Training: fit weights','Validation: choose settings','Test: estimate final performance'],'Keep examples separated so that final evaluation reflects unseen cases.'],
  baseline:['A reference for comparison',['Baseline: 8/10 correct','New method: 9/10','Matched gain: 1/10'],'This small illustrative sample shows how the comparison is formed.'],
  leakage:['A feature from the future',['Predict on Monday','Feature includes Friday arrival','Future outcome leaks into input'],'Restrict features to information available when a real prediction would be made.']
};

const explanations = {
  loss:['Loss rises away from the minimum','Height represents L=(x²+3y²)/2. Rotate the bowl to inspect its shape.'],
  descent:['Follow the update path','The orange point moves from (1.5,1.2) by subtracting η∇L at each step.'],
  rate:['Change the size of each update','Raise η above 1/3. The y coordinate then switches sign at each step because the surface curves more sharply in that direction.'],
  gradient:['Slope at the current position','For this bowl, ∇L=(x,3y). The orange path follows the negative gradient.'],
  curvature:['Two curvatures in one bowl','The Hessian is diag(1,3). The y direction has three times the curvature of the x direction.'],
  vector:['Coordinates in three dimensions','The green vector q points along x. Rotate the figure to see the three components of v.'],
  embedding:['Compare two vectors by their angle','Here q and v stand for the embeddings of two items. Change the angle between them to see how cosine similarity measures their alignment.'],
  norm:['Stretch a vector','Change the orange vector’s length with the angle held fixed. Its norm changes with its length.'],
  cosine:['Angle determines similarity','Stretch v while keeping its angle fixed. Cosine similarity stays constant.'],
  euclidean:['Distance between two tips','Adjust the angle or length of v. The distance is ‖q−v‖, measured between their endpoints.'],
  dotproduct:['Both length and angle matter','The dot product is ‖q‖‖v‖cos θ. Here ‖q‖=1.']
};
const plots = {
  attention:'Mix the values using attention weights',softmax:'Normalize three scores',temperature:'Change a sampling distribution',
  lora:'Count trainable entries at a chosen rank',memory:'Store eight billion weights',quantization:'Compare raw storage at different precisions',
  active:'Stored experts and active experts',precision:'How many retrieved items are relevant?',recall:'How many relevant items were retrieved?',
  mask:'Visible positions for one query',position:'Position becomes a pair of signals',regularize:'Add a penalty to the fitted loss',
  overfit:'Training and validation can separate',calibration:'Compare confidence with observed frequency',state:'The response of a decaying state'
};
const series=(n,fn)=>Array.from({length:n},(_,i)=>fn(i/(n-1)));
const range=(name,label,min,max,step,value)=>({name,label,min,max,step,value});
function controls(id){
  if(['loss','gradient','descent','rate','curvature'].includes(id))return [range('step','Update',0,12,1,3),range('eta','Learning rate η',.02,.64,.01,.18),range('yaw','Rotate (°)',-180,180,1,-29)];
  if(explanations[id])return [range('theta','Angle θ (°)',0,180,1,55),range('r','Length of v',.3,2.4,.1,1.5),range('yaw','Rotate (°)',-180,180,1,-29)];
  if(['attention','softmax','temperature'].includes(id))return [range('tau','Temperature τ',.2,3,.1,1)];
  if(id==='lora')return [range('r','Rank',1,64,1,8)];
  if(['memory','quantization'].includes(id))return [range('bits','Bits per weight',4,16,4,8)];
  if(id==='active')return [range('count','Experts used',1,8,1,2)];
  if(['precision','recall'].includes(id))return [range('hits','Relevant items retrieved',0,10,1,8)];
  if(id==='mask')return [range('pos','Query position',1,6,1,3)];
  if(id==='position')return [range('freq','Angular frequency',1,6,1,2)];
  if(id==='regularize')return [range('lambda','Penalty λ',0,2,.1,.5)];
  if(id==='state')return [range('a','Decay a',.2,2,.1,1)];
  return [];
}
function draw(id,v){
  if(['loss','gradient','descent','rate','curvature'].includes(id)){
    const result=lossPlot(v.yaw,v.pitch??29,v.eta,v.step), x=1.5*(1-v.eta)**v.step,y=1.2*(1-3*v.eta)**v.step;
    return [frame(result),'L = '+result.values[2][1]+' · ∇L = ('+x.toFixed(2)+', '+(3*y).toFixed(2)+')'];
  }
  if(explanations[id]){
    const result=vectorPlot(v.yaw,v.pitch??25,v.theta,v.r),c=Math.cos(v.theta*Math.PI/180);
    return [frame(result),'q·v = '+(v.r*c).toFixed(2)+' · cos θ = '+c.toFixed(2)+' · ‖q−v‖ = '+Math.sqrt(Math.max(0,1+v.r*v.r-2*v.r*c)).toFixed(2)];
  }
  if(['temperature','attention','softmax'].includes(id)){
    const raw=[2,1,0].map(s=>Math.exp((s-2)/v.tau)),sum=raw.reduce((a,b)=>a+b),w=raw.map(n=>n/sum);
    return [bars(w.map((n,i)=>['Score '+(2-i),n,(100*n).toFixed(1)+'%']),1,id==='attention'?'Attention weight':'Probability',true),id==='attention'?'Values [0,5,10] give weighted output '+(5*w[1]+10*w[2]).toFixed(2)+'.':'pᵢ = exp(sᵢ/τ) / Σⱼ exp(sⱼ/τ). The three probabilities sum to 1.'];
  }
  if(id==='lora'){
    const n=2048*v.r;
    return [bars([['Full matrix',1024**2,'1,048,576'],['Adapters',n,n.toLocaleString()]],1024**2,'Trainable entries'),'For W of size 1024 × 1024, B and A together have 2 × 1024 × r trainable entries.'];
  }
  if(['quantization','memory'].includes(id))return [bars([['16-bit base',16,'16 GB'],[v.bits+'-bit',v.bits,v.bits+' GB']],16,'Raw weight storage (GB)'),'8 billion weights × '+v.bits+' bits ÷ 8 = '+v.bits+' decimal GB. Raw weight storage only.'];
  if(id==='active')return [bars([['Stored',8,'8 experts'],['Used',v.count,v.count+' active']],8,'Number of experts'),v.count+' of 8 equal-size experts are active for this toy token. Shared layers are excluded.'];
  if(['precision','recall'].includes(id)){
    const denominator=id==='precision'?10:20;
    return [bars([['Relevant hits',v.hits,String(v.hits)],[id==='precision'?'Retrieved':'All relevant',denominator,String(denominator)]],denominator,'Number of items'),id+' = '+v.hits+'/'+denominator+' = '+100*v.hits/denominator+'%. The search returns 10 items from a collection containing 20 relevant items.'];
  }
  if(id==='mask')return [maskPlot(v.pos),'Query '+v.pos+' can use positions 1 through '+v.pos+'. Future positions receive zero attention weight.'];
  if(id==='position')return [lineChart([{values:series(81,t=>Math.sin(t*v.freq*2*Math.PI)),color:colors.green},{values:series(81,t=>Math.cos(t*v.freq*2*Math.PI)),color:colors.orange,dash:true}],'Position p','Signal',[0,2*Math.PI],[0,Math.PI/2,Math.PI,1.5*Math.PI,2*Math.PI],['0','π/2','π','3π/2','2π']),'The solid curve shows sin(ωp). The dashed curve shows cos(ωp). One frequency pair illustrates the positional encoding.'];
  if(id==='regularize')return [lineChart([{values:series(65,t=>(3*t-2)**2),color:colors.green},{values:series(65,t=>(3*t-2)**2+v.lambda*(3*t)**2),color:colors.orange,dash:true}],'Weight w','Objective',[0,3],[0,1,2,3]),'Green: (w−2)². Dashed: (w−2)² + λw². The penalized minimum is w = '+(2/(1+v.lambda)).toFixed(2)+'.'];
  if(id==='overfit')return [lineChart([{values:[1,.72,.5,.36,.25,.16,.1],color:colors.green},{values:[1,.75,.58,.5,.54,.66,.79],color:colors.orange,dash:true}],'Training epoch','Mean loss',[1,7],[1,2,3,4,5,6,7]),'Illustrative losses. Training (solid) keeps falling. Validation (dashed) is lowest at epoch 4.'];
  if(id==='calibration')return [lineChart([{values:[0,.25,.5,.75,1],color:colors.gray,dash:true},{values:[.02,.18,.37,.56,.8],color:colors.orange}],'Confidence','Observed fraction',[0,1],[0,.25,.5,.75,1]),'Dashed diagonal: perfect calibration. In this toy sample the 0.75-confidence group is correct 56% of the time.'];
  if(id==='state')return [lineChart([{values:series(81,t=>(1-Math.exp(-10*v.a*t))/v.a),color:colors.green},{values:[1/v.a,1/v.a],color:colors.gray,dash:true}],'Time','State h(t)',[0,10],[0,2,4,6,8,10]),'dh/dt = −ah + 1, h(0)=0. Dashed line: steady state 1/a = '+(1/v.a).toFixed(2)+'.'];
}
const plates=new Set('computeBudget scalingPlot kvHeads cacheUse parallelTasks depthWeights moe parameters token tokenizer context reasoning latency prefill throughput ablation baseline minibatch epoch backprop kvcache distillation preferencePair draftVerify sgd leakage linearscaling sparseattention flops split'.split(' '));
function schemeDrawing(id,scheme){
  const featured={llm:'tokens',rag:'retrieval'};
  const asset=featured[id]?'media/figures/'+featured[id]:plates.has(id)?'media/concepts/'+id:null;
  if(!asset)return '<div class="cf-trace">'+processTrace(id,scheme[1])+'</div>';
  return ['en','zh'].map(lang=>'<img class="cf-plate plate-'+lang+'" loading="lazy" decoding="async" src="./'+asset+'-'+lang+'.svg" alt="'+(lang==='zh'?scheme[1].map(item=>conceptZh[item]||item):scheme[1]).join(' · ').replaceAll('"','&quot;')+'">').join('');
}

const paperTerms={
  compute:'flops',parameter:'parameters',retriever:'rag',lowrank:'lora',adapter:'lora',
  expert:'active',router:'moe',gpumemoryhierarchy:'flashIO',exactattention:'attention',exemplar:'fewshot',
  computebudget:'computeBudget',action:'tool',observation:'agent',acceptancerate:'draftVerify',
  preferencepair:'preferencePair',referencemodel:'preferencePair',head:'attention',kvhead:'kvHeads',
  lowprecision:'quantization',conditionalmemory:'patternLookup',agentswarm:'parallelTasks',depth:'depthWeights'
};
export function conceptFigure(id){
  id=paperTerms[id]||id;
  if(id==='ai')return nestedFields(2);
  const scheme=schemes[id], title=scheme?.[0]||explanations[id]?.[0]||plots[id];
  if(!title)return '';
  return '<figure class="concept-figure" data-figure="'+id+'"><figcaption>'+title+'</figcaption>'+
    (scheme?schemeDrawing(id,scheme)+'<p>'+scheme[2]+'</p>':
    '<div class="cf-drawing"></div><div class="cf-controls">'+controls(id).map(s=>'<label>'+s.label+' <output>'+s.value+'</output><input aria-label="'+s.label+'" data-param="'+s.name+'" type="range" min="'+s.min+'" max="'+s.max+'" step="'+s.step+'" value="'+s.value+'"></label>').join('')+'</div><p class="cf-result" aria-live="polite"></p>'+(explanations[id]?'<p>'+explanations[id][1]+'</p>':''))+'</figure>';
}
const boundFigures=new WeakSet();
const refreshForLanguage = new WeakMap();
document.addEventListener('room-language', () => {
  for (const figure of document.querySelectorAll('.concept-figure')) refreshForLanguage.get(figure)?.();
});
function enableEnlargement(figure){
  if(typeof HTMLDialogElement==='undefined')return;
  const caption=figure.querySelector('figcaption'),title=caption.textContent;
  const button=document.createElement('button');
  button.type='button';button.className='cf-enlarge';button.setAttribute('aria-haspopup','dialog');
  button.innerHTML='<span class="field-en">Enlarge</span><span class="field-zh">放大图形</span>';
  caption.append(button);
  button.onclick=()=>{
    const modal=document.createElement('dialog'),anchor=document.createComment('expanded figure');
    modal.className='cf-dialog';modal.setAttribute('aria-label',title);
    const close=document.createElement('button');
    close.type='button';close.className='cf-close';close.autofocus=true;
    close.innerHTML='<span class="field-en">Close figure</span><span class="field-zh">关闭图形</span>';
    close.onclick=()=>modal.close();
    figure.before(anchor);modal.append(close,figure);document.body.append(modal);
    modal.addEventListener('close',()=>{
      anchor.replaceWith(figure);modal.remove();button.focus({preventScroll:true});
    },{once:true});
    modal.showModal();
  };
}

export function bindFigures(root){
  for(const figure of root.querySelectorAll('.concept-figure')){
    if(boundFigures.has(figure))continue;
    boundFigures.add(figure);
    enableEnlargement(figure);
    const target=figure.querySelector('.cf-drawing');
    if(!target){
      const trace=figure.querySelector('.cf-trace');
      if(trace)refreshForLanguage.set(figure,()=>{trace.innerHTML=processTrace(figure.dataset.figure,schemes[figure.dataset.figure][1])});
      continue;
    }
    let pitch;
    function refresh(){
      const values={pitch};
      for(const input of figure.querySelectorAll('input')){values[input.dataset.param]=Number(input.value);input.previousElementSibling.value=input.value}
      const [picture,caption]=draw(figure.dataset.figure,values);
      target.innerHTML=picture;
      figure.querySelector('.cf-result').textContent=figureText(caption);
    }
    refreshForLanguage.set(figure,refresh);
    figure.oninput=refresh;
    const rotation=figure.querySelector('[data-param="yaw"]');
    if(rotation){
      let drag;
      target.classList.add('rotatable');
      target.onpointerdown=e=>{drag=[e.clientX,e.clientY,Number(rotation.value),pitch??27];target.setPointerCapture(e.pointerId)};
      target.onpointermove=e=>{
        if(!drag)return;
        rotation.value=((drag[2]+(e.clientX-drag[0])*.7+540)%360)-180;
        pitch=Math.max(10,Math.min(65,drag[3]+(e.clientY-drag[1])*.35));
        refresh();
      };
      target.onlostpointercapture=()=>{drag=null};
    }
    const disclosure=figure.closest('details');
    if(disclosure){disclosure.addEventListener('toggle',()=>{if(disclosure.open&&!target.firstChild)refresh()})}
    if(!disclosure||disclosure.open)refresh();
  }
}
