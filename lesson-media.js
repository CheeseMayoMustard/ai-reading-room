const clips = {
  ai: ['ai-0','ai-1','ai-2'], llm:['llm-0','llm-1','llm-2'],
  token:['tokens'],tokenizer:['tokens'],attention:['attention'],softmax:['attention'],
  loss:['gradient'],gradient:['gradient'],descent:['gradient'],rag:['rag']
};
const captions={
 'ai-0':'Watch the reflection cross the brightness threshold. The rule flags the image even though the surface is intact.',
 'ai-1':'The engineer chooses which measurements to record. During training, the decision tree learns cutoffs for those measurements from the labelled examples.',
 'ai-2':'The network starts with pixels. During training its layers learn which combinations of pixel values help distinguish a defect.',
 'llm-0':'Each bar shows the probability of one possible continuation of “Tighten the …”.',
 'llm-1':'In this draw, the model selects “bolt”. Repeating the draw with the same probabilities could give “nut” instead.',
 'llm-2':'After “bolt” is added, the next prediction uses the longer phrase “Tighten the bolt”.',
 tokens:'Each bracket encloses one token. The number below it identifies that token in this example vocabulary.',
 attention:'Convert the scores to weights that add to one. Multiply each value by its weight and add the results.',
 gradient:'Follow the orange point. On this curve, each step multiplies w by 0.6, bringing it closer to zero.',
 rag:'Compare the answer with the retrieved inventory record. Both the number and the unit “bags” should match.'
};
export function lessonMedia(id,step){
 const key=clips[id]?.[step];if(!key)return '';
 return `<figure class="lesson-animation"><video controls playsinline preload="metadata" poster="media/lessons/${key}.webp?v=paperstudio1" aria-label="Animated explanation: ${captions[key]}"><source src="media/lessons/${key}.mp4?v=paperstudio1" type="video/mp4"><p>Your browser cannot play this animation. <a href="media/lessons/${key}.gif?v=paperstudio1">Open the GIF</a>.</p></video><figcaption><span>${captions[key]}</span><a href="media/lessons/${key}.gif?v=paperstudio1" download="${key}.gif">Save GIF ↗</a></figcaption></figure>`;
}

// Some static hosts do not serve byte ranges. Loading this small, same-origin
// clip as a Blob makes pause/seek and narration scrubbing work on those hosts.
const loadedClips=new Map();
async function playableURL(src){
 if(!loadedClips.has(src))loadedClips.set(src,fetch(src).then(response=>{
  if(!response.ok)throw Error('Media unavailable');return response.blob();
 }).then(blob=>URL.createObjectURL(blob)).catch(()=>{loadedClips.delete(src);return null}));
 return loadedClips.get(src);
}
export async function prepareLessonMedia(video){
 if(!video)return;
 const src=video.querySelector('source')?.src;if(!src)return;
 const url=await playableURL(src);
 if(url&&video.isConnected){video.src=url;video.load()}
}
export async function prepareNarration(audio){
 const src=audio.dataset.audioSrc;
 const url=await playableURL(src);
 if(audio.isConnected){audio.src=url||src;audio.load()}
}
