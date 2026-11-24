export function nestedFields(step=2) {
  const bands=[
    {cx:228,cy:113,rx:214,ry:100,fill:'#edf3f4',stroke:'#81969d',name:['Artificial intelligence','人工智能'],example:['Use a fixed brightness cutoff','按固定的亮度阈值检查'],y:42},
    {cx:236,cy:137,rx:174,ry:72,fill:'#d5e8e7',stroke:'#6a9ca0',name:['Machine learning','机器学习'],example:['Fit a decision tree to labeled photos','用已标注的照片训练决策树'],y:94},
    {cx:246,cy:163,rx:128,ry:42,fill:'#176c74',stroke:'#12565c',name:['Deep learning','深度学习'],example:['Train a network on image pixels','用图像像素训练神经网络'],y:158}
  ];
  const layers=bands.slice(0,Math.min(3,step+1)).map(({cx,cy,rx,ry,fill,stroke,name,example,y},i)=>{
    const titles=name.map((n,l)=>`<g class="field-${l?'zh':'en'}"><text x="${cx}" y="${y}" font-size="18" font-weight="600">${n}</text><text x="${cx}" y="${y+17}" font-size="12.8">${example[l]}</text></g>`).join('');
    return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${stroke}" stroke-width="${i===step?2:1}"/><g fill="${i===2?'white':'#182933'}">${titles}</g>`;
  }).join('');
  return '<figure class="field-board"><svg viewBox="0 0 460 226" role="img" aria-label="AI, machine learning and deep learning"><g font-family="Arial,sans-serif" text-anchor="middle">'+layers+'</g></svg></figure>';
}
