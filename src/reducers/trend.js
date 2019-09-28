import * as types from '../actions/types';

const INITIAL_STATE = {
  entries: [],
};

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
  case types.TRENDS_LOADED:
    return {...state, entries: action.payload};
  default:
    return state;
  }
};
