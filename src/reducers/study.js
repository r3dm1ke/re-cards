import * as types from '../actions/types';

const INITIAL_STATE = {
  simple_study_cards: [],
  simple_study_status: 'idle',
  simple_study_index: 0,
  simple_study_score: 0,
  simple_study_length: 0,
  smart_study_cards: [],
  smart_study_status: 'idle',
  smart_study_index: 0,
  smart_study_score: 0,
  smart_study_length: 0,
  study_mode: '',
};

const shuffle = a => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CARDS_FOR_SIMPLE_STUDY_LOADED:
      return {...state, simple_study_cards: shuffle(action.payload)};
    case types.START_SIMPLE_STUDY:
      return {
        ...state,
        simple_study_status: 'running',
        simple_study_index: 0,
        simple_study_score: 0,
        study_mode: 'simple',
        simple_study_length: state.simple_study_cards.length
      };
    case types.SIMPLE_STUDY_INCREMENT_SCORE:
      return {
        ...state,
        simple_study_score: state.simple_study_score + 1
      };
    case types.SIMPLE_STUDY_INCREMENT_INDEX:
      return {
        ...state,
        simple_study_index: state.simple_study_index + 1
      };
    case types.SIMPLE_STUDY_FINISHED:
      return {
        ...state,
        simple_study_status: 'idle',
        study_mode: ''
      };
    case types.SIMPLE_STUDY_SHOW_RESULTS:
      return {
        ...state,
        simple_study_status: 'results'
      };
    case types.CARDS_FOR_SMART_STUDY_LOADED:
      return {
        ...state,
        smart_study_cards: action.payload
      };
    case types.START_SMART_STUDY:
      return {
        ...state,
        study_mode: 'smart',
        smart_study_status: 'running',
        smart_study_index: 0,
        smart_study_score: 0,
        smart_study_length: state.smart_study_cards.length
      };
    case types.SMART_STUDY_INCREMENT_INDEX:
      return {
        ...state,
        smart_study_index: state.smart_study_index + 1
      };
    case types.SMART_STUDY_INCREMENT_SCORE:
      return {
        ...state,
        smart_study_score: state.smart_study_score + 1
      };
    case types.SMART_STUDY_FINISHED:
      return {
        ...state,
        smart_study_status: 'idle',
        study_mode: ''
      };
    case types.SMART_STUDY_SHOW_RESULTS:
      return {
        ...state,
        smart_study_status: 'results'
      };
    default:
      return state;
  }
};