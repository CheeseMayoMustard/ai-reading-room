import {talks} from './seminar-notes.js?v=readingedit1';

export const special = {
  ai: [
    ['Who sets the inspection rule?', 'A camera photographs each rock on a conveyor. An engineer writes a rule: flag a rock if a bright patch covers more than a certain area. A reflection can trigger the alarm, too. To change the rule, the engineer has to edit it.'],
    ['What changes when you train on labeled photos?', 'Keep the camera. For each photo, record brightness and texture, and have an inspector label the rock as defective or acceptable. A decision tree uses these examples to learn which measurements and cutoffs best separate the two labels. This is machine learning.'],
    ['What does the neural network learn?', 'Now give a multilayer neural network the labeled photos themselves. During training, it learns which patterns in the pixels help distinguish a defect from a reflection. Learning those features across several layers makes this a deep-learning approach to the same task.']
  ],
  llm: [
    ['How might this instruction continue?', 'Read “Tighten the …”. Both “bolt” and “nut” could come next. A text-generating model scores possible next tokens from the words already present. For this example, we use three whole words as tokens.'],
    ['Does the most likely token always come next?', 'Suppose the probabilities are 60% for “bolt”, 30% for “nut”, and 10% for “cap”. If the model samples from that distribution, all three are possible. In the animation, this particular draw selects “bolt”.'],
    ['Why does the next prediction change?', 'The input now reads “Tighten the bolt”. With “bolt” added, words such as “until” or “to” become plausible. The model scores the next token using this longer input. Repeating the same operation extends the instruction.']
  ]
};

export function talkSlides(term) {
  return special[term.id] || [
    [talks[term.id][0], talks[term.id][1]],
    ['The definition behind the example', term.definition]
  ];
}
