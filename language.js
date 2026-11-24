import {readerUiZh} from './reader-ui-zh.js?v=readingedit1';
import {frontierZh} from './frontier-zh.js?v=readingedit1';
import {studyZh} from './study-zh.js?v=readingedit1';
import {conceptZh} from './concept-zh.js?v=readingedit1';
import {paperZh} from './paper-zh.js?v=readingedit1';
// Interface translations are local; personal notes and original paper text are never sent away.
const zh = {'Workshop':'动手练习','Paper workshop':'论文练习',
'Explore':'探索','AI basics':'AI 基础','Papers':'论文','Practice':'练习','AI frontier':'AI 前沿',
'Papers · Ideas · Practice':'论文 · 理念 · 练习','YOUR FIELD GUIDE TO ARTIFICIAL INTELLIGENCE':'你的人工智能学习指南',
'Big ideas.':'重要思想。','Made understandable.':'深入浅出。',
'Discover how AI works, one idea at a time. Hear the explanation, watch it unfold, then put it into practice.':'一次理解一个概念，逐步认识 AI 的工作原理。听讲解、看演示，再通过练习巩固。',
'Start with the basics':'从基础开始','01 / HOW SYSTEMS LEARN':'01 / 系统如何学习','From rules to learning':'从规则到学习',
'02 / HOW MODELS WRITE':'02 / 模型如何写作','One token at a time':'一次生成一个词元','03 / THE TRANSFORMER IDEA':'03 / Transformer 的核心思想','Learning what matters':'学习关注重点',
'Illustrated inspection scenario':'检测场景示意图','FOLLOW YOUR CURIOSITY':'从好奇心出发','A few ideas worth exploring.':'值得探索的几个问题。',
'GUIDED EXPLANATION · ANIMATION':'引导讲解 · 动画','How does a language model find its next word?':'语言模型如何预测下一个词？','Follow the small prediction step behind an entire answer.':'看看完整回答背后的单步预测。',
'MATHEMATICS · OPTIMIZATION':'数学 · 优化','Learning is a sequence of corrections.':'学习是一连串的修正。','Watch a parameter move down a loss curve.':'观察参数如何沿损失曲线移动。',
'APPLICATIONS · EVIDENCE':'应用 · 证据','Give the model something to work from.':'给模型提供可用的信息。','See how retrieval brings evidence into an answer.':'看看检索如何为回答提供依据。',
'GO TO THE SOURCE':'回到原始资料','Read the paper.':'阅读论文。','Understand the leap.':'理解突破。','Start with':'从','. Read the original alongside a guide to the problem, the central idea, and why it mattered.':'。在阅读原文时，同时了解它要解决的问题、核心思想及其意义。',
'Open the paper':'打开论文','Take the guided lesson →':'开始引导课程 →','MAKE THE IDEAS YOURS':'把知识变成自己的','Choose your way in.':'选择你的学习方式。','Build your vocabulary':'建立知识词汇','Concepts with examples, narration, and mathematics.':'通过实例、讲解和数学理解概念。','Explore the papers':'探索论文','Original research with reading guides and your own notes.':'阅读研究原文、学习指南和自己的笔记。','Practice recall':'主动回忆练习','Explain an idea first, then reveal the walkthrough.':'先尝试解释，再查看讲解。','See the bigger picture':'了解全局','Milestones, official sources, and possible next directions.':'了解里程碑、官方资料和可能的发展方向。','A personal place to read, question, and understand.':'一个阅读、思考和理解的个人空间。','Learning paths →':'学习路径 →','Industry essentials →':'行业基础 →','Your notes and progress stay in this browser.':'你的笔记和学习进度保存在此浏览器中。',
'YOUR PERSONAL LIBRARY':'你的个人论文库','A little reading.':'每天读一点。','A bigger picture.':'看见更广阔的图景。','Landmark ideas, at your own pace.':'按照自己的节奏探索里程碑式思想。','All papers':'全部论文','Model reports':'模型报告','Foundations':'基础','Learning':'学习','Efficiency':'效率','Applications':'应用','Bookmarked':'已收藏','Oldest first':'从旧到新','Newest first':'从新到旧','Notes & progress stay in this browser.':'笔记和进度保存在此浏览器中。','Export journal ↓':'导出学习记录 ↓','Import journal ↑':'导入学习记录 ↑',
'Original paper':'论文原文','Text view':'文本视图','Fit width':'适合宽度','⤢ Full screen':'⤢ 全屏','Select text to highlight or add a note':'选择文字以高亮或添加笔记','Learn & practice':'学习与练习','☆ Bookmark page':'☆ 收藏此页','READING COMPANION':'阅读助手','Understand':'理解','Key terms':'关键词','My notes':'我的笔记','Guides are editorial explanations. Check claims against the original paper. Public papers include preprints and technical reports.':'指南为编辑讲解，请对照原文核实。公开论文包括预印本和技术报告。','Paper notebook':'论文笔记本','Export journal backup ↓':'导出笔记备份 ↓','Restore last removed item':'恢复上次删除的项目','Scroll to read · Your place is saved automatically':'向下滚动阅读 · 自动保存阅读位置','Source & publication details ↗':'来源及发表信息 ↗',
'Dictionary':'词典','Flashcards':'闪卡','Industry essentials':'行业基础','Everyday examples':'日常实例','Check yourself':'自我测试','All terms':'全部词条','All':'全部','Guided explanation':'引导讲解','Check your reasoning':'检验你的理解','The definition behind the example':'例子背后的定义','Read the explanation':'阅读讲解','See how the fields fit together':'看看各领域之间的关系','Explore the diagram & mathematics':'查看图示与数学','Listen to this part':'收听本段','Listen to the answer':'收听答案','AI-generated voice':'AI 生成语音 · 英语','Speed':'语速','Continue automatically':'自动继续','Pause and think before revealing the answer.':'先暂停思考，再查看答案。','← Back':'← 上一步','Continue →':'继续 →','Try the question →':'试着回答 →','Start again':'重新开始','Show explanation':'显示解释','Hide explanation':'隐藏解释','Take a moment to answer in your own words.':'先用自己的话想一想，再查看答案。','Practice flashcard':'闪卡练习','Mark understood':'标记为已理解','Recall before revealing':'先回忆，再揭晓','Build a working vocabulary.':'建立实用词汇。','Explain the term aloud or on paper. Reveal the meaning, compare your explanation, then choose whether to revisit it.':'先口头或书面解释这个术语，再查看讲解、比较理解，并选择是否复习。','Topic':'主题','Deck':'卡组','Needs review':'需要复习','What does it mean, and where would you use it?':'它是什么意思？你会在哪里使用它？','Reveal explanation':'显示讲解','Revisit this':'再次复习','Feels familiar ✓':'已经熟悉 ✓','Full definition & source ↗':'完整定义与来源 ↗','← Previous':'← 上一个','Next →':'下一个 →',
'Who wrote the inspection rule?':'是谁制定了检测规则？','Picture a camera above an ore conveyor. You program it to flag any rock whose bright patch exceeds a fixed area. You chose the measurement and its cutoff. This rule-based vision system illustrates one way to tackle an AI task.':'想象矿石传送带上方有一台摄像机。你设定规则：如果石头上明亮区域的面积超过阈值，就发出提示。测量方式和阈值都由人决定。这种基于规则的视觉系统是一种解决 AI 任务的方法。',
'What if you let examples set the rule?':'如果让示例来决定规则呢？','Keep the camera and the same inspection task. Now label photographs “defect” or “acceptable”. Measure brightness and texture, then fit a decision tree to those measurements. The examples determine its splits. That puts the classifier inside machine learning.':'仍然使用同一台摄像机、完成同一个检测任务。现在将照片标为“有缺陷”或“合格”，测量亮度和纹理，再用这些数据拟合决策树。示例决定了决策树如何划分，因此这是机器学习。',
'What if the system learns the features too?':'如果系统也能学习特征呢？','Give a multilayer neural network the pixels and the labels. Training adjusts its layers so they can build useful features for the inspection. This is deep learning. Place it inside machine learning because its settings were learned from examples.':'将像素和标签输入多层神经网络。训练会调整网络各层，使其能够构造有助于检测的特征。这就是深度学习；由于其参数由示例学习而来，它属于机器学习。',
'A classifier learns from examples using a single fitted decision tree. Which labels apply?':'一个分类器通过示例拟合单棵决策树。它属于哪些领域？','It belongs to AI and machine learning. The tree learned its decisions from examples. Deep learning would use a neural network with multiple learned layers.':'它属于 AI 和机器学习，因为决策树从示例中学习决策。深度学习则使用具有多个可学习层的神经网络。',
'How might this instruction continue?':'这条指令接下来可能是什么？','Read “Tighten the …” and pause. “Bolt” and “nut” both sound plausible. A language model represents that uncertainty as scores over tokens. For this demonstration, imagine just three candidate tokens.':'读到 “Tighten the …”（拧紧……）时停一下。“bolt”（螺栓）和 “nut”（螺母）都合理。语言模型用不同词元的分数来表示这种不确定性。这里假设只有三个候选词元。',
'How does a score turn into a word?':'分数如何变成一个词？','For this toy example, suppose the probabilities are 60% for “bolt”, 30% for “nut”, and 10% for “cap”. A sampling rule can choose any of them. Follow one possible draw in which “bolt” is selected.':'在这个简化例子里，假设 “bolt” 的概率为 60%，“nut” 为 30%，“cap” 为 10%。采样规则可以选中其中任何一个。这里演示选中 “bolt” 的情况。',
'Why does the next prediction change?':'为什么下一次预测会改变？','Append the selected token. The input now reads “Tighten the bolt”. The same model runs again with this longer context. A new set of continuations, such as “until” or “to”, becomes plausible. Repeating this operation produces a passage.':'将选中的词元接到原文后，输入变成 “Tighten the bolt”（拧紧螺栓）。同一个模型在更长的上下文上再次预测，此时 “until” 或 “to” 等后续词可能更合理。重复这一过程便能生成一段文字。',
'After the model produces “bolt”, what changes before it predicts the following token?':'模型生成 “bolt” 后，预测下一个词元之前发生了什么变化？','The input context now includes “bolt”. The learned weights can stay fixed while a different context produces a different probability distribution.':'输入上下文现在包含了 “bolt”。模型权重可以保持不变，但不同的上下文会产生不同的概率分布。',
'AI / machine learning / deep learning':'人工智能 / 机器学习 / 深度学习','Model vs application':'模型与应用','LLM — large language model':'LLM — 大语言模型','Token':'词元（Token）','Tokenizer':'分词器','Parameters / weights':'参数 / 权重','Embedding':'嵌入（Embedding）','Attention':'注意力','Transformer':'Transformer 架构','Multimodal':'多模态','Pre-training':'预训练','Fine-tuning':'微调','Post-training':'后训练','Inference':'推理','Loss':'损失','RLHF — reinforcement learning from human feedback':'RLHF — 基于人类反馈的强化学习','Distillation':'知识蒸馏','LoRA / adapters':'LoRA / 适配器','Prompt':'提示词','Context window':'上下文窗口','RAG — retrieval-augmented generation':'RAG — 检索增强生成','Hallucination':'幻觉','Reasoning tokens / test-time compute':'推理词元 / 测试时计算','Temperature':'温度','Agent':'智能体','Workflow vs agent':'工作流与智能体','Tool / API':'工具 / API','Harness / orchestration':'运行框架 / 编排','Verification':'验证','GPU / accelerator':'GPU / 加速器','VRAM / HBM / model memory':'显存 / HBM / 模型内存','Quantization':'量化','MoE — mixture of experts':'MoE — 混合专家模型','Total vs active parameters':'总参数与激活参数','KV cache':'KV 缓存','Prefill vs decode':'预填充与解码','Latency / TTFT':'延迟 / 首词元时间','Throughput / batching':'吞吐量 / 批处理','Benchmark':'基准测试','Ablation':'消融实验','Checkpoint / model weights':'检查点 / 模型权重','Open weights / open source':'开放权重 / 开源','Preprint / technical report / announcement':'预印本 / 技术报告 / 公告','FLOPs / compute budget':'浮点运算量 / 算力预算','Gradient':'梯度','Gradient descent':'梯度下降','Learning rate':'学习率','Curvature and Hessian':'曲率与海森矩阵','Stochastic gradient descent':'随机梯度下降','Mini-batch':'小批量','Epoch':'训练轮次','Backpropagation':'反向传播','Regularization':'正则化','Vector':'向量','Euclidean norm':'欧几里得范数','Dot product':'点积','Cosine similarity':'余弦相似度','Euclidean distance':'欧几里得距离','Softmax':'Softmax 函数','Causal mask':'因果掩码','Positional encoding':'位置编码','Train, validation and test splits':'训练集、验证集与测试集','Overfitting':'过拟合','Precision':'精确率','Recall':'召回率','Baseline':'基线','Data leakage':'数据泄漏','Calibration':'校准','State-space model':'状态空间模型',
'AI is the broad field; machine learning learns patterns from data; deep learning uses neural networks with many layers.':'人工智能是广义领域；机器学习从数据中学习规律；深度学习使用具有多层结构的神经网络。','A language model with many learned parameters that models token sequences and can generate text.':'大语言模型具有大量学习得到的参数，对词元序列进行建模，并能够生成文本。'
};
Object.assign(zh, {
'A model performs learned computation. An application adds an interface, files, tools and rules around one or more models.':'模型执行学习得到的计算；应用则围绕一个或多个模型加入界面、文件、工具和规则。',
'A unit processed by a model; text tokens can be words, word fragments, characters or other pieces.':'模型处理的基本单位；文本词元可以是单词、单词片段、字符或其他片段。',
'The system that converts input into the token IDs a model processes.':'将输入转换为模型处理的词元编号的系统。',
'Learned numerical settings that shape how a neural network processes inputs. A parameter count describes how many such values it has.':'学习得到的数值设置，决定神经网络如何处理输入；参数量表示此类数值的数量。',
'A numerical representation of an item, such as a token or document, useful for comparing or processing meaning-related patterns.':'将词元或文档等对象表示成数值，便于比较或处理与含义相关的模式。',
'A learned mechanism that weights and combines relevant representations.':'一种通过学习得到的机制，对相关表示加权并组合。',
'A neural-network architecture using attention and other layers to process sequences.':'一种神经网络架构，使用注意力机制和其他层处理序列。',
'Able to process or generate more than one type of information, such as text, images, audio or video.':'能够处理或生成多种信息，例如文本、图像、音频或视频。',
'The broad initial training stage that learns reusable patterns from data.':'初始的大规模训练阶段，模型从数据中学习可复用的规律。',
'Further training that updates a pre-trained model or trainable additions using selected examples.':'使用选定示例继续训练，更新预训练模型或附加的可训练部分。',
'Training stages after broad pre-training, often used to improve instruction following, preferences or task behavior.':'大规模预训练之后的训练阶段，常用于改进指令遵循、偏好或任务表现。',
'Running a trained model to produce outputs from new inputs.':'使用训练好的模型处理新输入并产生输出。',
'A numerical training objective that measures how poorly a model performs according to a chosen rule.':'根据选定规则衡量模型表现有多差的数值训练目标。',
'Uses human feedback, often comparisons of outputs, to help train model behavior through reinforcement learning.':'利用人类反馈（常见的是对多个输出进行比较），通过强化学习帮助训练模型行为。',
'Training a student model using outputs or signals from a teacher model.':'利用教师模型的输出或信号训练学生模型。',
'Parameter-efficient adaptation that trains small additions or low-rank updates while much of the base model remains fixed.':'一种参数高效的适配方法：在基础模型大部分参数保持不变的同时，训练少量附加参数或低秩更新。',
'The input instructions and context supplied to a model.':'提供给模型的输入指令和上下文。',
'The amount of token-based context a model can handle within its supported request limits.':'模型在支持的请求限制内能够处理的上下文词元数量。',
'Retrieves relevant external material and supplies it to a model when generating an answer.':'检索相关外部资料，并在生成回答时将其提供给模型。',
'Generated content that is incorrect or unsupported, sometimes presented convincingly.':'生成了错误或缺乏依据的内容，有时表述得十分可信。',
'Extra computation used while answering, sometimes involving additional generated tokens, attempts or tool calls.':'回答时使用的额外计算，有时包括更多生成词元、尝试或工具调用。',
'A sampling setting that changes how sharply a model’s next-token probabilities are favored.':'影响采样时模型对高概率词元偏好程度的设置。',
'A system in which a model helps choose actions and use tools over multiple steps toward a goal.':'模型参与选择行动并使用工具，经过多个步骤完成目标的系统。',
'A workflow follows a more predefined sequence; an agent chooses more of its next steps dynamically.':'工作流遵循较多预先定义的步骤；智能体则更动态地选择接下来的行动。',
'A tool performs an external action or returns information. An API is a defined way for software to request such operations.':'工具执行外部操作或返回信息；API 是软件请求这些操作的约定接口。',
'The surrounding system that supplies tools, manages context and runs the model’s work loop.':'为模型提供工具、管理上下文并运行工作循环的外围系统。',
'Checking outputs against evidence, tests, constraints or observed results.':'根据证据、测试、约束或观察结果检查输出。',
'Hardware designed to execute many numerical operations in parallel, widely used to train and run neural networks.':'为并行执行大量数值运算而设计的硬件，广泛用于训练和运行神经网络。',
'Represents some numerical values with fewer bits to reduce storage or computation costs.':'用更少的比特表示某些数值，以降低存储或计算成本。',
'A network that selects particular expert subnetworks for each input rather than activating all experts every time.':'针对每个输入选择特定专家子网络，而非每次激活全部专家的网络。',
'Stored attention information from earlier tokens, reused during later generation steps.':'缓存先前词元的注意力信息，供后续生成步骤重复使用。',
'← All terms':'← 全部词条','Definition and source':'定义与来源','Save GIF ↗':'保存 GIF ↗',
'Follow the bright reflection. A fixed brightness cutoff can flag it even when it is not a defect.':'观察明亮的反光：即使它不是缺陷，固定亮度阈值也可能将其标记出来。',
'The engineer supplies measurements; labeled examples determine the tree’s decision splits.':'工程师提供测量值，带标签的示例决定决策树的划分。'
});

Object.assign(zh,paperZh,{
  "The big idea · 3 minute guide": "核心思路 · 3 分钟导读",
  "Think of it this way": "用一个例子理解",
  "Why this changed things": "为什么重要",
  "Your reading route": "建议阅读顺序",
  "Pause & reflect": "停下来想一想",
  "Try explaining the idea in your own words in “My notes”.": "试着在「我的笔记」里用自己的话讲清楚这个想法。",
  "← Previous paper": "← 上一篇",
  "Next paper →": "下一篇 →",
  "Keep these nearby": "随读随查",
  "A small vocabulary": "几个关键术语",
  "How to read an equation": "怎样读论文里的公式",
  "First identify what each symbol represents. Ask what increases or decreases, and what the equation helps measure. You can understand the main contribution before following every derivation.": "先找出每个符号的含义。再看看什么量会增减、公式要计算什么。可以先理解主要贡献，再细读推导。",
  "Your reading journal": "你的阅读记录",
  "Make the idea yours.": "用自己的话总结",
  "What problem did this solve? What is the tradeoff? Where might you use it?": "它解决了什么问题？有哪些取舍？你可以用在哪里？",
  "Saved in this browser · export your journal for a backup.": "记录保存在当前浏览器，可导出备份。",
  "Saved in this browser": "已保存在当前浏览器",
  "○ Mark read": "○ 标记已读",
  "✓ Read": "✓ 已读",
  "☆ Save": "☆ 收藏",
  "★ Saved": "★ 已收藏",
  "AI tools ↗": "AI 工具 ↗",
  "Citations: on": "引用提示：开",
  "Citations: off": "引用提示：关",
  "Opening your paper…": "正在打开论文……",
  "This paper could not load.": "论文加载失败。",
  "Try again": "重试",
  "Check your connection and retry. Your notes are preserved.": "请检查网络后重试，笔记已保留。",
  "No matching papers. Try another topic.": "没有符合条件的论文，请换个关键词试试。",
  "Text view": "文本视图",
  "Fit width": "适合宽度",
  "⤡ Exit full screen": "⤡ 退出全屏",
  "Read the latest model reports": "阅读最新模型报告",
  "Original publication ↗": "查看官方原文 ↗",
  "Model card": "模型卡",
  "System card": "系统卡"
});
Object.assign(zh, studyZh, conceptZh, frontierZh, readerUiZh);
const attrZh={'Personal notes':'个人笔记','My explanation, questions and examples…':'写下我的理解、疑问或例子……','Search papers':'搜索论文','Search papers and ideas':'搜索论文和概念','Sort papers':'论文排序','Change reading theme':'切换阅读主题','Bookmark paper':'收藏论文','Previous page':'上一页','Next page':'下一页','Page number':'页码','Zoom out':'缩小','Zoom in':'放大','Expand paper to full screen':'将论文展开至全屏','Lesson narration':'课程语音（英语）','Answer narration':'答案语音（英语）','Narration speed':'语音速度','Featured starting points':'推荐起点','Knowledge bank sections':'知识库栏目'};
const textOriginal=new WeakMap(), attrOriginal=new WeakMap();
let language='en';try{language=localStorage.getItem('ai-room-language')==='zh'?'zh':'en'}catch{}
let observer, queued=false, noticeDismissed=false;
const dynamicZh = [
  [/^(\d+)\. (.+)$/, (i,title) => i+'. '+(zh[title] || title)],
  [/^(\d+) of 20 questions answered correctly$/, n => `已答对 ${n} / 20 题`],
  [/^Start from zero · Lesson (\d+) of 10$/, n => `基础课 · 第 ${n} 课，共 10 课`],
  [/^Mixed practice · (\d+) of 5$/, n => `综合练习 · 第 ${n} 题，共 5 题`],
  [/^(\d+) of 5 correct on the first try without help$/, n => `未看提示、首次答对 ${n} / 5 题`],
  [/^Next · (.+) →$/, title => `下一课：${zh[title] || title} →`],
  [/^Return to (.+) →$/, title => `返回《${title}》 →`],
  [/^Learning guides reviewed ([\d-]+) · Original editorial exercises based on the linked papers\..*$/, date => `导读核对日期：${date}。练习和题解由本站编写。简化示例会在题中标明。`],
  [/^(\d+) of (\d+)$/, (n,total) => `第 ${n} 张，共 ${total} 张`],
  [/^(\d+) \/ (\d+) marked familiar$/, (n,total) => `已熟悉 ${n} / ${total} 个词条`],
  [/^(.+) · (\d+) \/ (\d+)$/, (group,n,total) => `${zh[group] || group} · ${n} / ${total}`],
  [/^\/ (\d+) understood$/, n => `/ ${n} 个词条已理解`],
  [/^(\d+) definitions →$/, n => `${n} 个词条 →`],
  [/^(\d+) terms$/, n => `${n} 个词条`],
  [/^(\d+) \/ (\d+) answered · (\d+) correct$/, (n,total,correct) => `已答 ${n} / ${total} 题，答对 ${correct} 题`],
  [/^Progress saved in this browser · Updated (\S+)$/, date => `进度保存在当前浏览器 · 更新于 ${date}`],
  [/^≈ (.+) GiB · raw weights only$/, n => `约 ${n} GiB，仅计算模型权重`],
  [/^illustrative total · (.+) per planned task$/, amount => `估算总额 · 平均每个计划任务 ${amount}`],
  [/^(\d+) \/ (\d+) practiced$/, (n,total) => `已练习 ${n} / ${total} 篇`],
  [/^(\d+) questions ready to review →$/, n => `复习到期的 ${n} 道题 →`],
  [/^Review queue · (\d+)$/, n => `待复习 · ${n}`],
  [/^(\d+) ready today$/, n => `今天可复习 ${n} 题`],
  [/^(\d+) scheduled later · reminders appear here when you visit$/, n => `另有 ${n} 题安排在以后，可回到这里查看`],
  [/^(\d{4}) · (.+) · (\d+)\/3 questions reviewed$/, (year,cat,n) => `${year} · ${zh[cat] || cat} · 已复习 ${n}/3 题`],
  [/^(\d+)\/3 questions reviewed\. Returning later is part of the lesson\.$/, n => `已复习 ${n}/3 题。下次可以回来再试。`],
  [/^(\d+) \/ (Choose & explain|Apply|Evaluate|Explain|Apply & calculate|Check the claim|[^/]+)$/, (n,kind) => `${n} / ${zh[kind] || kind}`],
  [/^Previous attempts · (\d+)$/, n => `以往作答 · ${n}`],
  [/^Reviewed · next (.+)$/, date => `已复习 · 下次 ${date}`],
  [/^Explore the paper: (.+) →$/, title => `阅读论文《${title}》 →`],
  [/^Read (.+) ↗$/, title => `阅读《${title}》 ↗`],
  [/^All (\d+) concepts$/, n => `全部 ${n} 个概念`],
  [/^(\d+) papers?$/, n => `${n} 篇论文`],
  [/^(\d+) \/ (\d+) read$/, (n, total) => `已读 ${n} / ${total} 篇`],
  [/^Page (\d+) of (\d+) · Scroll to continue · Place saved$/, (n,total) => `第 ${n} / ${total} 页 · 位置已保存`],
  [/^(\d+) cards$/, n => `${n} 张卡片`],
  [/^Notebook \((\d+)\)$/, n => `笔记本（${n}）`],
  [/^(\d+) briefs$/, n => `${n} 项更新`],
  [/^(\d+) papers · (\d+) release summaries$/, (n,m) => `${n} 篇论文与报告 · ${m} 项更新摘要`],
  [/^Research paper · (\d+)$/, year => `研究论文 · ${year}`],
  [/^Page (\d+)$/, n => `第 ${n} 页`],
  [/^(Saved word|Highlight) · Page ([\d, ]+)$/, (kind,n) => `${zh[kind]} · 第 ${n} 页`],
  [/^☆ Bookmark current page \((\d+)\)$/, n => `☆ 收藏当前页（第 ${n} 页）`],
  [/^Preparing page (\d+) of (\d+)…$/, (n,total) => `正在整理第 ${n} 页，共 ${total} 页……`],
  [/^Jump to annotation page (\d+)$/, n => `跳到批注所在的第 ${n} 页`],
  [/^Bookmark label for page (\d+)$/, n => `第 ${n} 页的书签名称`],
  [/^Note on ([\s\S]+)$/, excerpt => `这段原文的笔记：${excerpt}`],
  [/^Reading theme: (light|sepia|dark)$/, theme => `阅读主题：${({light:'浅色',sepia:'护眼',dark:'深色'})[theme]}`],
  [/^([^·]+) · (\d{4}-\d{2}-\d{2})$/, (kind,date) => `${zh[kind] || kind} · ${date}`]
];
function convert(text) {
  const [, leading, core, trailing] = text.match(/^(\s*)([\s\S]*?)(\s*)$/);
  let out = Object.hasOwn(zh,core) ? zh[core] : undefined;
  if(!out && / [→↗]$/.test(core)){
    const base=core.slice(0,-2);
    if(Object.hasOwn(zh,base))out=zh[base]+core.slice(-2);
  }
  if (!out) {
    for (const [pattern, translate] of dynamicZh) {
      const match = core.match(pattern);
      if (match) {out = translate(...match.slice(1)); break;}
    }
  }
  return out ? leading + out + trailing : text;
}
export function readerText(text){return language==='zh'?convert(text):text}
function isProtected(el){return !!el.closest('#literacy-course,.paper-workshop,script,style,[contenteditable],#stage,.textLayer,.pdf-page,.text-page,#notebook-content blockquote,.user-note,.annotation-layer,#language-switch,#language-notice,svg,[data-original]')}
function visit(root){
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;
 while(n=walker.nextNode()){
  const el=n.parentElement;if(!el||isProtected(el)||el.closest('textarea,input,.lp-attempt-history div > p'))continue;
  let saved=textOriginal.get(n);if(!saved||(![saved.en,saved.zh].includes(n.nodeValue)))saved={en:n.nodeValue,zh:convert(n.nodeValue)};
  if(el.tagName==='OPTION'&&!el.hasAttribute('value'))el.setAttribute('value',saved.en.trim());
  textOriginal.set(n,saved);n.nodeValue=language==='zh'?saved.zh:saved.en;
 }
 const elements=[];if(root.nodeType===1)elements.push(root);if(root.querySelectorAll)elements.push(...root.querySelectorAll('[placeholder],[aria-label],[title]'));
 for(const el of elements){if(isProtected(el)&&el.id!=='notes')continue;let saved=attrOriginal.get(el)||{};for(const key of ['placeholder','aria-label','title']){const current=el.getAttribute(key);if(current==null)continue;let a=saved[key];if(!a||![a.en,a.zh].includes(current))a={en:current,zh:attrZh[current]||convert(current)};saved[key]=a;el.setAttribute(key,language==='zh'?a.zh:a.en)}attrOriginal.set(el,saved)}
}
function apply(){queued=false;observer.disconnect();document.documentElement.lang=language==='zh'?'zh-Hans':'en';visit(document.body);const btn=document.getElementById('language-switch');btn.textContent=language==='zh'?'EN':'中文';btn.setAttribute('aria-label',language==='zh'?'Switch to English':'切换到中文');btn.setAttribute('title',language==='zh'?'Switch to English':'切换到中文');document.getElementById('language-notice').hidden=language!=='zh'||noticeDismissed;observer.observe(document.body,{subtree:true,childList:true,characterData:true})}
function queue(){if(!queued){queued=true;requestAnimationFrame(apply)}}
export function setupLanguage(){const right=document.querySelector('.header-right');const button=document.createElement('button');button.id='language-switch';button.type='button';right.prepend(button);const notice=document.createElement('div');notice.id='language-notice';notice.hidden=true;notice.setAttribute('role','note');notice.textContent='中文模式会切换导读、练习和术语解释。论文与引文按原文显示，配音为英语。';const close=document.createElement('button');close.textContent='×';close.setAttribute('aria-label','关闭提示');close.onclick=()=>{noticeDismissed=true;notice.hidden=true};notice.append(close);document.body.append(notice);observer=new MutationObserver(queue);button.addEventListener('click',()=>{language=language==='en'?'zh':'en';try{localStorage.setItem('ai-room-language',language)}catch{}apply();document.dispatchEvent(new Event('room-language'))});apply()}
setupLanguage();
