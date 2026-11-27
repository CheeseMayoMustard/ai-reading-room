// Page numbers refer to the PDFs bundled with the reading room.
export const readings = {
 transformer:{
  name:'Transformer',year:2017,page:6,
  place:['Table 1','表 1'],
  title:['Why does a long document make attention expensive?','为什么文章越长，注意力计算就越贵？'],
  original:['Look at the first row of Table 1. In full self-attention, each position can draw on every other position. For n positions, the model considers n × n pairs. This gives distant words a direct connection, with a cost that grows quickly as the text gets longer.','看表 1 的第一行。在完整的自注意力层里，每个位置都能从所有位置取信息。长度为 n 的文本有 n × n 个位置组合。相隔很远的词可以直接建立联系，代价是文本越长，要计算的组合就越多。'],
  later:['DeepSeek-V4','DeepSeek-V4'],
  evidence:['In its 2026 model card, DeepSeek describes two ways V4 compresses earlier text into fewer stored entries. In one of them, each new position also selects a subset of those entries. That changes how much earlier information the model has to inspect in detail.','DeepSeek 在 2026 年的模型卡中写到，V4 用两种方式把前文压缩成较少的记录。其中一种还会挑出部分记录，供当前位置查阅。这样，处理下一个词时，需要逐项比较的前文记录就少了。'],
  takeaway:['Read the last row of the same table. The 2017 authors already considered limiting which positions could interact. V4 tackles that same cost with a different design. Its context limit alone tells us little about whether it will find a particular sentence.','再看表 1 的最后一行。2017 年的作者已经考虑过限制每个词能查看的位置。V4 用另一种设计处理同一个成本问题。至于它能否从长文里找对某一句话，还得用查找任务来测。'],
  sources:[['DeepSeek-V4 model card · Model architecture','DeepSeek-V4 模型卡 · 模型架构','https://fe-static.deepseek.com/chat/transparency/deepseek-V4-model-card-EN.pdf']],
  question:['A full-attention layer goes from 1,000 to 2,000 positions. How does the number of position pairs change?','完整注意力层的输入从 1,000 个位置增到 2,000 个，位置组合数会怎样变化？'],
  answer:['It rises from one million to four million. That is four times as many pairs in this layer. Total running time also depends on other layers and the hardware.','从 100 万个增到 400 万个，是原来的 4 倍。这里算的是这一层的位置组合数，整套模型的运行时间还取决于其他层和硬件。']
 },
 bert:{
  name:'BERT',year:2018,page:8,place:['Table 5 · SQuAD','表 5 · SQuAD'],
  title:['What does a word gain from seeing what comes after it?','理解一个词时，看见后文有什么用？'],
  original:['Cover the words after “bank” in “I stood on the bank of the river.” Now uncover them. BERT can use both sides of a word to represent it. In Table 5, compare “No NSP” and “LTR & No NSP”. On SQuAD, a test of finding answers in a passage, the two-sided version scored 87.9 F1 and the left-to-right version 77.8. F1 measures overlap with the reference answer.','先遮住英文句子“I stood on the bank of the river”中 bank 后面的词，再揭开。看到 river，你就更容易判断 bank 指河岸。看表 5 的 SQuAD 阅读理解测试。两个版本都去掉了“下一句预测”任务，能看两侧上下文的版本得 87.9，只看左侧的版本得 77.8。这里的 F1 衡量模型找出的答案与参考答案在词上重合得怎样。'],
  later:['moBERTo · 2026','moBERTo · 2026'],
  evidence:['The moBERTo team adapted ModernBERT to Portuguese. One task was to reorder candidate documents so that useful ones appeared near the top. Their best version had the highest average ranking score among the systems they compared across three Portuguese retrieval tests.','moBERTo 团队把 ModernBERT 继续训练成葡萄牙语模型。他们测试了一项很实际的工作：给搜索结果重新排序，让更有用的文档排在前面。在三项葡语检索测试中，他们表现最好的版本在参评系统里取得了最高的平均排序得分。'],
  takeaway:['For ranking a document, the whole passage is available before the model assigns a score. That gives two-sided reading a practical use. The newer study also changed the training data and training procedure, so its score cannot isolate the contribution of two-sided reading.','给搜索结果排序时，整段文章已经摆在眼前，模型能先读完前后文再评分。这是双向阅读的一种实际用途。新研究还改变了训练数据和训练过程，仅凭排序成绩无法算出双向阅读单独贡献了多少。'],
  sources:[['Laitz et al. · moBERTo, 2026 preprint','Laitz 等 · moBERTo，2026 年预印本','https://arxiv.org/abs/2606.22722']],
  question:['Why compare the two rows that both say “No NSP”?','为什么要比较都写着“No NSP”的两行？'],
  answer:['Both omit the next-sentence prediction task. Comparing these two rows helps you examine what changed when the authors switched to left-to-right training, while keeping that other choice fixed.','两个版本都去掉了“下一句预测”任务。把这个条件固定下来，再看训练改成只读左侧上下文后，阅读理解得分发生了什么变化。']
 },
 scaling:{
  name:'Scaling Laws',year:2020,page:1,place:['Abstract · training budget','摘要 · 训练预算'],
  title:['With a fixed training budget, what should you buy more of?','训练预算固定，该把钱花在更大的模型还是更多的数据上？'],
  original:['Kaplan and colleagues measured how well a language model predicted held-out text. Over the ranges they tested, prediction loss decreased in a regular way as model size, data or compute increased. Their fitted curves favored spending much of an extra training budget on a larger model.','Kaplan 等人用训练时留出的文本，测量模型预测下一个词元的误差。在他们测试的范围内，模型规模、数据量或计算量增加，误差随之呈现规律性下降。他们用曲线估算后认为，新增训练预算应更多地投向扩大模型。'],
  later:['Chinchilla and DeepSeek-V4-Pro','Chinchilla 与 DeepSeek-V4-Pro'],
  evidence:['In 2022, the Chinchilla team revisited the budget question. Their 70-billion-parameter model trained on four times as much data as the 280-billion-parameter Gopher. At the same training compute, Chinchilla performed better on many tasks. Today there is another wrinkle. DeepSeek reports 1.6 trillion parameters for V4-Pro, of which 49 billion are active per token.','2022 年，Chinchilla 团队重新做了预算实验。Chinchilla 有 700 亿个参数，Gopher 有 2,800 亿个。两者训练计算量相同，Chinchilla 用了约四倍的数据，在多项测试上表现更好。到 2026 年，连“多大”也要问清楚。DeepSeek 报告 V4-Pro 总共有 1.6 万亿个参数，每处理一个词元会用到其中约 490 亿个。'],
  takeaway:['The original paper gave researchers a way to measure the trade-off. Chinchilla revised the estimated allocation. For a modern model that activates only some parameters, a headline parameter count alone cannot tell you the training budget or the quality you will get.','原论文留下的是一种可检验的方法：在给定预算下比较模型大小与数据量。Chinchilla 的实验修正了预算分配的估计。读今天的模型卡时，还要分清总参数和每次参与计算的参数，仅凭一个参数总数推不出训练成本或效果。'],
  sources:[['Hoffmann et al. · Chinchilla abstract','Hoffmann 等 · Chinchilla 论文摘要','https://arxiv.org/abs/2203.15556'],['DeepSeek-V4 model card · Model size','DeepSeek-V4 模型卡 · 参数规模','https://fe-static.deepseek.com/chat/transparency/deepseek-V4-model-card-EN.pdf']],
  question:['In the Chinchilla–Gopher comparison, which quantity did the researchers hold fixed?','比较 Chinchilla 和 Gopher 时，研究者固定了什么？'],
  answer:['Training compute. Model size and the amount of training data both changed. Holding the budget fixed let the researchers ask how to spend it.','固定的是训练计算量。参数量和训练数据量都变了，这样才能比较同样的计算预算怎样分配更合算。']
 },
 gpt3:{
  name:'GPT-3',year:2020,page:4,place:['Figure 1.2','图 1.2'],
  title:['How can examples change an answer during a single conversation?','为什么在同一次对话里给几个例子，就能改变回答？'],
  original:['In Figure 1.2 the task is to remove extra symbols from a word. The authors varied how many worked examples GPT-3 saw in its prompt. On this task, the larger model made better use of the examples. Its trained weights stayed fixed throughout the test.','图 1.2 的任务很简单：从夹杂符号的单词中还原原词。作者改变提示中已做好的例题数量，观察模型能否照着处理新词。在这个任务上，较大的模型更能利用例题。整个测试期间，模型的权重保持不变。'],
  later:['Claude Fable 5.2 and few-shot prompting','Claude Fable 5.2 与少样本提示'],
  evidence:['Anthropic’s guide for models including Claude Fable 5.2 advises giving the model a few examples of the output you want, including unusual cases. Imagine sorting repair notes. By showing “motor silent” paired with “inspect power supply”, you can demonstrate the level of detail you want in a label.','在面向 Claude Fable 5.2 等模型的指南中，Anthropic 建议给模型看几个期望输出的例子，其中包括容易分错的情况。比如整理维修记录时，给出“电机无声 → 检查供电”这样的示例，就能示范你希望标签具体到什么程度。'],
  takeaway:['The examples specify the task inside the request. That is the connection to GPT-3. The Claude guide is advice for using a product. To find out whether examples improve your own labels, compare prompts on new repair notes with the same model and grading rule.','两者相通的地方是，示例在本次请求里说明了任务。Claude 指南给的是产品使用建议。要知道示例能否改善自己的标签，可以固定模型和评分规则，在一批新维修记录上对比有无示例的提示。'],
  sources:[['Anthropic · Prompting best practices, examples','Anthropic · 提示指南中的示例用法','https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices']],
  question:['The labels improve after you add examples. What changed that you can verify?','加了示例后，标签更符合要求。你能直接确认什么发生了变化？'],
  answer:['The input now shows the desired pattern. Better labels in this conversation do not establish that the model learned it permanently. Test again in a fresh conversation without those examples.','这次输入多了可以参照的样例。一次对话中的改善不足以说明模型永久学会了这套规则。可以在新对话里拿掉示例，再用新记录试一次。']
 },
 rag:{
  name:'RAG',year:2020,page:2,place:['Figure 1 · retriever and generator','图 1 · 检索器与生成器'],
  title:['How can an answer use facts that changed after training?','训练结束后才发生的事，模型怎样用来回答问题？'],
  original:['Follow the question through Figure 1. A retriever finds relevant passages in a Wikipedia index. A generator uses the question and the retrieved passages to form its answer. This gives the system an external source of facts that can be updated separately from the model.','沿着图 1 走一遍。检索器先在维基百科索引里找相关段落，生成器再结合问题与段落组织答案。这样，系统就有了一份可以独立更新的外部资料。'],
  later:['Gemini with Google Search','接入 Google 搜索的 Gemini'],
  evidence:['Google’s guide shows Gemini 4 Hydrogen using its search tool. For a current question, the system can search the web and return links associated with parts of the answer. If a museum has just changed its hours, its updated notice can now inform the reply.','Google 的指南用 Gemini 4 Hydrogen 演示了搜索工具。遇到时效性问题，系统可以检索网页，并给出与部分回答对应的来源链接。假设一家博物馆刚调整开放时间，新公告就有机会成为回答的依据。'],
  takeaway:['Both systems can bring outside evidence into an answer. The 2020 paper describes a particular trained retriever and generator. Google documents the behavior of a search tool. A source link lets you check a claim, including whether the cited notice actually gives today’s hours.','两套系统都能在回答时引入外部证据。2020 年的论文公开了特定的检索器、生成器和训练方法。Google 文档说明的是搜索工具的行为。拿到链接后，仍要打开公告核对它适用的日期。'],
  sources:[['Google · Grounding with Google Search','Google · 用搜索结果为 Gemini 的回答提供依据','https://ai.google.dev/gemini-api/docs/google-search']],
  question:['A museum notice says Saturday hours are changing next month. Does it establish that the new hours apply today?','博物馆公告说“下月起调整周六开放时间”。这条来源能证明今天就按新时间开放吗？'],
  answer:['Check the effective date and the day of the week. The retriever may have found the right museum and a real notice, while the answer still applies it to the wrong day.','先核对生效日期，再看今天是星期几。即使找对了博物馆，也找到了真实公告，回答仍可能把公告用在错误的日期。']
 }
};
const lang = () => document.documentElement.lang.startsWith('zh') ? 1 : 0;
export const revisitURL = id => '?view=library&lens=revisit&page='+readings[id].page+'#'+id;
export function revisitText(en,zh){return [en,zh][lang()]}
export function drawRevisit(root,id,openEvidence) {
 const r=readings[id],l=lang(),t=revisitText;
 const figures={
   transformer:['A full attention layer compares one million pairs for 1,000 positions and four million for 2,000.','完整注意力层中，1,000 个位置有 100 万个组合，2,000 个位置有 400 万个。'],
   bert:['SQuAD F1 with no next-sentence prediction. Both directions, 87.9. Left context only, 77.8.','都去掉下一句预测时，SQuAD 的 F1 得分为双向 87.9，仅看左侧 77.8。']
 };
 const plot=figures[id]?`<img class="rv-plot" width="415" height="245" src="media/figures/revisit-${id}-${l?'zh':'en'}.svg" alt="${figures[id][l]}">`:'';
 const answerWasOpen=root.dataset.reading===id && root.querySelector('.rv-check')?.open;
 root.dataset.reading=id;
 root.innerHTML=`<article class="rv-article" data-original><p class="rv-kicker">${r.year} · ${r.name}</p><h3>${r.title[l]}</h3>
 <h4>${t('What the authors tested','当年作者怎么验证')}</h4><p>${r.original[l]}</p>${plot}
 <button type="button" class="rv-page">${t('Find','查看')} ${r.place[l]} · ${t('PDF p. ','第 ')}${r.page}${t('',' 页')}</button><span class="rv-status" role="status"></span>
 <h4>${r.later[l]}</h4><p>${r.evidence[l]}</p>
 <aside class="rv-interpret"><h4>${t('What the comparison tells us','回到原文再看')}</h4><p>${r.takeaway[l]}</p></aside>
 <details class="rv-check"${answerWasOpen?' open':''}><summary><small>${t('Think it through · reveal the answer','想一想 · 点开看答案')}</small>${r.question[l]}</summary><p>${r.answer[l]}</p></details>
 <footer><h4>${t('Later sources','后续资料')}</h4>${r.sources.map(s=>`<a href="${s[2]}" target="_blank" rel="noopener">${s[l]}</a>`).join('')}</footer>
 <details class="rv-picker"><summary>${t('Revisit another classic','换一篇经典论文')}</summary>${Object.entries(readings).filter(([key])=>key!==id).map(([key,x])=>`<a href="${revisitURL(key)}">${x.year} · ${x.name}</a>`).join('')}</details></article>`;
 root.querySelector('.rv-page').onclick=async()=>{
   const status=root.querySelector('.rv-status');
   const found=await openEvidence(r.page,id);
   if(status.isConnected)status.textContent=found?t('Page displayed.','已定位到原文。'):t('The paper is loading. Try again shortly.','论文正在加载，请稍后再点。');
 };
}
