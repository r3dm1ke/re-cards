import * as types from '../actions/types';

const INITIAL_STATE = {
  progress: undefined,
  last_progress: undefined,
};

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
  case types.PROGRESS_LOADED:
    return {
      ...state,
      progress: action.payload,
      last_progress: action.payload[action.payload.length - 1],
    };
  default:
    return state;
  }
};
