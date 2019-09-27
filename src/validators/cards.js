import {Q_MATH, Q_TEXT} from '../const/cards';

export const validate_card = async (card) => {
  const errors = {};
  if (!validate_question(card)) {
    // eslint-disable-next-line fp/no-mutation
    errors['question'] = 'Question cannot be empty';
  }
  if (!validate_question_type(card)) {
    // eslint-disable-next-line fp/no-mutation
    errors['question_type'] = 'Please select a question type';
  }

  return errors;
};

export const validate_question = (card) => card.question !== '';
export const validate_question_type = (card) =>
  card.question_type === Q_TEXT || card.question_type === Q_MATH;
