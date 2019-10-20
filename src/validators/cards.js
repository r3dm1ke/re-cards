import {
  A_LIST_ENTRY_MATH,
  A_LIST_ENTRY_TEXT,
  A_MULTIPLE_CHOICE,
  A_TEXT,
  Q_MATH,
  Q_TEXT,
} from '../const/cards';

export const validate_card = async (card, decks) => {
  const errors = {};
  if (!validate_question(card)) {
    // eslint-disable-next-line fp/no-mutation
    errors['question'] = 'Question cannot be empty';
  }
  if (!validate_question_type(card)) {
    // eslint-disable-next-line fp/no-mutation
    errors['question_type'] = 'Please select a question type';
  }

  if (!validate_answer_type(card)) {
    errors['answer_type'] = 'Please select an answer type';
  }

  if (card.answer_type === A_TEXT && !validate_text_answer(card)) {
    errors['answer'] = 'Answer cannot be empty';
  }

  if (card.answer_type === A_MULTIPLE_CHOICE) {
    card.answer.forEach((entry, index) => {
      if (!validate_multiple_choice_entry_type(entry)) {
        errors[`answer_list_${index}_type`] = 'Please select a type';
      }

      if (!validate_multiple_choice_entry_text(entry)) {
        errors[`answer_list_${index}_text`] = 'Cannot be empty';
      }
    });

    if (!validate_multiple_choice_at_least_one_is_correct(card.answer)) {
      errors['answer_list'] = 'Please mark at least one of the answers as correct';
    }

    if (!validate_multiple_choice_at_least_two_entries(card.answer)) {
      errors['answer_list'] = 'Please create at least 2 answers';
    }
  }

  if (!validate_deck(card, decks)) {
    errors['decks'] = 'Please select a deck';
  }

  return errors;
};

export const validate_question = (card) => card.question !== '';
export const validate_question_type = (card) =>
  card.question_type === Q_TEXT || card.question_type === Q_MATH;

export const validate_answer_type = (card) =>
  card.answer_type === A_TEXT || card.answer_type === A_MULTIPLE_CHOICE;
export const validate_text_answer = (card) =>
  card.answer !== '';
export const validate_multiple_choice_entry_type = (entry) =>
  entry.type === A_LIST_ENTRY_MATH || entry.type === A_LIST_ENTRY_TEXT;
export const validate_multiple_choice_entry_text = (entry) =>
  entry.value !== '';
export const validate_multiple_choice_at_least_one_is_correct = (entries) =>
  entries.filter((e) => e.is_correct).length !== 0;
export const validate_multiple_choice_at_least_two_entries = (entries) =>
  entries.length >= 2;

export const validate_deck = (card, decks) => {
  if (card.deck) {
    const _ = decks.filter((d) => d.id === card.deck.id);
    return _.length === 1;
  }
  return false;
};
