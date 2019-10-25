import * as types from './types';
import {push} from 'connected-react-router';
import {add_loader, remove_loader, show_alert} from './mics';
import {SIMPLE_STUDY, SMART_STUDY} from '../const/study';
import {A_MULTIPLE_CHOICE, A_TEXT} from '../const/cards';
import {error_happened} from './errors';
import {register_answer as register_answer_to_db} from '../utils/database_actions/answers';
import {save_progress} from '../utils/database_actions/progress';
import study from '../reducers/study';
import {sleep} from '../utils/system';

export const set_study_mode = (study_mode) => ({
  type: types.SET_STUDY_MODE,
  payload: study_mode,
});

export const start_study = (type=undefined) => async (dispatch, getState) => {
  dispatch(add_loader('ss', 'Preparing your study session...'));
  const state = getState();
  const study_mode = type !== undefined ? type : state.study.study_mode;
  dispatch(set_study_mode(study_mode));
  const cards_for_session = load_cards_for_study(study_mode, state);
  if (cards_for_session.length === 0) {
    dispatch(show_alert(
      'You are done for today',
      'You have no cards left to study today. Come back tomorrow or try any other study modes.'
    ));
    dispatch(remove_loader('ss'));
    return;
  }
  dispatch(cards_for_study_loaded(cards_for_session));
  dispatch({type: types.START_STUDY});
  dispatch(push('/study'));
  dispatch(remove_loader('ss'));
};

const load_cards_for_study = (study_mode, state) => {
  if (study_mode === SIMPLE_STUDY) {
    return state.study.cards_for_simple_study;
  } else if (study_mode === SMART_STUDY) {
    return state.cards.cards_due_for_smart_study;
  }
};

const cards_for_study_loaded = (cards) => ({
  type: types.CARDS_FOR_STUDY_LOADED,
  payload: cards,
});

export const cards_for_simple_study_loaded = (cards) => ({
  type: types.CARDS_FOR_SIMPLE_STUDY_LOADED,
  payload: cards,
});

const check_answer = (card, validation_value) => {
  if (card.answer_type === A_TEXT) {
    return check_answer_for_text(card.answer, validation_value);
  } else if (card.answer_type === A_MULTIPLE_CHOICE) {
    return check_answer_for_multiple_choice(card.answer, validation_value);
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
  const card = study_cards[study_index];
  if (card.validation_required) {
    const is_correct = check_answer(study_cards[study_index], study_validation_value);
    dispatch(is_correct_changed(is_correct));
  }
  dispatch(is_confirmed_changed(true));
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
  register_answer_to_db(
    study_cards[study_index],
    study_is_correct,
    study_mode === SMART_STUDY,
  )
    .then(() => {})
    .catch((e) => {
      dispatch(error_happened('Error saving your answer to server. He is probably depressed.'));
      console.log(e);
    });

  if (study_is_correct) {
    dispatch({type: types.STUDY_INCREMENT_SCORE});
  }
  if (study_index === study_length - 1) {
    dispatch({type: types.STUDY_SHOW_RESULTS});
  }
  dispatch({type: types.STUDY_INCREMENT_INDEX});
};

export const study_teardown = () => async (dispatch, getState) => {
  const state = getState();
  await save_progress(state)
    .then(() => {})
    .catch(() => dispatch(error_happened('Could not save progress. Something is definitely wrong.')));
  dispatch({type: types.STUDY_FINISHED});
  dispatch(push('/dashboard'));
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
