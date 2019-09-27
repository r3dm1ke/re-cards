import * as types from './types';
import {push} from 'connected-react-router';
import {functions} from '../firebase';
import {add_loader, remove_loader, show_alert} from './mics';
import {SIMPLE_STUDY, SMART_STUDY} from '../const/study';
import {A_MULTIPLE_CHOICE, A_SINGLE_CHOICE, A_TEXT} from '../const/cards';

export const set_study_mode = (study_mode) => ({
  type: types.SET_STUDY_MODE,
  payload: study_mode,
});

export const start_study = (type=undefined) => async (dispatch, getState) => {
  dispatch(add_loader('ss', 'Preparing your study session...'));
  const state = getState();
  const study_mode = type !== undefined ? type : state.study.study_mode;
  dispatch(set_study_mode(study_mode));
  console.log(`Bootstrapping ${study_mode}`);
  let cards_for_session;
  if (study_mode === SIMPLE_STUDY) {
    // eslint-disable-next-line fp/no-mutation
    cards_for_session = await load_cards_for_simple_study(state);
  } else if (study_mode === SMART_STUDY) {
    // eslint-disable-next-line fp/no-mutation
    cards_for_session = await load_cards_for_smart_study(state);
    if (cards_for_session.length === 0) {
      dispatch(show_alert(
        'You are done for today',
        'You have no cards left to study today. Come back tomorrow or try any other study modes.'
      ));
      dispatch(remove_loader('ss'));
      return;
    }
  }
  dispatch(cards_for_study_loaded(cards_for_session));
  dispatch({type: types.START_STUDY});
  dispatch(push('/study'));
  dispatch(remove_loader('ss'));
};

const cards_for_study_loaded = (cards) => ({
  type: types.CARDS_FOR_STUDY_LOADED,
  payload: cards,
});

const load_cards_for_simple_study = async (state) => {
  const {simple_study_decks} = state.dashboard;
  const {cards} = state.cards;
  return cards.filter((card) =>
    simple_study_decks.indexOf(card.deck.id) > -1
  );
};

const load_cards_for_smart_study = async () => {
  const get_smart_study_cards = functions.httpsCallable('get_smart_study_cards');
  return (await get_smart_study_cards()).data;
};

const check_answer = (card, validation_value) => {
  if (card.answer_type === A_TEXT) {
    return check_answer_for_text(card.answer, validation_value);
  } else if (card.answer_type === A_MULTIPLE_CHOICE || card.answer_type === A_SINGLE_CHOICE) {
    return check_answer_for_multiple_choice(card.answer_list, validation_value);
  }
};

const check_answer_for_text = (answer, validation_value) =>
  validation_value === answer;
const check_answer_for_multiple_choice = (answer_list, validation_value) => {
  let result = true;
  answer_list.forEach((answer_entry, i) => {
    // eslint-disable-next-line fp/no-mutation
    if (answer_entry.is_correct && !validation_value.has(i)) result = false;
    // eslint-disable-next-line fp/no-mutation
    else if (!answer_entry.is_correct && validation_value.has(i)) result = false;
  });
  return result;
};

export const confirm_answer = () => async (dispatch, getState) => {
  const state = getState();
  const {study_index, study_cards, study_validation_value} = state.study;
  const is_correct = check_answer(study_cards[study_index], study_validation_value);
  dispatch(is_confirmed_changed(true));
  dispatch(is_correct_changed(is_correct));
};

export const register_fail = () => async (dispatch) => {
  dispatch(is_correct_changed(false));
  dispatch(register_answer());
};

export const register_success = () => async (dispatch) => {
  dispatch(is_correct_changed(true));
  dispatch(register_answer());
};

export const register_answer = () => async (dispatch, getState) => {
  const state = getState();
  const {
    study_index,
    study_length,
    study_cards,
    study_mode,
    study_is_correct,
  } = state.study;
  const register_answer = functions.httpsCallable('register_answer');
  register_answer({
    card: study_cards[study_index],
    answer: study_is_correct,
    smart: study_mode === SMART_STUDY,
  })
    .then(() => {});

  if (study_is_correct) {
    dispatch({type: types.STUDY_INCREMENT_SCORE});
  }
  if (study_index === study_length - 1) {
    dispatch({type: types.STUDY_SHOW_RESULTS});
  }
  dispatch({type: types.STUDY_INCREMENT_INDEX});
};

export const study_teardown = () => async (dispatch, getState) => {
  dispatch({type: types.STUDY_FINISHED});
  const state = getState();
  const {simple_study_decks} = state.dashboard;
  const {study_score, study_length, study_mode} = state.study;
  const score = Math.round((study_score / study_length) * 100);
  const register_study_session = functions.httpsCallable('register_study_session');
  register_study_session({
    score,
    deck_ids: study_mode === SIMPLE_STUDY ? simple_study_decks : [],
    is_smart: study_mode === SMART_STUDY,
  })
    .then(() => {});

  dispatch(push('/dashboard'));
};

export const engage_exam_mode = () => async (dispatch) => {
  dispatch(add_loader('exam', 'Clearing your past sins...'));
  const engage = functions.httpsCallable('engage_exam_mode');
  await engage();
  dispatch(remove_loader('exam'));
};

export const validation_value_changed = (value) => ({
  type: types.STUDY_VALIDATION_VALUE_CHANGED,
  payload: value,
});

export const is_confirmed_changed = (is_confirmed) => ({
  type: types.STUDY_VALIDATION_CONFIRMED_CHANGED,
  payload: is_confirmed,
});

export const is_correct_changed = (is_correct) => ({
  type: types.STUDY_IS_CORRECT_CHANGED,
  payload: is_correct,
});
