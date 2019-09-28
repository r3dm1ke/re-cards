import * as types from '../actions/types';

const INITIAL_STATE = {
  offline: true,
};

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
  case types.IS_OFFLINE:
    return {...state, offline: true};
  case types.IS_ONLINE:
    return {...state, offline: false};
  default:
    return state;
  }
};
