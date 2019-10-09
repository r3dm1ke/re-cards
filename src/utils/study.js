import firebase, {firestore} from '../firebase';
import {get_uid} from './auth';
import {SPACED_REPETITION_MAPPING} from '../const/study';

const increment_total = (card_data) => ({
  ...card_data,
  total: card_data.total ? card_data.total + 1 : 1,
});

const increment_score = (card_data) => ({
  ...card_data,
  score: card_data.score ? card_data.score + 1 : 1,
});

const advance_spaced_repetition_deck = (card_data) => ({
  ...card_data,
  s_r_deck: card_data.s_r_deck && card_data.s_r_deck in SPACED_REPETITION_MAPPING ?
    SPACED_REPETITION_MAPPING[card_data.s_r_deck] : 1,
});

const reset_spaced_repetition_deck = (card_data) => ({
  ...card_data,
  s_r_deck: 1,
});

const recalculate_ratio = (card_data) => ({
  ...card_data,
  ratio: card_data.total && card_data.score ?
    Math.round((card_data.score / card_data.total) * 100) :
    0,
});

const check_mastery = (card_data) => ({
  ...card_data,
  mastery: card_data.s_r_deck === 14,
});

const set_last_studied_time = (card_data) => ({
  ...card_data,
  last_studied: firebase.firestore.Timestamp.now(),
});

const sanitize_for_db = (card_data) => ({
  answer: card_data.answer,
  answer_list: card_data.answer_list,
  answer_type: card_data.answer_type,
  deck: card_data.deck,
  last_studied: card_data.last_studied,
  mastered: card_data.mastered,
  ratio: card_data.ratio,
  s_r_deck: card_data.s_r_deck,
  score: card_data.score,
  total: card_data.total,
  uid: card_data.uid,
  validation_required: card_data.validation_required,
});

const do_nothing = (card_data) => card_data;

// eslint-disable-next-line complexity
export const register_answer = async (card, answer, smart) => {
  const card_ref = firestore.collection('cards').doc(card.id);
  const new_card_data = card |>
    increment_total |>
    (answer ? increment_score : do_nothing) |>
    recalculate_ratio |>
    (answer && smart ? advance_spaced_repetition_deck : do_nothing) |>
    (!answer && smart ? reset_spaced_repetition_deck : do_nothing) |>
    check_mastery |>
    set_last_studied_time |>
    sanitize_for_db;

  await card_ref.update(new_card_data);
};
