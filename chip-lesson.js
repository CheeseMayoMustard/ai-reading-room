// All numerical values are a single teaching example, independent of the selected accelerator.
const chips = {
  gpu: ['NVIDIA GPU', 'NVIDIA GPU'],
  tpu: ['Google TPU', 'Google TPU'],
  ascend: ['Ascend NPU', '昇腾 NPU']
};
const phases = {
  train: [
    [['Pair inputs with targets','准备预测目标'],['Use the next token in the sentence as the target at each position. At each input position the model may see only that word and the words before it. In this example each box stands for one token.','把句子错开一格，就得到每个位置要预测的目标。模型在每个位置只能看到当前和之前的词。这里为便于观察，把每个方框当作一个词元。']],
    [['Run the forward pass','算出预测概率'],['Follow the middle position. Given “Sky is”, the model assigns probabilities to possible next tokens. Inside a layer, many token vectors are multiplied by the same matrix of weights. The chart shows an illustrative three-token vocabulary.','看中间的位置。给定“天空 很”，模型给接下来可能出现的词元分配概率。在模型的一层里，许多词元的向量可以一起乘以同一组权重。图中只设三个候选词，方便看清计算。']],
    [['Trace the error back','从误差反推梯度'],['The observed token was “blue”. Its probability of 0.60 gives a loss of about 0.51 here. Backpropagation applies the chain rule through the layers to find how changing each parameter would affect the loss. The arrow follows the gradient toward earlier layers.','原句里接着写的是“蓝”。模型给它 0.60 的概率，这个位置的损失约为 0.51。反向传播沿网络逐层应用链式法则，算出各参数变化会怎样影响损失。图中箭头表示梯度传向较早的层。']],
    [['Update a parameter','更新一个参数'],['Follow the bias added to the score for “blue”. At this one position its gradient is 0.60 − 1 = −0.40. A gradient descent step of size 0.10 raises the bias from 0.50 to 0.54. Actual training combines gradients from many positions and examples before an update.','看一个参数：加在“蓝”这个候选词得分上的偏置。这一个位置给它的梯度是 0.60 − 1 = −0.40。用 0.10 的学习率做一次梯度下降，偏置从 0.50 变为 0.54。实际训练会综合许多位置和样本的梯度再更新。']]
  ],
  infer: [
    [['Read the prompt','读入提示词'],['Start a separate request with a trained model. It processes “Sky is” in a forward pass called prefill. Each attention layer saves keys and values for those positions in the KV cache and the model produces the scores for the first new token.','换成一个独立的推理请求。已训练的模型先对“天空 很”做前向计算，这一步叫预填充。各注意力层把这些位置的键和值存入 KV 缓存；模型同时得到第一个新词元的分数。']],
    [['Choose the first new token','选出第一个新词元'],['Use the scores from prefill. For this example we choose the highest probability, so “blue” is appended to the text. The weights stay fixed. Other decoding strategies can sample from these probabilities instead.','使用预填充算出的分数。本例选概率最大的“蓝”，把它接在原文后面。模型权重保持不变；采用抽样策略时，也可能选到其他候选词。']],
    [['Decode using the cache','复用缓存再生成'],['Feed the newly chosen token back into the model. Attention can now read the cached keys and values for the prompt and add the new token’s entry. In this example the next choice is a period. Each further step depends on the token just chosen.','把刚选出的“蓝”送回模型。注意力层读取前文缓存的键和值，并补上“蓝”对应的新记录。在这个例子里，下一步选出句号。之后每一步都要等上一步的词元确定下来。']]
  ]
};
const hardware = {
  gpu: [['A GPU divides a matrix product into tiles. Thread blocks compute different output tiles, using Tensor Cores for supported matrix operations. Data held close to the arithmetic units can be reused.','GPU 把矩阵乘法拆成小块，不同线程块分别计算输出的一部分。适合的矩阵运算可以交给 Tensor Core。把数据留在靠近计算单元的存储里，可以重复使用。'],'NVIDIA · GPU matrix multiplication','https://docs.nvidia.com/deeplearning/performance/dl-performance-matrix-multiplication/index.html'],
  tpu: [['The TPU’s matrix unit (MXU) arranges multiply–accumulate cells in a grid. Values pass between neighboring cells, so a block of data contributes to multiple products as it moves. Other units handle operations such as elementwise arithmetic.','TPU 的矩阵单元（MXU）把大量乘加单元排成阵列。数据在相邻单元间传递，同一块数据经过阵列时能参与多次乘加。逐元素计算等操作由其他单元处理。'],'Google Cloud · TPU architecture','https://docs.cloud.google.com/tpu/docs/system-architecture-tpu-vm'],
  ascend: [['In DeepSeek’s Ascend attention implementation, Cube units do matrix products and Vector units handle work such as softmax. The software schedules transfers so that one block can arrive while another is being computed.','在 DeepSeek 的昇腾注意力实现中，Cube 单元负责矩阵乘法，Vector 单元处理 softmax 等运算。软件安排数据搬运，使下一块数据能在当前块计算时提前就位。'],'DeepSeek · Ascend attention','https://github.com/deepseek-ai/FlashMLA/blob/main/docs/20260930-ascend-prefill-deep-dive-zh.md']
};
const tx=(x,y,s,size=14,color='#203d4a',anchor='middle')=>`<text x="${x}" y="${y}" font-size="${size}" fill="${color}" text-anchor="${anchor}">${s}</text>`;
const rect=(x,y,w,h,fill,stroke='none',r=4)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}"/>`;
const line=(path,color='#637e86',width=2)=>`<path d="${path}" stroke="${color}" stroke-width="${width}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
function box(x,y,w,label,accent=false) {
 return rect(x,y,w,32,accent?'#d2ece7':'#f4f7f6',accent?'#147267':'#bbc9c9')+tx(x+w/2,y+21,label,15);
}
function row(y,words,highlight) {
 return words.map((s,i)=>box(31+i*88,y,76,s,i===highlight)).join('');
}
function diagram(t,mode,step) {
 const words=[t('Sky','天空'),t('is','很'),t('blue','蓝'),t('.','。')];
 let art='',desc='';
 if(mode==='train'&&step===0){
  art=tx(31,21,t('Input at each position','各位置的输入'),14,'#43616a','start')+row(30,words.slice(0,3),1)+
   [69,157,245].map(x=>line(`M${x} 67v16m-4 -5 4 5 4 -5`)).join('')+
   row(90,words.slice(1),1)+tx(31,148,t('Target one token ahead','对应目标：后一个词元'),14,'#43616a','start');
  desc=t('Sky predicts is, is predicts blue, and blue predicts a period, using the preceding context.','结合已有前文，天空预测很，很预测蓝，蓝预测句号。');
 } else if((mode==='train'&&step===1)||(mode==='infer'&&step===1)){
  const labels=[words[2],t('gray','灰'),t('clear','晴')], ps=[.60,.30,.10];
  art=tx(25,23,t('Next token after “Sky is”','“天空 很”之后的下一个词元'),15,'#203d4a','start')+
   labels.map((s,i)=>{const y=44+i*40;return tx(57,y+14,s,15,'#203d4a','end')+rect(71,y,200,15,'#e5ecea')+rect(71,y,200*ps[i],15,i===0?'#16766d':'#6f9399')+tx(320,y+14,(ps[i]*100)+'%',15)}).join('');
  desc=t('Illustrative probabilities: blue 60%, gray 30%, clear 10%.','示例概率：蓝 60%，灰 30%，晴 10%。');
 } else if(mode==='train'&&step===2){
  art=tx(180,36,'L = −ln(0.60) ≈ 0.51',22)+box(15,65,88,t('Layer 1','第 1 层'))+box(134,65,88,t('Layer 2','第 2 层'))+box(253,65,90,t('Loss','损失'),true)+
   [105,225].map(x=>line(`M${x+25} 81h-21m5 -4 -5 4 5 4`,'#16766d')).join('')+tx(180,139,t('Gradient flows toward earlier layers','梯度从损失传回较早的层'),15);
  desc=t('Loss is about 0.51. Gradients travel from loss through layer 2 to layer 1.','损失约为 0.51，梯度从损失经过第 2 层传回第 1 层。');
 } else if(mode==='train'){
  art=tx(180,32,t('One output bias · one training position','一个输出偏置 · 一个训练位置'),15)+box(45,60,90,'0.50')+box(225,60,90,'0.54',true)+line('M145 76h68m-7 -5 7 5 -7 5','#16766d')+tx(180,130,'0.50 − 0.10 × (−0.40) = 0.54',19);
  desc=t('Gradient descent increases the bias from 0.50 to 0.54.','梯度下降让偏置从 0.50 变为 0.54。');
 } else {
  const decode=step===2;
  art=tx(31,24,decode?t('Read two entries, append one','读取两条旧记录，追加一条'):t('Prompt positions','提示词位置'),15,'#203d4a','start')+row(38,decode?words.slice(0,3):words.slice(0,2),decode?2:-1)+
   tx(31,96,t('KV cache · one attention layer','KV 缓存 · 取一层注意力为例'),14,'#43616a','start')+
   row(109,decode?['K₁ · V₁','K₂ · V₂','K₃ · V₃']:['K₁ · V₁','K₂ · V₂'],decode?2:-1);
  desc=decode?t('The blue token adds a third key and value to the two cached prompt entries.','蓝对应的键和值追加在原有两条缓存记录后。'):t('Two prompt positions create two key and value entries.','两个提示词位置分别生成键和值。');
 }
 return `<svg class="cl-process" viewBox="0 0 360 162" role="img" aria-label="${desc}">${art}</svg>`;
}
function circuit(t,chip,mode,step) {
 const transfers=mode==='train'?[
  [['Token IDs','词元编号'],['Device memory','设备内存']],
  [['Inputs + weights','输入与权重'],['Layer outputs','各层输出']],
  [['Saved activations + G','激活值与回传梯度'],['Gradients','参数梯度']],
  [['Weights + gradients','权重与梯度'],['New weights','更新的权重']]
 ]:[
  [['Prompt + weights','提示词与权重'],['KV cache + scores','KV 缓存与分数']],
  [['Token scores','候选词元分数'],['Chosen token','选中的词元']],
  [['Token + old cache','新词元与旧缓存'],['New cache + scores','新缓存与分数']]
 ];
 const [from,to]=transfers[step];
 const mint='#7ce0cd', ink='#d7eeed', wire='#74adaf', navy='#173940';
 const pulse=(d)=>line(d,wire)+`<path class="cl-signal" d="${d}" fill="none" stroke="${mint}" stroke-width="2.8"/>`;
 let core='',name='';
 if(chip==='gpu'){
  name=t('Parallel matrix tiles','并行计算矩阵块');
  core=[0,1,2].map(i=>{const y=47+i*36;return pulse(`M120 93H143V${y+13}H168`)+rect(169,y,131,26,navy,wire)+tx(234,y+18,'Tensor Core · '+String.fromCharCode(65+i),14,ink)}).join('');
 } else if(chip==='tpu'){
  name=t('MXU · systolic array','MXU · 脉动阵列');
  for(let j=0;j<3;j++)for(let i=0;i<4;i++){
    const x=174+i*32,y=50+j*32;
    if(i<3)core+=line(`M${x+19} ${y+9}h13`,wire);
    if(j<2)core+=line(`M${x+9} ${y+19}v13`,wire);
    core+=rect(x,y,19,19,i===j?'#28766e':navy,wire,2)+tx(x+9.5,y+13,'×+',9,ink);
  }
  core+=pulse('M120 93H151V59H170');
 } else {
  name=t('Matrix and vector work','矩阵运算与向量运算');
  core=pulse('M120 93H149V63H170')+rect(171,48,124,31,navy,wire)+tx(233,69,'Cube',16,ink)+pulse('M233 80v17')+rect(171,98,124,31,navy,wire)+tx(233,119,'Vector',16,ink);
 }
 const mem=[0,1,2].map(i=>rect(29,59+i*13,89,25,i===2?'#27515d':'#183d48',wire)).join('');
 return `<svg class="cl-circuit" viewBox="0 0 350 230" role="img" aria-label="${t(...hardware[chip][0])} ${t(...from)} → ${t(...to)}">
 ${rect(0,0,350,230,'#102a32','none',7)}
 ${tx(23,26,t(...chips[chip]),16,mint,'start')}${mem}${tx(73,103,'HBM',15,ink)}${tx(73,149,t('Memory','高带宽内存'),13,ink)}
 ${core}${tx(230,157,name,13,ink)}
 ${line('M15 171h320','#40616a',1)}${tx(22,192,t('This step','本步数据流'),13,mint,'start')}
 ${tx(85,214,t(...from),13,ink)}${line('M159 209h30m-5 -4 5 4 -5 4',mint)}${tx(269,214,t(...to),13,ink)}</svg>`;
}
export function chipURL(mode='train',chip='gpu',step=0){
 return '?view=explore&case=chips&mode='+mode+'&chip='+chip+'&step='+(step+1);
}
export function mountChips(t){
 let mode='train',chip='gpu',step=0;
 function readURL(){
  const q=new URLSearchParams(location.search);
  mode=q.get('mode')==='infer'?'infer':'train';
  chip=Object.hasOwn(chips,q.get('chip'))?q.get('chip'):'gpu';
  const n=Number(q.get('step'));
  step=Number.isInteger(n)&&n>=1&&n<=phases[mode].length?n-1:0;
 }
 function act(button){
  if(!button.hasAttribute('data-chip-action'))return false;
  const {chipAction:a,value:v}=button.dataset;
  if(a==='chip')chip=v;
  if(a==='mode'&&v!==mode){mode=v;step=0}
  if(a==='step')step=Number(v);
  history.replaceState(null,'',chipURL(mode,chip,step));
  return true;
 }
 function btn(a,v,title,active){
  return `<button type="button" data-chip-action="${a}" data-value="${v}" aria-pressed="${active}">${title}</button>`;
 }
 function content(){
  const parts=phases[mode],p=parts[step],h=hardware[chip];
  return `<article class="cl-lab"><div class="cl-top"><a href="?view=explore">${t('Course overview','课程概览')}</a></div>
  <h1 tabindex="-1">${t('How do AI chips train a model and run it?','AI 芯片怎样训练模型，又怎样生成文本？')}</h1>
  <p class="cl-lead">${t('Follow “Sky is blue.” through a language model. Choose a stage to see what changes, then switch chips to see how they carry out the arithmetic.','跟着“天空很蓝。”走一遍语言模型。切换步骤，观察哪些数据发生变化；再切换芯片，看它们怎样完成其中的运算。')}</p>
  <div class="cl-modes" role="group" aria-label="${t('Model operation','模型运行方式')}">${btn('mode','train',t('Pretraining','预训练'),mode==='train')}${btn('mode','infer',t('Inference','推理'),mode==='infer')}<button class="cl-jump" type="button" data-chip-jump>${t('See inside the chip','看芯片内部')}</button></div>
  <div class="cl-grid"><section class="cl-main"><div role="group" class="cl-steps" aria-label="${t('Choose a step','选择步骤')}">${t('Step','步骤')} ${parts.map((s,i)=>`<button data-chip-action="step" data-value="${i}" aria-label="${i+1} · ${t(...s[0])}" title="${t(...s[0])}" aria-pressed="${step===i}">${i+1}</button>`).join('')}</div>
  <h2>${t(...p[0])}</h2><figure>${diagram(t,mode,step)}</figure><p>${t(...p[1])}</p>
  <div class="cl-controls"><button data-chip-action="step" data-value="${step-1}" ${step===0?'disabled':''}>${t('Previous','上一步')}</button>${step<parts.length-1?`<button data-chip-action="step" data-value="${step+1}">${t('Next step','下一步')}</button>`:`<button data-chip-action="mode" data-value="${mode==='train'?'infer':'train'}">${mode==='train'?t('Compare with inference','对照推理过程'):t('Compare with training','对照训练过程')}</button>`}</div></section>
  <aside class="cl-hw"><h2 tabindex="-1">${t('Inside the accelerator','芯片里怎样算？')}</h2><div role="group" aria-label="${t('Accelerator architecture','芯片架构')}">${Object.keys(chips).map(c=>btn('chip',c,t(...chips[c]),c===chip)).join('')}</div>
  <figure>${circuit(t,chip,mode,step)}</figure><p>${t(...h[0])}</p><details><summary>${t('How this hardware fits into this step','这一步用到哪些硬件？')}</summary><p>${t(...stageHardware(mode,step))}</p></details>
  <a href="${h[2]}" target="_blank" rel="noopener">${h[1]}</a></aside></div>
  <details class="cl-check"><summary>${t('Quick check · Another token appears. What changed in memory?','想一想：模型又生成了一个词元，内存里什么变了？')}</summary><p>${t('The output sequence grows. As the new token is processed on the next forward pass, its keys and values are appended to the cache. The model parameters keep their trained values.','输出序列多了一个词元。下一次前向计算处理这个词元时，它的键和值被追加到缓存中。模型参数仍保持训练后的数值。')}</p></details></article>`;
 }
 return {content,act,readURL};
}
function stageHardware(mode,step){
 if(mode==='infer')return [
 ['During prefill, matrix operations can cover many prompt positions at once. The layer also writes its keys and values to memory.','预填充时，矩阵运算可以同时处理多个输入位置。注意力层还要把键和值写入内存。'],
 ['The forward pass already produced the scores. Selecting the largest is a comparison over the vocabulary and needs no backward pass.','前向计算已经产生了分数。选择最大值只需比较候选词元的分数，无需反向传播。'],
 ['For one request, each decode step has one new position. Reading the weights and the growing cache can take much of the time. Batching requests changes how the chip is used.','对于单个请求，每个解码步只有一个新位置。读取权重和越来越长的缓存可能占去大量时间。把多个请求组批处理，会改变芯片的利用情况。']
 ][step];
 return [
 ['Input preparation can run on the host CPU. Token IDs and targets are made available to the accelerator for the training step.','整理训练样本可以在主机 CPU 上进行。词元编号和目标随后交给加速器，供训练步骤使用。'],
 ['With a layer input X and weights W, a matrix unit can calculate tiles of XW. Other operations transform these intermediate results into output scores.','设一层的输入是 X，权重是 W，矩阵单元可分块计算 XW。随后还要经过其他运算，才得到输出分数。'],
 ['For Y = XW and incoming gradient G, two backward products are XᵀG and GWᵀ. Accelerators reuse their matrix units for these derivatives.','对于 Y = XW，若回传梯度为 G，反向计算包含 XᵀG 和 GWᵀ 两个矩阵乘法。计算这些导数时仍会用到矩阵单元。'],
 ['The optimizer reads weights and gradients and writes the updated weights. This involves elementwise arithmetic and memory transfers.','优化器读出权重和梯度，逐元素运算，再把更新后的权重写回内存。']
 ][step];
}
