// QUESTION TYPES
export const Q_TEXT = 'q_text';
export const Q_MATH = 'q_math';
export const Q_TYPES = [
  {value: Q_TEXT, label: 'Text'},
  {value: Q_MATH, label: 'Math equation (MathJax)'}
];

// ANSWER TYPES
export const A_TEXT = 'a_text';
export const A_SINGLE_CHOICE = 'a_single_choice';
export const A_MULTIPLE_CHOICE = 'a_multiple_choice';
export const A_TYPES = [
  {value: A_TEXT, label: 'Text'},
  {value: A_SINGLE_CHOICE, label: 'Multiple choice (pick one)'},
  {value: A_MULTIPLE_CHOICE, label: 'Multiple choice (all that applicable)'}
];

// SORT PROPS
export const SORT_PROPS = [
  {value: 'question', label: 'Question'},
  {value: 'score', label: 'Score'}
];