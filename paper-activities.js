// Each exercise uses a small teaching example. Page numbers refer to the bundled PDFs.
export const activities = {
  gemini4neon: [
    'Imagine a request with a shared budget of 1,000,000 tokens. Your documents and instructions already use 980,000. Allowing for no other overhead, how many tokens remain for the answer?|假设输入和输出共享 100 万词元。文档与指令已占用 98 万词元，忽略其他开销，最多还剩多少词元可用于回答？',
    ['20,000','64,000','1,000,000'],0,
    'Subtract the space already used from the shared budget.|从共享总预算里减去已用的空间。',
    '1,000,000 − 980,000 = 20,000. The card also lists a default synchronous output limit of 64,000. Both limits apply, so only 20,000 fit in this example.|100 万 − 98 万 = 2 万。卡片还列出默认同步输出上限 6.4 万。两个限制同时生效，这个例子最多容纳 2 万词元。',
    2,'Read Inputs and Outputs together. Which line describes the shared window? Which gives a separate limit for an ordinary synchronous response?|把 Inputs 和 Outputs 两段放在一起读。哪一行描述共享窗口？哪一行给出普通同步回答的单独上限？'],
  claudefable52: [
    'Fable 5.2 scored 85.6% on a programming test. With a counter showing how much working space remained, it scored 91.6%. How large was the gain in percentage points?|Fable 5.2 在一项编程测试中得分 85.6%。加入显示剩余工作空间的计数器后，得分为 91.6%。提高了多少个百分点？',
    ['0.6','6.0','7.0'],1,
    'For a difference in percentage points, subtract the two percentages directly.|计算百分点差值时，直接用两个百分数相减。',
    '91.6 − 85.6 = 6.0 percentage points. Anthropic changed the information supplied by the test environment. Both scores belong to Fable 5.2. The result gives you a reason to record the test setup alongside the model name.|91.6 − 85.6 = 6.0 个百分点。Anthropic 调整了测试环境所提供的信息。两个得分都属于 Fable 5.2。记录测试结果时，也要注明测试环境。',
    216,'In the ProgramBench discussion, find 85.6% and 91.6%. Read the sentence between the scores to identify what the model could see in the second setup.|在 ProgramBench 的讨论中找到 85.6% 和 91.6%。读两个分数之间的文字，找出模型在第二种设置下多看到了什么。'],
  gpt62: [
    'A teacher collects only the exam questions students complained were marked incorrectly. She regrades those cases. Which question can her sample help answer?|老师只收集学生投诉批改有误的考题，然后复核这些题。这组样本能帮助回答哪个问题？',
    ['How often all exams were marked incorrectly|所有试卷的批改错误率是多少','How often students complain across the school|全校学生提出投诉的频率是多少','Whether the reported mistakes recur on regrading|复核时，被投诉的错误是否再次出现'],2,
    'Who had a chance to appear in this sample?|哪些考题有机会进入这个样本？',
    'The sample lets you test what happens on previously reported cases. To estimate an error rate across all exams, you would also need a representative sample of exams. OpenAI makes the same distinction for its evaluation of user-reported factual errors.|这个样本可以用来测试被投诉的题复核后会怎样。若要估算全部试卷的错误率，还要抽取有代表性的试卷样本。OpenAI 在用户报告事实错误的评测中作了相同区分。',
    73,'Look at Figure 25 and read the paragraph below it. Identify how a conversation first became eligible for this test. Use the PDF reader’s page number.|看图 25 和图下的段落。找出对话最初为什么会进入这项测试。这里使用 PDF 阅读器的页码。'],
  transformer: [
    'A sensor reports 10 °C. A second reports 0 °C. Use weights of 0.8 and 0.2 for the two readings. What is their weighted average?|两个传感器分别测得 10 °C 和 0 °C，对应权重为 0.8 和 0.2。加权平均温度是多少？',
    ['5 °C','8 °C','10 °C'],1,
    'Multiply each reading by its share before adding.|先把每个读数乘以它的权重，再相加。',
    '0.8 × 10 + 0.2 × 0 = 8 °C. The weights tell you how much to take from each value. An attention head makes the same kind of weighted sum. Each value is a vector, so it repeats this calculation for each coordinate.|0.8 × 10 + 0.2 × 0 = 8 °C。权重决定每个值贡献多少。注意力头也做这样的加权求和。因为每个值都是向量，所以要对每个坐标分别计算。',
    4,'Figure 2, left. Trace the arrow from SoftMax into the last MatMul. The weights you just used enter here and combine the values V.|图 2 左侧。沿 SoftMax 的箭头找到最后一个 MatMul。你刚使用的权重就在这里与数值 V 相乘。'],
  bert: [
    'Read “I sat on the bank and watched the water.” Cover the words after “bank”. Which clue do you regain when you uncover them?|读 “I sat on the bank and watched the water.” 先遮住 bank 后面的词。揭开后，哪个词帮助你判断 bank 的含义？',
    ['sat','I','water'],2,'Bank can mean a financial institution or the side of a river.|Bank 可以指银行，也可以指河岸。',
    '“Water” makes the river meaning more plausible. During masked-word training BERT can use words on both sides of the missing word.|Water 让“河岸”这个意思更合理。BERT 在训练中预测被遮住的词时，可以利用左右两侧的线索。',
    4,'Find “Masked LM” in the pre-training section. Look for what the model uses to predict a hidden token.|在预训练一节找到 Masked LM，看看模型用什么来预测被遮住的词。'],
  gpt3: [
    'You want a model to label a new message as urgent or routine. You already have three labeled examples. How would you try few-shot prompting?|你想让模型判断新消息是否紧急。手头有三条已标注的例子。怎样尝试少样本提示？',
    ['Put the three examples before the new message|把三个例子放在新消息前','Change three model weights|修改三个模型权重','Hide the labels|遮住标签'],0,
    'Think about what the model can read during this request.|想想模型在这次请求中能读到什么。',
    'Write “Fire alarm → urgent” and two other examples, then append the new message. The examples show the task and the output format within this request. The model weights stay fixed.|写下“火警 → 紧急”等三组例子，再接上新消息。模型从本次输入看到任务和输出格式，权重保持固定。',
    1,'In the abstract, find “without any gradient updates”. Connect that phrase to the three examples in your prompt.|在摘要中找到 without any gradient updates，把这句话与提示里的三个例子联系起来。'],
  scaling: [
    'Imagine a fitted curve L = C⁻⁰·⁰⁵ for a toy training run. Compute budget C doubles. What does the curve predict for loss L?|假设一次教学实验拟合出 L = C⁻⁰·⁰⁵。计算预算 C 翻倍，损失 L 会怎样？',
    ['Falls by half|减半','Falls by about 3.4%|下降约 3.4%','Doubles|翻倍'],1,'Divide the new loss by the old loss. The C terms cancel.|用新损失除以旧损失，C 会约掉。',
    'The ratio is 2⁻⁰·⁰⁵ ≈ 0.966. The predicted loss is 96.6% of its old value, a decrease of about 3.4%. The exponent here is an example.|比例是 2⁻⁰·⁰⁵ ≈ 0.966。新的预测损失是原先的 96.6%，即约下降了 3.4%。这里的指数是教学示例。',
    4,'In the summary of scaling laws, locate the power laws for loss. Identify the input that changes in each relationship.|在缩放定律总结中找到描述损失的幂律，辨认每个关系中改变的自变量。'],
  chinchilla: [
    'In this example, training cost is proportional to the number of parameters times the number of training tokens. If the cost stays fixed and the parameter count doubles, how does the token count change?|在这个简化例子中，训练成本正比于参数量乘以训练词元数。总成本不变，参数量翻倍，训练词元数会怎样变化？',
    ['Twice as many|两倍','The same|相同','Half as many|一半'],2,'Try a budget of 100, starting with 10 × 10.|可以用 100 的预算，从 10 × 10 开始算。',
    '10 × 10 and 20 × 5 cost the same in this example. A bigger model sees less data. The paper tests which balance gives the best loss for a fixed budget.|10 × 10 与 20 × 5 在这里成本相同。更大的模型只能读更少的数据。论文研究固定预算下哪种配比的损失最低。',
    1,'Read the abstract’s comparison between Chinchilla and Gopher. Which model trained on more tokens?|读摘要里 Chinchilla 与 Gopher 的比较。哪个模型训练时读过更多词元？'],
  cot: [
    'A crate holds six bottles. Three crates arrive and four bottles break. Which intermediate number would help someone check your answer?|每箱有 6 瓶，来了 3 箱，打碎了 4 瓶。写出哪个中间结果最方便别人核查？',
    ['18 bottles before breakage|破损前有 18 瓶','3 incoming crates|来了 3 箱','4 broken bottles|打碎了 4 瓶'],0,'Look for a new quantity produced by the first operation.|寻找第一步运算得出的新数量。',
    '3 × 6 = 18, then 18 − 4 = 14. A worked example in the prompt shows how to divide a task into intermediate steps. Each written step still needs checking.|3 × 6 = 18，再算 18 − 4 = 14。提示中的示例展示了怎样把任务拆成中间步骤，每一步仍需要核查。',
    4,'Find the examples in Figure 3. Identify one intermediate statement that connects the question to its answer.|在图 3 的示例里，找一句连接问题与答案的中间推理。'],
  instruct: [
    'Two answers to the same request are both fluent. A reviewer prefers B because it follows the requested format. What would you record for preference training?|同一请求的两个回答都很通顺。评审更喜欢 B，因为它符合要求的格式。偏好训练需要记录什么？',
    ['Only the word count|仅记录字数','The request and the ranking B over A|记录请求，以及 B 优于 A 的排序','A new vocabulary|一份新词表'],1,'The preference is meaningful for a particular request.|偏好针对的是这条具体请求。',
    'Keep the prompt and both answers together with their order. Repeated comparisons train a reward model that can help steer later training.|把提示和两个回答连同排序一起保存。大量比较可以训练奖励模型，进而指导后续训练。',
    3,'Figure 2, step 2. Trace how ranked outputs become training data for the reward model.|图 2 第 2 步。看看排序后的输出怎样成为奖励模型的训练数据。'],
  dpo: [
    'For a delivery question, a reviewer chose answer A over B. You want to apply DPO. Which training signal do you already have?|对同一道配送问题，评审选了 A，放弃了 B。若采用 DPO，你已经具备哪种训练信号？',
    ['A delivery-time measurement|一个配送耗时测量值','A score for every possible reply|所有可能回答的分数','A preferred and a rejected answer|一对选中与落选的回答'],2,
    'Ask what information a comparison actually supplies.|想想两者比较实际提供了什么信息。',
    'A over B tells you which answer the reviewer preferred for this prompt. DPO trains the model to favor A over B more strongly than a fixed reference model does.|“A 优于 B”说明了评审对这道题的偏好。DPO 比较模型和固定参考模型给这两个答案的概率比，使模型相对更偏向 A。',
    2,'Compare the two paths in Figure 1. Find where the preference pairs enter the DPO path.|比较图 1 的两条路径，找出偏好样本对从哪里进入 DPO 路径。'],
  rag: [
    'A customer asks how many bags are in stock today. You find the current stock ledger and last year’s price list. Which passage should accompany the question?|顾客问今天还有几袋库存。你找到了当前库存台账和去年的价目表。应把哪段资料放进问题？',
    ['Today’s count from the ledger|台账中今天的库存数量','Last year’s unit price|去年的单价','The customer’s name|客户姓名'],0,'Match the evidence to both the quantity requested and its date.|让证据同时符合所问的数量和日期。',
    'If today’s ledger says 50 bags, pass that record with the question. Retrieval supplies evidence at answer time. A stale record could still lead to a stale answer.|如果今天的台账写着 50 袋，就把这条记录与问题一起提交。检索在作答时提供证据，过期记录仍可能导致过期答案。',
    2,'Figure 1. Follow a retrieved document from the index to the generator. Where would the stock record enter?|图 1。沿着检索文档从索引走到生成器，库存记录会从哪里进入？'],
  react: [
    'A train timetable tool returns “no service Tuesday”. Your travel assistant had planned a Tuesday trip. What should enter its next decision?|时刻表工具返回“周二停运”，旅行助手原本计划周二出发。下一步决策应该用到什么？',
    ['Just the original itinerary|仅用最初行程','The tool result, then consider another day|使用工具结果，再考虑改期','A guessed departure time|猜一个发车时间'],1,'What did the timetable tell the assistant that it did not know when planning the trip?|与最初制订计划时相比，助手从时刻表中得到了什么新信息？',
    'The assistant now knows that the planned train will not run. The timetable result becomes part of its next input, so it can search for a different service.|助手现在知道原定车次停运了。系统把时刻表结果加入下一次输入，助手便能据此查询别的车次。',
    2,'In Figure 1, find an Action followed by an Observation. What information becomes available only after the action?|在图 1 找到相邻的 Action 与 Observation。哪条信息要等行动后才出现？'],
  lora: [
    'A 100 × 100 weight table has 10,000 entries. Freeze it and learn two smaller tables of shapes 100 × 2 and 2 × 100. How many entries do you train?|一个 100 × 100 权重表有一万个元素。冻结它，另训练 100 × 2 与 2 × 100 两个小表。需要训练多少个元素？',
    ['200','400','10,000'],1,'Count entries in each small table, then add.|分别算出两个小表的元素数量，再相加。',
    '100 × 2 + 2 × 100 = 400. Multiplying the two small tables produces a 100 × 100 update with rank at most 2. The original weights are retained.|100 × 2 + 2 × 100 = 400。两个小表相乘得到 100 × 100 的更新矩阵，秩最多为 2。原始权重被保留。',
    4,'Find the product BA near the low-rank update equation. Match B and A to the two small tables.|在低秩更新公式附近找到乘积 BA，把 B 和 A 分别对应到两个小矩阵。'],
  qlora: [
    'Ignore bookkeeping for a moment. A frozen base has 8 million weights. How much raw storage do they need at 4 bits each?|暂时忽略额外开销。冻结的基础模型有 800 万个权重，每个占 4 位。权重本身需要多少存储空间？',
    ['4 MB','8 MB','32 MB'],0,'Eight bits make one byte. Use decimal MB.|8 位等于 1 字节，这里采用十进制 MB。',
    '8 million × 4 bits ÷ 8 = 4 million bytes. QLoRA stores the base compactly and trains adapters. Actual training also needs memory for scales, adapters and temporary data.|800 万 × 4 位 ÷ 8 = 400 万字节。QLoRA 压缩存储底座并训练适配器，实际训练还要为量化比例、适配器和临时数据留出空间。',
    3,'Figure 1. Identify the frozen base and the parts updated during QLoRA training.|图 1。辨认冻结的基础权重和 QLoRA 训练时更新的部分。'],
  flash: [
    'You must total a long spreadsheet on a machine with tiny fast memory. Which approach cuts trips to slow storage while keeping the same sum?|要在高速内存很小的机器上求长表格的总和。哪种做法既减少慢速存储访问，又保持总和？',
    ['Skip every other row|跳过隔行数据','Round all inputs|把输入取整','Load blocks and maintain a running total|分块读取并维护累计值'],2,'Separate the value of the result from how often data moves.|区分计算结果与数据搬运次数。',
    'Accumulate a block before fetching another. FlashAttention uses a more involved running calculation for softmax. Tiling avoids writing and rereading the full attention matrix while preserving exact attention up to numerical precision.|每读一块就累计一次。FlashAttention 用更复杂的递推处理 softmax，分块可以免去完整注意力矩阵的写回和重读，并在数值精度内保留精确注意力。',
    2,'Figure 1. Trace the movement between HBM and SRAM. Which memory is smaller and faster?|图 1。沿着 HBM 与 SRAM 之间的数据移动路线，看看哪种存储更小、更快。'],
  vllm: [
    'Each cache block holds keys and values for four tokens. How many blocks do you need to cache six tokens?|每块缓存能容纳四个词元的键和值。要为六个词元保存键值缓存，至少需要几块？',
    ['1','2','6'],1,'Fill the first block, then place the remaining tokens.|先填满第一块，再放剩余词元。',
    'Four tokens fill block one. Two more occupy block two, leaving two spare slots there. PagedAttention maps logical blocks to physical memory as the answer grows.|前 4 个填满第一块，再用第二块放 2 个，还剩 2 个空位。PagedAttention 在回答增长时把逻辑块映射到物理内存块。',
    5,'Find Section 4.1. Locate “logical” and “physical” blocks and follow one mapping.|在第 4.1 节找到 logical 和 physical blocks，追踪一个映射。'],
  speculative: [
    'A small model proposes “turn left now.” In this example, keep each word only if it is the larger model’s top choice. The larger model chooses “turn,” then “left,” then “here.” Which part of the draft is kept?|小模型先写出了 turn left now。本例中，只有大模型也把一个词列为首选时才保留它。大模型依次选出 turn、left、here。草稿中哪一段可以保留？',
    ['turn left|turn left','turn left now|turn left now','left now|left now'],0,
    'Read from the beginning and stop at the first disagreement.|从头读，在第一次分歧处停下。',
    'Keep “turn left”, then use “here” at the mismatch. Parallel verification can save expensive model calls. The paper uses a probability-based acceptance rule for sampling.|保留 turn left，在分歧处改用 here。并行验证有机会减少昂贵的模型调用。论文中采样使用基于概率的接受规则。',
    1,'Read the abstract and find which model proposes tokens and which verifies them.|读摘要，找出谁提出候选词元，谁进行验证。'],
  gqa: [
    'An attention layer has eight query heads. Every group of four shares one set of keys and values. How many sets does the model cache?|一个注意力层有八个查询头，每四个共用一套键和值。模型需要缓存几套键和值？',
    ['8','4','2'],2,'Divide the number of heads by the number in each group.|用查询头总数除以每组的查询头数。',
    '8 ÷ 4 = 2 sets. In grouped-query attention, query heads remain distinct while heads in a group share keys and values. This reduces stored key/value data.|8 ÷ 4 = 2 套。分组查询注意力中，查询头各自独立，组内共享键和值，从而减少键值缓存。',
    2,'Figure 2. Count the key/value heads under the grouped-query drawing and compare it with the multi-head drawing.|图 2。数一数分组查询示意图里的键值头，再与多头注意力图比较。'],
  switch: [
    'A Switch layer has eight expert networks. For a given token, its router picks expert 3. How many experts process this token in that layer?|一个 Switch 层有八个专家网络。对某个词元，路由器选了专家 3。在这一层里，实际处理它的专家有几个？',
    ['1','4','8'],0,'Count the chosen route for one job.|只看一项任务选中的路线。',
    'Only expert 3 processes this token in this layer. A different token could go to a different expert. The rest of the network still runs.|这个词元在这一层只由专家 3 处理。下一个词元可能分给其他专家。模型其余部分仍要运行。',
    5,'In Figure 2, look for the router. Trace one token along its selected expert path.|在图 2 找到路由器，跟踪一个词元进入选中的专家。'],
  mamba: [
    'A log contains “SAVE 7”, then a hundred routine readings. You must report the saved number. Which update rule helps?|日志中出现“保存 7”，之后有一百条常规读数。你最终要报告保存的数，哪种更新规则有帮助？',
    ['Overwrite memory with every reading|每条读数都覆盖记忆','Write on SAVE and retain through routine readings|看到保存指令才写入，常规读数期间保留','Clear memory after each line|每行后清空记忆'],1,
    'Which input tells you that the state needs changing?|哪个输入告诉你应该更新状态？',
    'The useful memory update depends on the input. Mamba learns input-dependent state updates, which can help retain relevant information over a sequence.|有用的更新取决于当前输入。Mamba 学习随输入变化的状态更新，使相关信息有机会沿序列保留。',
    6,'In Figure 2, compare copying with selective copying. Look for what decides which items must survive.|在图 2 对比复制与选择性复制。哪些输入决定要保留哪些内容？'],
  deepseekv3: [
    'A model contains many specialists, and only a subset works on each word fragment. Which number best describes how many weights participate for one fragment?|模型有许多专家，每个词元只调用一部分。哪个数字最能描述处理一个词元时参与运算的权重数量？',
    ['All stored weights|全部已存权重','Number of training texts|训练文本数','Active parameters per token|每个词元的激活参数数'],2,'Count the work along the route the token actually takes.|统计这个词元实际经过的路线。',
    'The abstract gives 671 billion total parameters and 37 billion activated per token. These answer different questions about model capacity and computation. Speed also depends on hardware and memory traffic.|摘要给出总参数 6710 亿、每个词元激活 370 亿。两者分别描述模型容量和参与计算的规模。实际速度还受硬件和数据搬运影响。',
    1,'Find the two parameter counts in the abstract and identify which count changes with sparse activation.|在摘要中找到两个参数量，辨认哪个表示稀疏激活后参与运算的部分。'],
  deepseekr1: [
    'A math trainer can check the final numbers for 100 problems. A model gets 60 correct before training and 75 afterward. What improved in this experiment?|数学训练器能核实 100 题的最终数值。模型在训练前答对 60 题，训练后答对 75 题。这个实验直接说明了什么？',
    ['Accuracy rose by 15 percentage points|正确率提升 15 个百分点','Every reasoning step is correct|每个推理步骤都正确','All other tasks improved equally|其他任务同样提升'],0,
    'Subtract the two percentages and ask what the checker actually observed.|把两个百分比相减，再想想检查器实际看到什么。',
    '75% − 60% = 15 percentage points. A verifiable outcome can reward successful attempts. A final-answer check alone cannot tell which reasoning steps were sound. The figures here are a toy example.|75% − 60% = 15 个百分点。可验证的结果能为成功尝试提供奖励。仅核对最终答案无法说明每一步推理是否正确。此处数字为教学示例。',
    4,'Find the AIME training curve. Read its vertical axis and distinguish the measured score from the model’s explanation.|找到 AIME 训练曲线，读纵轴，区分测量得分与模型给出的解释。'],
  kimi25: [
    'You need three independent fact checks. Each takes ten minutes and a final review takes two. With three assistants working in parallel, what is the ideal elapsed time?|三项独立核查各需 10 分钟，最后汇总需 2 分钟。三位助手并行工作，理想情况下总耗时多少？',
    ['32 min|32 分钟','12 min|12 分钟','2 min|2 分钟'],1,'Start all three checks at the same moment, then wait for the review.|三项检查同时开始，然后等待汇总。',
    'The longest parallel branch takes ten minutes, followed by two minutes of review. Total work is still 32 person-minutes. Real coordination adds overhead.|最长的并行分支用时 10 分钟，再汇总 2 分钟。总工作量仍为 32 人分钟，实际协调还会增加开销。',
    5,'Figure 3. Find the coordinating agent and the subtasks. Which branches could run concurrently?|图 3。找到协调者和子任务，辨认哪些分支可以同时执行。'],
  glm5: [
    'Two language models are compared on eight different tasks. Model A leads on code, B leads on long documents. You need to review 100-page manuals. Which result should you inspect first?|两个模型在八种任务上接受比较。A 的编程成绩更好，B 的长文档成绩更好。你要审查百页手册，应先看哪项结果？',
    ['The model name|模型名称','The code score|编程分数','The long-document evaluation|长文档评测'],2,
    'Match the test to the work you expect the model to do.|把评测任务与你的实际工作对应起来。',
    'Start with long-document performance, then test on real manuals. GLM-5’s report compares architectural choices across several measures, so a single number gives an incomplete picture.|先看长文档成绩，再用真实手册测试。GLM-5 报告用多项指标比较架构方案，单个数字只反映其中一个方面。',
    5,'In Table 3, compare SQuAD-128k and HotpotQA-128k. Does the same model lead on both long-context tests? The manual example is illustrative.|在表 3 对比 SQuAD-128k 和 HotpotQA-128k。两项长上下文测试都是同一个模型领先吗？手册情境是教学示例。'],
  engram: [
    'A frequently repeated phrase has a stored representation. If you can look it up by a short key, which operation can you avoid repeating from scratch?|一个常见短语已经有存好的表示。如果用短键即可查到，可以省去反复执行哪类工作？',
    ['Reconstructing the same familiar pattern|重新构造同一个常见模式','All reasoning on the current question|当前问题的全部推理','Reading the current input|读取当前输入'],0,
    'If two occurrences map to the same table entry, what information can they reuse?|同一串词元两次指向同一个表项时，哪部分信息可以复用？',
    'Lookup can supply a reusable representation for a familiar pattern. The model still combines it with the surrounding context. Engram explores conditional memory alongside neural computation.|查表可以为熟悉的模式提供可复用的表示。模型仍需结合上下文处理。Engram 探索在神经网络计算旁引入条件记忆。',
    1,'Find “lookup” in the abstract. Identify the kind of pattern the authors propose retrieving.|在摘要中找到 lookup，辨认作者提议检索哪类模式。'],
  attnres: [
    'Three earlier processing layers report signals of 2, 6 and 10. The current layer gives them weights 0.25, 0.50 and 0.25. What is the weighted sum?|模型较早的三层分别输出 2、6、10，当前层给它们的权重分别是 0.25、0.50、0.25。加权和是多少？',
    ['18','6','9'],1,'Multiply each earlier signal by its weight.|把每个较早的信号乘以它的权重。',
    '0.25 × 2 + 0.5 × 6 + 0.25 × 10 = 6. Here attention chooses among earlier layers. The three numbers come from different layers at the same token position.|0.25 × 2 + 0.5 × 6 + 0.25 × 10 = 6。这里是在各层之间分配注意力，三个数来自同一词元位置在不同层的输出。',
    4,'In Section 3.1, find the weighted combination of previous layer outputs. Identify what its index runs over.|在第 3.1 节找到此前各层输出的加权组合，确认求和下标遍历什么。']
};

export const readingClues = {
  gemini4neon:'Context window means the total token space available. Synchronous here means the client waits for a response in the same request.|上下文窗口指可用的词元总空间。这里的同步是指客户端在这次请求中等待回答。',
  claudefable52:'The harness runs the evaluation. Hidden tests check the submitted program’s behavior with cases the model cannot inspect beforehand.|测试框架负责运行评测。隐藏测试用模型事先看不到的用例检查所提交程序的行为。',
  gpt62:'Selection bias arises when the rule for choosing cases makes the sample differ systematically from the wider population.|当选取规则使样本与总体系统性不同时，就会产生选择偏差。',
  transformer:'SoftMax turns scores into weights that add to one. MatMul means matrix multiplication. Here it combines the values using those weights.|SoftMax 把分数转为总和为 1 的权重。MatMul 是矩阵乘法，在这里按权重组合各个值。',
  bert:'A mask is a placeholder that hides a piece of text during training. The surrounding words supply clues to what belongs there.|掩码是在训练时遮住一小段文本的占位符。周围的词为还原原文提供线索。',
  scaling:'Loss measures prediction error. Lower values mean the model assigned higher probability to the observed text on average.|损失衡量预测误差。损失越低，表示模型平均而言给实际出现的文本赋予了更高概率。',
  gpt3:'A gradient update changes model weights during training. Giving examples inside a prompt changes what the model reads for one request.|梯度更新会在训练时改变模型权重。在提示里提供示例，改变的是模型在这次请求中读到的内容。',
  rag:'The retriever selects documents. The generator writes an answer while reading the question and the selected text.|检索器选择文档。生成器一边读取问题和选中的文字，一边写出回答。',
  lora:'Rank limits how many independent directions the correction can express. A small rank needs fewer trainable entries.|秩限制修正量能表达多少个独立方向。较小的秩需要训练的元素更少。',
  switch:'A token is one piece of input. The router scores candidate experts and directs that piece to a selected expert.|词元是一小段输入。路由器给候选专家打分，把这段输入送往选定的专家。',
  instruct:'A reward model learns to score responses from examples of human preferences. The score can then guide training.|奖励模型根据人类偏好示例学习给回答打分，这个分数随后可以指导训练。',
  flash:'HBM is the GPU’s large main memory. SRAM in the diagram is a smaller, faster memory on the processor.|HBM 是 GPU 容量较大的主存。图中的 SRAM 是芯片上容量较小、速度更快的存储。',
  cot:'In this paper a chain of thought is a written sequence of intermediate steps in a worked example or answer.|这篇论文中，思维链指示例或答案中写出来的一串中间推理步骤。',
  chinchilla:'A training token is a piece of text the model processes during training. The token count describes how much text it processes.|训练词元是模型在训练时处理的一小段文本。词元总数表示处理了多少文本。',
  react:'Action names something the system does, such as searching. Observation contains the information returned by that action.|Action 是系统执行的操作，例如搜索。Observation 是该操作返回的信息。',
  speculative:'The draft model proposes a short continuation quickly. The target model checks the proposals in one pass.|草稿模型快速提出一小段续文，目标模型用一次前向计算检查这些候选内容。',
  vllm:'Logical block order follows the text. Physical block addresses tell the system where the data sits in memory.|逻辑块顺序跟随文本顺序。物理块地址告诉系统数据实际存放在内存的哪里。',
  qlora:'Quantization uses a small set of representable values to store weights. A 4-bit code has 16 possible patterns.|量化用有限个可表示值存储权重。4 位编码有 16 种可能的位模式。',
  dpo:'A policy is the model’s distribution over possible answers. A reference policy is a fixed comparison point during training.|策略是模型对可能回答给出的概率分布。参考策略是在训练时用来比较的固定基准。',
  gqa:'A query describes what to look for. Keys help find relevant positions. Values supply the information combined at the output.|查询描述要找什么，键用于匹配相关位置，值提供最终要组合的信息。',
  mamba:'State is a compact record passed from one position to the next. An update changes which information the record carries forward.|状态是从一个位置传给下一个位置的紧凑记录。更新会改变这份记录继续保留的信息。',
  deepseekv3:'Parameters are learned numerical settings. An active parameter is one used in the computation for the current token.|参数是学到的数值设置。激活参数是计算当前词元时实际用到的参数。',
  deepseekr1:'AIME is a mathematics competition. Here its problems supply a test with checkable numerical answers.|AIME 是一项数学竞赛。这里用它的题目评估模型，数值答案可以核查。',
  engram:'A lookup uses an input-derived key to fetch a stored entry. The retrieved entry can then be combined with the surrounding text’s representation.|查表使用根据输入得到的键读取已存条目，再把它与上下文的表示结合。',
  kimi25:'An orchestrator divides the work, assigns subtasks and combines results. Elapsed time depends on which subtasks must wait for others.|协调者拆分工作、分配子任务并汇总。总耗时取决于哪些子任务必须等待其他任务。',
  glm5:'128k refers to the approximate input length in tokens. The column names identify different tasks tested at that length.|128k 指输入长度约为 12.8 万个词元。不同列名表示在该长度下测试的不同任务。',
  attnres:'Depth counts the layers a signal passes through. This paper lets a later layer choose how much to draw from earlier layers.|深度表示信号经过的层数。这篇论文允许后面的层选择从各个较早的层吸收多少信息。'
};
