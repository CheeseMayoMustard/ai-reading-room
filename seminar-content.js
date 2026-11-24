import {talks} from './seminar-notes.js?v=paperstudio1';
export const special = {
  ai: [
    ['Who wrote the inspection rule?', 'Picture a camera above an ore conveyor. You program it to flag any rock whose bright patch exceeds a fixed area. You chose the measurement and its cutoff. This rule-based vision system illustrates one way to tackle an AI task.'],
    ['What if you let examples set the rule?', 'Keep the camera and the same inspection task. Now label photographs “defect” or “acceptable”. Measure brightness and texture, then fit a decision tree to those measurements. The examples determine its splits. That puts the classifier inside machine learning.'],
    ['What if the system learns the features too?', 'Give a multilayer neural network the pixels and the labels. Training adjusts its layers so they can build useful features for the inspection. This is deep learning. Place it inside machine learning because its settings were learned from examples.']
  ],
  llm: [
    ['How might this instruction continue?', 'Read “Tighten the …” and pause. “Bolt” and “nut” both sound plausible. A language model represents that uncertainty as scores over tokens. For this demonstration, imagine just three candidate tokens.'],
    ['How does a score turn into a word?', 'For this toy example, suppose the probabilities are 60% for “bolt”, 30% for “nut”, and 10% for “cap”. A sampling rule can choose any of them. Follow one possible draw in which “bolt” is selected.'],
    ['Why does the next prediction change?', 'Append the selected token. The input now reads “Tighten the bolt”. The same model runs again with this longer context. A new set of continuations, such as “until” or “to”, becomes plausible. Repeating this operation produces a passage.']
  ]
};

export function talkSlides(term) {return special[term.id] || [[talks[term.id][0], talks[term.id][1]], ['The definition behind the example', term.definition]];}
