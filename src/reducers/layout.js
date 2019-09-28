import * as types from '../actions/types';

const INITIAL_STATE = {
  drawer_opened: false,
};

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
  case types.TOGGLE_DRAWER:
    return {...state, drawer_opened: !state.drawer_opened};
  default:
    return state;
  }
};
