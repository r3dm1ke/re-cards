import * as types from '../actions/types';
import {A_TEXT} from '../const/cards';

const INITIAL_STATE = {
  study_cards: [],
  study_status: 'idle',
  study_index: 0,
  study_score: 0,
  study_length: 0,
  study_mode: '',
  study_validation_value: null,
  study_is_confirmed: false,
  study_is_correct: false,
};

const shuffle = (a) => {
  // eslint-disable-next-line fp/no-loops,fp/no-mutation
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line fp/no-mutation
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// eslint-disable-next-line complexity,max-lines-per-function
export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
  case types.CARDS_FOR_STUDY_LOADED:
    return {...state, study_cards: shuffle(action.payload)};
  case types.START_STUDY:
    return {
      ...state,
      study_status: 'running',
      study_index: 0,
      study_score: 0,
      study_length: state.study_cards.length,
      study_is_confirmed: false,
      study_is_correct: false,
      study_validation_value: state.study_cards[0].answer_type === A_TEXT ?
        '' : new Set(),
    };
  case types.STUDY_INCREMENT_SCORE:
    return {
      ...state,
      study_score: state.study_score + 1,
    };
  case types.STUDY_INCREMENT_INDEX:
    return {
      ...state,
      study_index: state.study_index + 1,
      study_is_confirmed: false,
      study_is_correct: false,
      study_validation_value:
        state.study_cards[state.study_index + 1] ?
          (state.study_cards[state.study_index + 1].answer_type === A_TEXT ?
            '' : new Set()) :
          null,
    };
  case types.STUDY_FINISHED:
    return {
      ...state,
      study_status: 'idle',
      study_mode: '',
    };
  case types.STUDY_SHOW_RESULTS:
    return {
      ...state,
      study_status: 'results',
    };
  case types.SET_STUDY_MODE:
    return {
      ...state,
      study_mode: action.payload,
    };
  case types.STUDY_VALIDATION_VALUE_CHANGED:
    return {
      ...state,
      study_validation_value: action.payload,
    };
  case types.STUDY_VALIDATION_CONFIRMED_CHANGED:
    return {
      ...state,
      study_is_confirmed: action.payload,
    };
  case types.STUDY_IS_CORRECT_CHANGED:
    return {
      ...state,
      study_is_correct: action.payload,
    };
  default:
    return state;
  }
};
