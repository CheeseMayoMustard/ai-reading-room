// Each check has a prompt, plausible choices, the correct index, a hint and a worked answer.
export const units = [
  {
    id: 'pieces', title: 'How a model reads text', term: 'Token',
    scene: 'Imagine sorting a message into labeled tiles. One tile might contain a word, a piece of a word, or punctuation. A tokenizer splits text into tiles and assigns each one a number.',
    example: 'In a pretend tokenizer, “unhelpful!” becomes [un] [help] [ful] [!]. The model receives four numbered pieces. A real tokenizer may split the same text differently.',
    bridge: 'A context window is the number of tokens a model can work with in one request. Instructions, examples and conversation history take up space.',
    papers: ['gpt3','cot','bert'],
    checks: [
      ['Our pretend tokenizer splits “repacking?” into [re] [pack] [ing] [?]. How many tokens is that?', ['1','3','4'], 2, 'Count each pair of brackets, including punctuation.', 'There are four pieces. A single written word plus punctuation can occupy several tokens.'],
      ['A request has room for 100 tokens total. Instructions use 20 and the document uses 65. How many are left for an answer?', ['15','35','80'], 0, 'Subtract both parts already in the request.', '100 − 20 − 65 = 15 tokens. This example assumes one shared input-and-output limit.']
    ]
  },
  {
    id: 'chance', title: 'What a prediction means', term: 'Probability',
    scene: 'Suppose a café usually hears “with milk” after “coffee.” You can use that pattern to guess the next words. The guess still needs checking against this customer’s order.',
    example: 'Imagine 10 possible draws from a bag containing 6 milk tickets, 3 cream tickets and 1 black-coffee ticket, replacing the ticket after each draw. Milk is the most likely outcome on each draw. A single draw can still give cream.',
    bridge: 'A language model assigns probabilities to possible next tokens. Choosing likely words can produce fluent sentences, including sentences that contain a factual error.',
    papers: ['gpt3','speculative','scaling'],
    checks: [
      ['A bag holds 2 red tickets and 8 blue tickets. Which statement fits a single random draw?', ['Blue is certain.','Blue is more likely.','Both colors are equally likely.'], 1, 'A possible outcome can be uncommon and still occur.', 'Blue has 8 of 10 tickets, so its probability is 80%. The two red tickets leave a 20% chance of red.'],
      ['A model confidently finishes “The delivery date is …” with “Friday.” What establishes the actual date?', ['The number of words in the reply.','How often Friday appears in its guesses.','A dated confirmation for that order.'], 2, 'Think about the difference between a likely continuation and a record of an event.', 'A confirmation tied to that order supplies evidence. A next-token probability describes the model’s prediction.']
    ]
  },
  {
    id: 'learning', title: 'How examples change a model', term: 'Training and inference',
    scene: 'You estimate delivery time from distance. After seeing past deliveries, you adjust the minutes you allow per kilometre. Later, you use that setting on a new route.',
    example: 'At 2 minutes per kilometre you predict 20 minutes for 10 km. The trip takes 30 minutes. This example gives you a reason to test a larger setting across more trips. A neural network likewise adjusts many numerical settings, called weights.',
    bridge: 'Training adjusts weights using examples. Inference uses the learned settings to answer a new request. Examples placed in a prompt can guide that request without retraining the model.',
    papers: ['bert','lora','qlora','gpt3','chinchilla','dpo','instruct','deepseekr1','glm5'],
    checks: [
      ['Which activity changes a learned setting in the delivery example?', ['Adjusting minutes per kilometre after reviewing past trips.','Using yesterday’s setting for a new route.','Printing today’s estimate.'], 0, 'Look for the step that changes future calculations.', 'Adjusting the setting changes how later estimates are made. Using the setting is prediction.'],
      ['You paste two example reports into a chat and ask for a third in the same style. Where are those examples used?', ['In a replacement computer chip.','In the current prompt.','Necessarily in a new version of the model’s weights.'], 1, 'Ask what you actually supplied to the model.', 'The examples are part of the current input. The model can follow their pattern during inference.']
    ]
  },
  {
    id: 'weights', title: 'How to give a clue more weight', term: 'Weighted average',
    scene: 'You ask two colleagues for delivery estimates. One knows the route well, so you want their estimate to count more. A weight tells you how much each estimate contributes.',
    example: 'The estimates are 10 and 20 days. Give the first a weight of 0.8 and the second 0.2. The result is 0.8 × 10 + 0.2 × 20 = 12 days. The weights add to one.',
    bridge: 'Attention uses weights to mix information from different positions in a sequence. The values are lists of numbers. The calculation above shows the mixing step with one number per position.',
    papers: ['transformer','bert','gqa','flash','attnres','mamba'],
    checks: [
      ['Two estimates are 4 and 8 hours. Give each half the weight. What is the combined estimate?', ['12 hours','6 hours','4 hours'], 1, 'Half of 4 plus half of 8.', '0.5 × 4 + 0.5 × 8 = 2 + 4 = 6 hours.'],
      ['In a toy attention calculation, two positions supply values 2 and 10. The weights are 0.75 and 0.25. What comes out?', ['8','12','4'], 2, 'Multiply each value by its own weight before adding.', '0.75 × 2 + 0.25 × 10 = 1.5 + 2.5 = 4. Moving more weight to the second position would move the result toward 10.']
    ]
  },
  {
    id: 'coordinates', title: 'How to compare things using numbers', term: 'Vector and embedding',
    scene: 'Describe a drink with two scores from 0 to 5, one for sweetness and one for sourness. The ordered pair of numbers is a vector. Keeping the order consistent lets you compare drinks.',
    example: 'Your favorite is [4, 1]. Drink A is [4, 2] and B is [1, 5]. With these two equally important features, A is closer. Real text embeddings use learned features that can be harder to name.',
    bridge: 'A search system can represent a question and document passages as vectors. It can then find similar passages and pass them to a language model as reading material.',
    papers: ['rag','bert','transformer','engram'],
    checks: [
      ['A tool is rated [price, weight] on a common 0–5 scale. Which is closer to [2, 4] on these two features?', ['[2, 3]','[5, 1]','Both are the same distance.'], 0, 'Compare changes in the first and second positions separately.', '[2, 3] differs by just one unit on one feature. [5, 1] differs by three units on both.'],
      ['A search finds two similar maintenance bulletins. One applies to a different pump model. What should you check?', ['Whether the text has the same number of tokens.','The model number, version and actual instructions.','Only the highest similarity score.'], 1, 'Similarity helps locate candidates. Applicability comes from the document.', 'Check the equipment and version before using the instructions. Two passages can discuss similar issues for different equipment.']
    ]
  },
  {
    id: 'memory', title: 'How much space do numbers take?', term: 'Bits and bytes',
    scene: 'Imagine storing one of two labels, yes or no. One binary digit, or bit, has two possible values. A byte is a group of eight bits.',
    example: 'If each of 12 numbers uses 16 bits, the numbers occupy 12 × 16 = 192 bits. Divide by 8 to get 24 bytes. Using 8 bits per number halves the raw storage in this example.',
    bridge: 'Models store billions of numerical weights. Quantization uses fewer bits to represent values. A running model also needs space for the current request and intermediate calculations.',
    papers: ['qlora','lora','vllm','flash','gqa','deepseekv3'],
    checks: [
      ['You store 20 numbers at 8 bits each. How many bytes do their values occupy?', ['160','2.5','20'], 2, 'At 8 bits per number, each number occupies one byte.', '20 × 8 ÷ 8 = 20 bytes.'],
      ['In a simplified calculation, 2 billion weights at 4 bits each occupy how many decimal GB?', ['1 GB','8 GB','2 GB'], 0, 'One decimal GB is one billion bytes.', '2 billion × 4 bits ÷ 8 = 1 billion bytes, or 1 GB of raw weights. Other storage is needed to run the model.']
    ]
  },
  {
    id: 'routing', title: 'Choosing which resources to use', term: 'Sparse computation',
    scene: 'A workshop employs eight specialists. A dispatcher sends each job to the specialist it needs. The payroll covers the whole team even when one person handles a particular job.',
    example: 'For one task, 1 of 8 specialists is active. That is one eighth of the team. The other seven remain available for other tasks. If every job goes to the same person, a queue can build up.',
    bridge: 'Some models contain several groups of weights called experts. A router chooses a subset for each token. Stored capacity and the work used for one token answer different questions.',
    papers: ['switch','deepseekv3','engram','kimi25','glm5'],
    checks: [
      ['A dispatcher chooses 2 of 10 specialists for one job. What fraction is active for that job?', ['50%','20%','80%'], 1, 'Divide the active count by the total count.', '2 ÷ 10 = 0.2, or 20%.'],
      ['A model activates one expert for each token. Almost every token goes to the same expert. What might slow the system?', ['Unused experts automatically handle that expert’s tasks.','The router removes the need for memory.','The busy expert becomes a bottleneck.'], 2, 'Think about the queues in the workshop.', 'The selected expert receives most of the work. Other experts can remain idle while tokens wait.']
    ]
  },
  {
    id: 'evidence', title: 'Finding a fact before giving an answer', term: 'Retrieval',
    scene: 'A colleague asks how many bags are in stock today. Your experience tells you where to look. The dated inventory record supplies the number.',
    example: 'Yesterday’s record says 50 bags. A later receipt adds 12 and a dispatch removes 5. If those are the only movements, the current count is 57. You can point to the three records to explain the answer.',
    bridge: 'Retrieval brings relevant records into the model’s input. The model still has to interpret the right date, unit and conditions.',
    papers: ['rag','react','engram','gpt3'],
    checks: [
      ['Which document is the best starting point for today’s stock on hand?', ['The latest reconciled inventory record.','A year-old sales brochure.','A generic description of the warehouse.'], 0, 'Consider the date and the exact question.', 'The reconciled record addresses the current quantity. Check its date and any subsequent movements.'],
      ['A model retrieves the correct invoice and reports “50 tonnes.” The invoice says “50 bags.” Which check catches the error?', ['Increasing the font size.','Matching both the value and the unit to the source.','Counting the words in the answer.'], 1, 'The digits agree. What else carries meaning?', 'The number describes different units. Inspect the unit in the original and use a documented conversion if one is needed.']
    ]
  },
  {
    id: 'actions', title: 'How software checks its work', term: 'Action and observation',
    scene: 'You ask a colleague to reserve a room. Making the request is one step. Reading the booking confirmation tells you which room and time were actually reserved.',
    example: 'Ask for Room B at 10. The booking system reports that it is occupied. You try Room C and receive a confirmation. The observation changes the next action.',
    bridge: 'An AI agent can call a tool, inspect the returned information and choose its next step. Independent tasks can run together. A decision that depends on their results must wait.',
    papers: ['react','kimi25','glm5','deepseekr1','cot'],
    checks: [
      ['A spreadsheet tool reports that a file could not be opened. What should the assistant do before reporting a total?', ['Use a plausible total.','Report the task as complete.','Resolve access or ask for the missing input.'], 2, 'Use the returned observation.', 'The file contents are still missing. Obtain the input and run the calculation before reporting a result.'],
      ['Two independent quotations must be extracted and then compared. Which work can overlap?', ['Reading the two quotations.','Final comparison before either is read.','Checking totals before quantities are available.'], 0, 'Look for tasks that do not need each other’s output.', 'The two extractions can proceed together. The comparison needs both outputs, with units and currencies reconciled.']
    ]
  },
  {
    id: 'experiments', title: 'How to tell whether a change helped', term: 'Baseline and evaluation',
    scene: 'You try a new packing technique and want to know if it saves time. The old technique gives you a baseline, a reference for comparison. Using comparable orders makes the result easier to interpret.',
    example: 'On a matched set of tasks, average time falls from 10 to 8 minutes. The saving is 2 minutes out of the original 10, or 20%. You also count damaged packages to see what happened to quality.',
    bridge: 'Papers compare methods on defined tasks. Look for the baseline, the measurement and what was held fixed. When several things change together, it is harder to tell which change caused the result.',
    papers: ['scaling','chinchilla','instruct','dpo','speculative','mamba','deepseekr1','attnres','flash','kimi25','glm5'],
    checks: [
      ['Processing time falls from 40 seconds to 30 seconds on the same job. What percentage of the original time was saved?', ['10%','25%','75%'], 1, 'Divide the 10 seconds saved by the original 40.', '10 ÷ 40 = 0.25. The job uses 25% less time.'],
      ['System B uses a new model and a better search tool. It gets a higher score than A. How could you test the model’s contribution?', ['Attribute the entire gain to the larger model.','Compare only the product names.','Test both models with the same search setup and tasks.'], 2, 'Change one thing while keeping the comparison conditions similar.', 'Matching the search tool, tasks and budgets helps isolate the change in model. Then test the search change separately.']
    ]
  }
];
