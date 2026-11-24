// Each pair contains the English lesson and its Simplified Chinese counterpart.
export const lessons = [
  {
    title: ['Learning from examples', '从样例中学习'],
    question: ['How does a machine learn a rule?', '机器怎样学会一条规则？'],
    text: ['Imagine sorting photographs of cracked and intact tiles. You label examples. During training, a model adjusts numbers called weights until its predictions better match those labels. To see whether the rule travels beyond the examples, set aside photos the model has never trained on.', '想象你要从照片中挑出有裂纹的瓷砖。先给样本标注“有裂纹”或“完好”。训练时，模型调整一组称为权重的数值，使预测更接近标签。想知道它能否举一反三，就留出一批未参与训练的照片来检验。'],
    figure: ['An inspection trial · illustrative counts','质检试验 · 示例数据'],
    rows: [['Training photos','训练照片','98 / 100'],['Unseen photos','新照片','71 / 100']],
    caption: ['The fraction counts correct decisions. The gap is a reason to inspect the data and repeat the test under realistic lighting.', '分数表示判断正确的照片数占总数的比例。两组结果差距较大，值得检查数据，并在真实光照条件下重做测试。'],
    test: ['Which result better estimates accuracy on tomorrow’s photos, assuming similar lighting?', '假设光照相似，哪组结果更能估计明天新照片的识别准确率？'],
    options: [['98 out of 100 training photos','训练照片中答对 98 张'],['71 out of 100 unseen photos','新照片中答对 71 张']],
    correct: 1, why: ['The unseen photos test whether the model can apply what it learned to fresh examples. Different cameras or lighting could still change the result.', '新照片能检验模型能否把学到的规律用于新样本。换相机或光照后，准确率仍可能改变。'],
    term: 'split', source: ['Google · Dividing a dataset','Google · 划分数据集','https://developers.google.com/machine-learning/crash-course/overfitting/dividing-datasets']
  },
  {
    title: ['Predicting the next token','预测下一个词元'],
    question: ['Where does the next word come from?', '下一个词从哪里来？'],
    text: ['A language model learns patterns in sequences of tokens. A token is a piece of text, sometimes only part of a word. When you type “tighten the”, the model uses that context to score possible next pieces. Once one is chosen, the longer phrase becomes the input for the next prediction.', '语言模型从词元序列中学习规律。词元是一小段文本，有时只是单词的一部分。输入“tighten the”（拧紧……）后，模型根据上下文为下一段文本打分。选中一个词元后，变长的短语就成为下一次预测的输入。'],
    figure: ['Possible continuations · teaching example','可能的续写 · 教学示例'], rows:[['bolt','bolt（螺栓）','60%'],['nut','nut（螺母）','30%'],['cap','cap（盖子）','10%']],
    caption:['These invented probabilities describe possible text after the phrase. The actual bolt size would require evidence from the equipment.', '这些假设的概率描述文字如何接续。要确定实际螺栓的规格，仍需查阅设备资料。'],
    test:['The model picks “nut”. What changes immediately?', '模型选中了“nut”。接下来立即发生什么变化？'],
    options:[['The input now includes “nut”.','输入中加入了“nut”。'],['Its training weights are updated.','训练权重更新了。']], correct:0,
    why:['Generation extends the context. The same weights can give different scores on the next step because the input has changed.', '生成使上下文变长。即使权重相同，输入的变化也会导致下一步的分数不同。'],
    term:'llm', source:['Google · Large language models','Google · 大语言模型','https://developers.google.com/machine-learning/crash-course/llm']
  },
  {
    title:['Attention and context','注意力与上下文'], question:['Which earlier words help interpret “it”?','理解“它”时，哪些前文信息有用？'],
    text:['Read “The pump stopped because it overheated.” To interpret “it”, you look back to “pump”. Attention gives a model a way to combine information from other positions, with weights that depend on the text. The 2017 Transformer paper used this idea for translation and showed that much of training could run in parallel.', '读一读：“水泵停了，因为它过热了。”理解“它”时，你会回看“水泵”。注意力机制让模型按上下文决定权重，组合不同位置的信息。2017 年的 Transformer 论文将这个思想用于翻译，并展示了训练中许多计算可以并行。'],
    figure:['One simplified attention calculation','一次简化的注意力计算'], rows:[['Weight on pump','水泵的权重','0.8'],['Weight on stopped','停止的权重','0.2']],
    caption:['If the two positions carry values 5 and 1, their weighted combination is 0.8 × 5 + 0.2 × 1 = 4.2. Real models combine vectors across many positions.', '若两个位置携带的值分别为 5 和 1，加权结果为 0.8 × 5 + 0.2 × 1 = 4.2。真实模型会组合许多位置上的向量。'],
    test:['With the same values, what happens as more weight shifts to “pump”?','数值不变，若“水泵”的权重增加，结果会怎样？'],
    options:[['It moves toward 1.','更接近 1。'],['It moves toward 5.','更接近 5。']],correct:1,why:['A weighted average moves toward the value receiving more weight. This calculation illustrates information mixing inside the model.', '加权平均值会向权重增加的那一项靠近。这说明了模型内部如何混合信息。'],
    term:'attention',source:['Vaswani et al. · Attention Is All You Need','Vaswani 等 · Transformer 原始论文','https://arxiv.org/abs/1706.03762']
  },
  {
    title:['Retrieval and tools','检索与工具'],question:['How can an assistant know today’s stock level?', '助手怎样得知今天的库存？'],
    text:['Yesterday the warehouse had 30 spare bolts. This morning 12 shipped. An assistant can query the stock system and pass the returned record into the model alongside your question. Retrieval supplies evidence at answer time. A tool can also perform an action such as reserving stock.', '昨天仓库有 30 个备用螺栓，今天早上发出了 12 个。助手可以查询库存系统，把返回的记录连同问题交给模型。检索在回答时提供依据。工具还可以执行预留库存等操作。'],
    figure:['Trace the answer to its record','追溯答案的依据'],rows:[['Yesterday’s snapshot','昨天的快照','30'],['Today’s dispatch','今天已发货','−12'],['Available after dispatch','发货后的库存','18']],
    caption:['The answer depends on the timestamp and the meaning of “available”. Reservations could change how many units you can promise.', '答案取决于记录时间和“可用”的定义。已有预留可能改变实际可承诺的数量。'],
    test:['The assistant says it reserved five bolts. What would verify success?', '助手说已预留五个螺栓。怎样核实？'], options:[['Check the reservation in the stock system.','在库存系统中核对预留记录。'],['Ask it to repeat the confirmation.','让助手再确认一遍。']],correct:0,why:['The system record shows whether the action took effect. Repeating the answer adds no independent evidence.', '系统记录能显示操作是否生效。重复回答不会增加独立证据。'],term:'rag',source:['Lewis et al. · Retrieval-augmented generation','Lewis 等 · 检索增强生成','https://arxiv.org/abs/2005.11401']
  },
  {
    title:['Evaluating performance','判断表现'],question:['What does an 80% success rate tell you?', '80% 的成功率能说明什么？'],
    text:['An evaluation tests a system on a defined set of tasks using a scoring rule. Suppose two assistants process the same 100 requests. One sounds more fluent. Before choosing it, check which requests actually ended with the right change in the stock system.', '评测用既定评分规则，在一组明确任务上测试系统。假设两个助手处理同样的 100 个请求，其中一个表达更流畅。选择之前，先检查库存系统里有多少请求真正完成了正确操作。'],
    figure:['100 requests per assistant · illustrative trial','每个助手处理 100 个请求 · 示例试验'],rows:[['System A · verified outcomes','系统 A · 核实的成功数','70 / 100'],['System B · verified outcomes','系统 B · 核实的成功数','80 / 100']],
    caption:['B leads by 10 percentage points on this set. Read the task mix, tool access and grading rule before applying that number to your own work.', '在这组任务上，B 高出 10 个百分点。要将结果用于自己的工作，需要了解任务组成、可用工具和评分规则。'],
    test:['Which follow-up gives the best evidence for using B in your warehouse?', '哪项后续测试最有助于判断 B 是否适合你的仓库？'],options:[['Compare the length of the two answers.','比较两种回答的长度。'],['Repeat on representative requests with your tools and success rule.','用自己的工具和成功标准，在有代表性的请求上复测。']],correct:1,why:['A representative test measures the outcome you need under the conditions you will actually use.', '有代表性的测试能在实际使用条件下衡量你所关心的结果。'],term:'benchmark',source:['Anthropic · Evaluating AI agents','Anthropic · 智能体评测','https://www.anthropic.com/research/demystifying-evals-for-ai-agents']
  },
  {
    title:['Reading a model release','读懂模型发布说明'],question:['Do fewer output tokens mean a cheaper finished task?', '输出词元更少，完成任务就一定更便宜吗？'],
    text:['On 17 November 2026 OpenAI released GPT-6.2 Astra and Sol in its API, an interface for software to use the models. OpenAI reports improved results on demanding tasks with fewer output tokens than their predecessors. To assess that claim for your work, count input, output, retries and verified successes on the same task set.', '2026 年 11 月 17 日，OpenAI 通过 API 发布 GPT-6.2 Astra 和 Sol。API 是供其他软件调用模型的接口。OpenAI 报告称，与前代模型相比，它们在一些高难度任务上表现更好，输出词元更少。要判断这对你的工作意味着什么，应在同一组任务上统计输入、输出、重试次数和核实的成功数。'],
    figure:['Cost per verified success · hypothetical trial','每个成功任务的成本 · 假设试验'],rows:[['System A · $12 total, 80 successes','系统 A · 共 12 美元，成功 80 次','$0.15'],['System B · $10 total, 50 successes','系统 B · 共 10 美元，成功 50 次','$0.20']],
    caption:['Divide total spend by verified successes. These teaching figures illustrate the calculation and are independent of OpenAI’s reported results.', '总支出除以核实的成功次数，即可得到单位成功成本。此处为演示计算而设定的数据，与 OpenAI 发布的测试结果无关。'],
    test:['Which conclusion could you defend to a colleague?', '你能向同事说明哪一项结论？'], options:[['The release reports an efficiency gain. Our cost per successful task still needs measurement.','发布说明报告了效率提升。我们仍需测量自己的单位成功成本。'],['Our own bill will fall by the same percentage as output tokens.','我们的账单会按输出词元减少的比例下降。']],correct:0,why:['A release supplies a claim and a comparison. A decision also needs the task, prices, tools and reliability that apply to you. Use those four questions the next time a model launches.', '发布说明提供了主张与比较依据。要做决定，还需明确自己的任务、价格、工具和可靠性要求。下次遇到新模型发布时，可以带着这四个问题阅读。'],term:'inference',source:['OpenAI · Model release notes, 17 Nov 2026','OpenAI · 2026 年 11 月 17 日模型发布说明','https://help.openai.com/en/articles/9624314-model-release-notes']
  }
];
