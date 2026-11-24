const clips = {
  ai: ['ai-0','ai-1','ai-2'], llm:['llm-0','llm-1','llm-2'],
  token:['tokens'],tokenizer:['tokens'],attention:['attention'],softmax:['attention'],
  loss:['gradient'],gradient:['gradient'],descent:['gradient'],rag:['rag']
};
const captions={
 'ai-0':'Follow the bright reflection. A fixed brightness cutoff can flag it even when it is not a defect.',
 'ai-1':'The engineer supplies measurements; labeled examples determine the tree’s decision splits.',
 'ai-2':'Follow the signal through the layers. Training adjusts the features as well as the final decision.',
 'llm-0':'Watch the candidate probabilities appear for the current context.',
 'llm-1':'“Bolt” is one possible sample. A 60% probability does not mean it must always be chosen.',
 'llm-2':'The new token changes the context, so the next probability distribution changes too.',
 tokens:'Watch the pieces appear, then their vocabulary IDs. This is an illustrative tokenizer, not a measured model output.',
 attention:'Scores become normalized weights. Those weights combine the values into one output.',
 gradient:'Follow the orange point. Each update reduces w by 40% on this particular quadratic.',
 rag:'Follow the unit “bags” from the retrieved record into the answer.'
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
