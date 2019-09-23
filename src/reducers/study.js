import * as types from '../actions/types';

const INITIAL_STATE = {
  study_cards: [],
  study_status: 'idle',
  study_index: 0,
  study_score: 0,
  study_length: 0,
  study_mode: '',
};

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

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
  default:
    return state;
  }
};
