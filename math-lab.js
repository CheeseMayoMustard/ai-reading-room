import {conceptFigure} from './concept-figures.js?v=paperstudio1';
export const mathNotes = {
  transformer: ['Attention(Q,K,V) = softmax(QKᵀ / √dₖ)V', 'Q and K have one row per token and dₖ columns. QKᵀ forms a token-by-token score matrix. Apply softmax to each row, then multiply by V.'],
  bert: ['L = −∑ᵢ log pθ(xᵢ | visible context)', 'For the masked-language objective, sum over selected prediction positions. The context can include tokens on both sides.'],
  scaling: ['L(C) ≈ L∞ + aC⁻ᵅ', 'An illustrative power-law fit to loss versus compute C. The constants and valid range come from measurements.'],
  gpt3: ['p(x₁,…,xₙ) = ∏ᵢ p(xᵢ | x₁,…,xᵢ₋₁)', 'The chain rule factorizes a sequence probability. A causal language model estimates these conditional probabilities.'],
  lora: ['W′ = W + (α/r)BA', 'For W ∈ ℝᵈˣᵏ, use B ∈ ℝᵈˣʳ and A ∈ ℝʳˣᵏ. Freeze W and train A and B. The update has rank at most r.'],
  qlora: ['y ≈ dequantize(W₄bit)x + (α/r)BAx', 'A schematic forward pass combining a quantized frozen base with trainable low-rank adapters. Quantization metadata and training state require additional memory.'],
  rag: ['p(y | x) ≈ ∑z∈retrieved pη(z | x)pθ(y | x,z)', 'A sequence-level view of combining a retriever and generator over selected passages z. The original paper also studies a token-level formulation.'],
  mamba: ['hₜ = Āₜhₜ₋₁ + B̄ₜxₜ,  yₜ = Cₜhₜ', 'A schematic selective-state recurrence. Input-dependent quantities govern what is retained and read out. The scalar dynamics lab illustrates the simpler constant-coefficient case.'],
  flash: ['S = QKᵀ / √dₖ,  O = softmax(S)V', 'Exact attention remains the mathematical target. Tiling changes memory traffic and how the computation is executed.'],
  gqa: ['KV cache bytes ∝ layers × tokens × KV heads × head dimension × precision', 'Also account for both keys and values, batch size and implementation overhead. Reducing KV heads changes one factor.'],
  vllm: ['useful cache / allocated cache = utilization', 'Block allocation aims to reduce wasted cache capacity. Throughput and request latency still need separate measurement.'],
  switch: ['y(x) = pᵢ(x)Eᵢ(x),  i = argmaxⱼ pⱼ(x)', 'A schematic top-1 routed expert layer. Shared computation, expert capacity constraints and balancing terms also matter.'],
  instruct: ['maxθ E[rφ(x,y)] − β·KL(πθ || πref)', 'A simplified regularized reward objective. The reward model represents learned preferences, while the KL penalty discourages excessive drift.'],
  dpo: ['L = −E log σ(β[log(πθ(yw)/πref(yw)) − log(πθ(yl)/πref(yl))])', 'Condition all response probabilities on the same prompt. yw is preferred and yl rejected. This is the pairwise preference objective.'],
  attnres: ['hₗ = ∑ᵢ<ₗ αₗᵢvᵢ,  ∑ᵢ αₗᵢ = 1', 'A schematic weighted combination across earlier layer outputs. Read the paper for normalization, query construction and the block variant.']
};
export function mathCallout(id) {
  const note = mathNotes[id];
  const related = {transformer:'attention',bert:'pretraining',scaling:'scalingPlot',gpt3:'llm',lora:'lora',qlora:'quantization',rag:'rag',mamba:'state',flash:'flashIO',gqa:'kvHeads',vllm:'cacheUse',switch:'moe',instruct:'rlhf',dpo:'preferencePair',attnres:'depthWeights'};
  const other = {gemini4neon:'context',claudefable52:'harness',gpt62:'verification',chinchilla:'computeBudget',cot:'reasoning',react:'agent',speculative:'draftVerify',deepseekv3:'active',deepseekr1:'distillation',engram:'patternLookup',kimi25:'parallelTasks',glm5:'verification'};
  return note ? '<section class="math-note">'+conceptFigure(related[id])+'<details class="math-notation"><summary>Read the equation</summary><p class="formula">'+note[0]+'</p><p>'+note[1]+'</p></details></section>' : conceptFigure(other[id]);
}
