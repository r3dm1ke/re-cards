import * as types from '../actions/types';

const INITIAL_STATE = {
  progress: undefined,
};

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
  case types.PROGRESS_LOADED:
    return {...state, progress: action.payload};
  default:
    return state;
  }
};
