const teal='#176c74', orange='#bc562b', grey='#53636f',grid='#d9e1e3';
function projection(yaw,pitch,scale,centerY) {
  const a=yaw*Math.PI/180,b=pitch*Math.PI/180;
  return ([x,y,z])=>{
    const depth=x*Math.sin(a)+y*Math.cos(a);
    return [260+scale*(x*Math.cos(a)-y*Math.sin(a)),centerY-scale*(z*Math.cos(b)-depth*Math.sin(b)),depth*Math.cos(b)+z*Math.sin(b)];
  };
}
const xy=p=>p.slice(0,2).map(n=>n.toFixed(2)).join(',');
const path=points=>points.map((p,i)=>(i?'L':'M')+xy(p)).join(' ');
const stroke=(points,color,width=1,dash='')=>`<path d="${path(points)}" stroke="${color}" stroke-width="${width}" ${dash?'stroke-dasharray="'+dash+'"':''} fill="none"/>`;
const mark=(p,r,fill)=>`<circle cx="${p[0]}" cy="${p[1]}" r="${r}" fill="${fill}" stroke="white" stroke-width="1.5"/>`;
const label=(p,s,dx=0,dy=0,color=grey)=>`<text x="${p[0]+dx}" y="${p[1]+dy}" fill="${color}" text-anchor="middle">${s}</text>`;
const viridis=[[68,1,84],[59,82,139],[33,145,140],[94,201,98],[253,231,37]];
function surfaceColor(v){
  const t=Math.max(0,Math.min(.999,v))*4,i=Math.floor(t);
  return 'rgb('+viridis[i].map((n,j)=>Math.round(n+(viridis[i+1][j]-n)*(t-i))).join(',')+')';
}
function bounds(points){
  const xs=points.map(p=>p[0]),ys=points.map(p=>p[1]),x=Math.min(...xs)-28,y=Math.min(...ys)-22;
  const width=Math.max(...xs)-x+30,height=Math.max(...ys)-y+26,ratio=1.68;
  const w=Math.max(width,height*ratio);
  return [x-(w-width)/2,y-(w/ratio-height)/2,w,w/ratio].join(' ');
}
export function lossPlot(camera,pitch,rate,steps) {
  const project=projection(camera,pitch,62,178),lift=(x,y)=>(x*x+3*y*y)/2;
  const point=(x,y)=>project([x,y,.36*lift(x,y)]);
  const cells=[],extent=[];
  for(let ix=0;ix<22;ix++)for(let iy=0;iy<22;iy++){
    const d=4/22,x=-2+d*ix,y=-2+d*iy;
    const corners=[[x,y],[x+d,y],[x+d,y+d],[x,y+d]].map(([a,b])=>point(a,b));
    extent.push(...corners);
    const h=lift(x+d/2,y+d/2)/8;
    cells.push({depth:corners.reduce((n,p)=>n+p[2],0)/4,svg:'<polygon points="'+corners.map(xy).join(' ')+'" fill="'+surfaceColor(h)+'" stroke="#ffffff" stroke-opacity=".26" stroke-width=".45"/>'});
  }
  const farX=project([2,0,0])[2]>0?-2:2, farY=project([0,2,0])[2]>0?-2:2;
  const edgeX=-farX*1.06,edgeY=-farY*1.06;
  let ground='';
  for(const tick of [-2,-1,0,1,2]){
    ground+=stroke([project([tick,-2,0]),project([tick,2,0])],grid)+stroke([project([-2,tick,0]),project([2,tick,0])],grid);
  }
  for(const h of [0,2,4,6,8]){
    const zz=h*.36;
    ground+=stroke([project([farX,-farY,zz]),project([farX,farY,zz]),project([-farX,farY,zz])],grid);
  }
  let axes='';
  for(const t of [-2,0,2]){
    for(const [p,dx] of [[project([t,edgeY,0]),0],[project([edgeX,t,0]),0]]){
      if(t!==0)continue;
      axes+=label(p,t,dx,14);extent.push([p[0]+dx,p[1]+14]);
    }
  }
  const xLabel=project([0,edgeY*1.28,0]),yLabel=project([edgeX*1.28,0,0]);
  axes+=label(xLabel,'x',0,14)+label(yLabel,'y',0,14);
  extent.push([xLabel[0],xLabel[1]+14],[yLabel[0],yLabel[1]+14]);
  const end=[farX,-farY],offset=project([...end,0])[0]<260?-13:13;
  for(const h of [0,4,8]){
    const p=project([...end,.36*h]);axes+=label(p,h,offset,3);extent.push([p[0]+offset,p[1]+3]);
  }
  const z=project([...end,3.2]);axes+=label(z,'L',offset,0);extent.push([z[0]+offset,z[1]]);
  let x=1.5,y=1.2;const trajectory=[point(x,y)];
  for(let i=0;i<steps;i++){x*=1-rate;y*=1-3*rate;trajectory.push(point(x,y))}
  const last=trajectory.at(-1);
  return {bounds:bounds(extent),drawing:ground+cells.sort((a,b)=>a.depth-b.depth).map(c=>c.svg).join('')+axes+stroke(trajectory,'white',5)+stroke(trajectory,orange,2.8)+mark(last,5.2,orange),
    values:[['Step',steps],['Learning rate η',rate.toFixed(2)],['Loss L',lift(x,y).toFixed(4)]],label:'Quadratic loss surface. The vertical axis and surface color show loss; the orange path shows gradient descent.'};
}
export function vectorPlot(camera,pitch,theta,radius) {
  const p=projection(camera,pitch,70,150),a=theta*Math.PI/180,zero=p([0,0,0]);
  const extent=[],v=[radius*Math.cos(a),radius*Math.sin(a)/Math.SQRT2,radius*Math.sin(a)/Math.SQRT2];
  let drawing='';
  for(let i=-2;i<=2;i++){
    drawing+=stroke([p([i,-2,0]),p([i,2,0])],grid,.85)+stroke([p([-2,i,0]),p([2,i,0])],grid,.85);
  }
  for(const [end,name] of [[[2.4,0,0],'x'],[[0,2.4,0],'y'],[[0,0,2],'z']]){
    const tip=p(end),start=p(end.map(n=>-n*.9));extent.push(tip,start);
    drawing+=stroke([start,tip],grey,1.1)+label(tip,name,8,-4);
  }
  const q=p([1,0,0]),tip=p(v),foot=p([v[0],v[1],0]);extent.push(tip,foot);
  drawing+=stroke([foot,tip],grey,1,'3 3')+`<path d="${path([zero,q,tip])}Z" fill="#72b2ba" opacity=".23"/>`;
  for(const [t,color,name,off] of [[q,teal,'q',18],[tip,orange,'v',-11]]){
    const dx=t[0]-zero[0],dy=t[1]-zero[1],len=Math.hypot(dx,dy)||1;
    const ux=dx/len,uy=dy/len;
    const head=[[t[0]-ux*10-uy*3.5,t[1]-uy*10+ux*3.5],t,[t[0]-ux*10+uy*3.5,t[1]-uy*10-ux*3.5]];
    drawing+=stroke([zero,t],color,2.8)+`<polygon points="${head.map(xy).join(' ')}" fill="${color}"/>`+label(t,name,6,off,color);
  }
  drawing+=mark(zero,2.9,grey);
  for(const x of [-2,2])for(const y of [-2,2])extent.push(p([x,y,0]));
  return {bounds:bounds(extent),drawing,values:[['Angle θ',theta+'°'],['Dot product',(radius*Math.cos(a)).toFixed(3)],['Cosine',Math.cos(a).toFixed(3)]],label:'Two vectors sharing an origin in three-dimensional coordinates. Each grid interval represents one unit.'};
}
export function frame(result) {
  return '<svg class="method-space" viewBox="'+result.bounds+'" role="img" aria-label="'+result.label+'"><g font-family="Arial,sans-serif" font-size="13">'+result.drawing+'</g></svg>';
}
export function visualPreview(topic) {
  return frame(topic==='vectors'?vectorPlot(-27,25,57,2):lossPlot(-29,29,.18,6));
}
