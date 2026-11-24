import {figureText} from './figure-locale.js?v=readingedit1';
// Browser-drawn plots share the axes, type and palette of the Matplotlib plates.
// Keeping the data marks in SVG allows sliders to update without fetching frames.
const ink='#182933', grey='#53636f', grid='#d9e1e3';
export const colors={green:'#176c74',orange:'#bc562b',gray:grey};
const text=(x,y,content,attr='')=>`<text x="${x}" y="${y}" ${attr}>${figureText(content)}</text>`;
const line=(x1,y1,x2,y2,stroke=grid,width=1,extra='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${width}" ${extra}/>`;
const figure=(w,h,content,label)=>`<svg class="method-plot" viewBox="0 0 ${w} ${h}" role="img" aria-label="${figureText(label)}"><g font-family="Arial,sans-serif" font-size="14" fill="${ink}">${content}</g></svg>`;
const format=n=>Math.abs(n)>=10000?(n/1e6).toFixed(2)+'M':Number(n.toFixed(2)).toString();
function ticks(min,max,count=4) {
  const unit=(max-min)/count, mag=10**Math.floor(Math.log10(unit));
  const spacing=[1,2,2.5,5,10].map(v=>v*mag).find(v=>v>=unit);
  const result=[];
  for(let x=Math.ceil(min/spacing)*spacing;x<=max+spacing*1e-6;x+=spacing)result.push(x);
  return result;
}

export function lineChart(series,xLabel,yLabel,xs,xt,labels=xt){
  const w=472,h=234,l=67,r=450,t=32,b=184;
  const ys=series.flatMap(s=>s.values),lo=Math.min(0,...ys),hi=Math.max(1e-8,...ys);
  const x=v=>l+(v-xs[0])/(xs[1]-xs[0])*(r-l), y=v=>b-(v-lo)/(hi-lo)*(b-t);
  let content=text(l,19,yLabel,'font-size="15"');
  for(const v of ticks(lo,hi)){
    content+=line(l,y(v),r,y(v))+text(l-8,y(v)+4,format(v),'text-anchor="end"');
  }
  content+=line(l,t,l,b,grey)+line(l,b,r,b,grey);
  xt.forEach((v,i)=>{content+=line(x(v),b,x(v),b+4,grey)+text(x(v),b+21,labels[i],'text-anchor="middle"')});
  content+=text((l+r)/2,h-3,xLabel,'text-anchor="middle" font-size="15"');
  for(const {values,color,dash} of series){
    const points=values.map((v,i)=>[l+i*(r-l)/(values.length-1),y(v)]);
    content+=`<polyline fill="none" stroke="${color}" stroke-linejoin="round" stroke-width="2.8" ${dash?'stroke-dasharray="6 4"':''} points="${points.map(p=>p.join(',')).join(' ')}"/>`;
    if(values.length>2&&values.length<10)for(const [cx,cy] of points)content+=`<circle cx="${cx}" cy="${cy}" r="3.5" fill="${color}" stroke="white"/>`;
  }
  return figure(w,h,content,yLabel+' versus '+xLabel);
}

export function bars(entries,max,scaleLabel,percent=false){
  const l=103,r=369,t=22,b=t+entries.length*42, ys=entries.map((_,i)=>t+20+i*42), x=v=>l+v/max*(r-l);
  let content='';
  for(const n of [0,.5,1]){
    content+=line(x(n*max),t,x(n*max),b)+text(x(n*max),b+21,percent?Math.round(n*100)+'%':format(n*max),'text-anchor="middle"');
  }
  content+=line(l,b,r,b,grey)+text((r+l)/2,b+45,scaleLabel,'text-anchor="middle" font-size="15"');
  entries.forEach(([name,v,label],i)=>{
    const c=i===1?colors.orange:colors.green, yy=ys[i];
    content+=text(l-10,yy+5,name,'text-anchor="end"')+line(l,yy,x(v),yy,c,3.3)+`<circle cx="${x(v)}" cy="${yy}" r="5.6" stroke="white" fill="${c}"/>`+text(x(v)+9,yy+5,label,'font-size="13"');
  });
  return figure(472,b+51,content,scaleLabel+' by category');
}

export function maskPlot(pos){
  const w=404,h=202,l=111,t=22,cell=24;
  let content='';
  for(let r=0;r<6;r++)for(let c=0;c<6;c++){
    const live=r+1===pos,allowed=c<=r;
    content+=`<rect x="${l+c*cell}" y="${t+r*cell}" width="${cell-1}" height="${cell-1}" fill="${allowed?(live?colors.green:'#a5c8ca'):'#edf1f2'}"/>`;
    if(c===0)content+=text(l-12,t+r*cell+16,r+1,'text-anchor="end"');
    if(r===5)content+=text(l+c*cell+11,t+6*cell+18,c+1,'text-anchor="middle"');
  }
  content+=`<rect x="${l-1}" y="${t+(pos-1)*cell-1}" width="${6*cell+1}" height="${cell+1}" stroke="${colors.orange}" stroke-width="2" fill="none"/>`;
  content+=text(l,t-8,'Query position')+text(l+3*cell,h-1,'Key position','text-anchor="middle"');
  content+=text(271,74,'■  Visible',`fill="${colors.green}"`)+text(271,99,'□  Hidden')+text(271,124,'—  Selected row',`fill="${colors.orange}"`);
  return figure(w,h,content,'Causal mask. Highlighted query '+pos+' sees keys 1 through '+pos);
}

const roles={
  fewshot:[['Prompt','Model'],[0,0,0,1]],grounding:[['Answer','Record'],[0,1,1]],
  alignment:[['Goal','Model','Check'],[0,1,2]],nf:[['Weight','Encode','Decode'],[0,1,1,2]],
  mla:[['Project','Cache','Attend'],[0,1,2]],reinforcementlearning:[['Policy','Reward','Trainer'],[0,1,2,0]],
  ngram:[['Input','Window'],[0,1,1,1]],asynchronousrl:[['Worker','Trainer','Buffer'],[0,1,2,0]],
  sparseattention:[['Query','Keys','Output'],[0,1,2]],residualconnection:[['Input','Layer','Sum'],[0,1,2]],
  patternLookup:[['Tokens','Lookup','Model'],[0,1,1,2]],flashIO:[['Memory','On chip'],[0,1,1,0]],
  model:[['User','App','Model'],[0,1,2,1]],transformer:[['Input','Attention','Network'],[0,1,2,2]],
  multimodal:[['Input','Encoder','Model'],[0,1,2,2]],pretraining:[['Corpus','Model','Trainer'],[0,1,2,2]],
  finetuning:[['Model','Data','Trainer'],[0,1,2,0]],posttraining:[['Model','Trainer'],[0,1,1,0]],
  inference:[['Input','Model','Output'],[0,1,1,2]],rlhf:[['People','Trainer','Model'],[0,1,2,0]],
  prompt:[['Request'],[0,0,0,0]],hallucination:[['Record','Model','Check'],[0,1,2,2]],
  agent:[['Model','Tool'],[0,1,0,0]],workflow:[['File','Process','Check'],[0,1,1,2]],
  tool:[['Model','Tool'],[0,1,0]],harness:[['Harness','Model','Tool'],[0,1,2,0]],
  verification:[['Request','Artifact','Check'],[0,1,2,2]],gpu:[['Split','Cores','Reduce'],[0,1,2]],
  benchmark:[['Tasks','Protocol','Result'],[0,1,1,2]],checkpoint:[['Trainer','Storage','Model'],[0,1,1,2]],
  openweights:[['Release'],[0,0,0]],preprint:[['Source','Paper','Review'],[0,1,1,2]],
  flops:[['Product','Sum','Result'],[0,1,2,2]],split:[['Train','Validate','Test'],[0,1,2]]
};
function wrap(s,max){
  const rows=[''];for(const word of s.split(' ')){
    if(rows.at(-1).length && rows.at(-1).length+word.length>max)rows.push('');
    rows[rows.length-1]+=(rows.at(-1)?' ':'')+word;
  }
  return rows;
}
export function processTrace(id,steps){
  const [lanes,sequence]=roles[id]||[['Process'],steps.map(()=>0)];
  const start=32,delta=61,last=steps.length-1;
  const px=i=>lanes.length===1?42:start+i*delta;
  const labelX=lanes.length===1?66:px(lanes.length-1)+28;
  let content='',y=32;
  lanes.forEach((name,i)=>{content+=text(px(i),17,name,'text-anchor="middle" font-size="13"')});
  const traces=[],labels=[];
  steps.forEach((s,i)=>{
    const displayed = String(figureText(s));
    const lines = /[\u3400-\u9fff]/.test(displayed) ? displayed.match(/.{1,16}/gu) : wrap(displayed,lanes.length===1?47:35),row=23+lines.length*15,cy=y+row/2,cx=px(sequence[i]);
    traces.push([cx,cy]); labels.push([cx,cy,lines,labelX,i]);
    y+=row;
  });
  lanes.forEach((name,i)=>{content+=line(px(i),28,px(i),y-6,grid,1,'stroke-dasharray="3 4"')});
  if(!['split','prompt','openweights'].includes(id))content+=`<polyline fill="none" stroke="${colors.green}" stroke-width="2.3" points="${traces.map(p=>p.join(',')).join(' ')}"/>`;
  for(const [cx,cy,lines,tx,i] of labels){
    content+=line(cx+6,cy,tx-8,cy,grid,.9)+`<circle cx="${cx}" cy="${cy}" r="5.3" fill="${i===last?colors.orange:colors.green}" stroke="white" stroke-width="1.4"/>`;
    lines.forEach((s,j)=>{content+=text(tx,cy+5+(j-(lines.length-1)/2)*16,s)});
  }
  return figure(460,y,content,steps.map(figureText).join(' · '));
}
