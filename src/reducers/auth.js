import * as types from '../actions/types';

const INITIAL_STATE = {
  username: '',
  user: null,
  logged_in: false,
  app_initialized: false,
};

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
  case types.LOGGED_IN:
    return {...state, user: action.payload, username: action.payload.email, logged_in: true};
  case types.LOGGED_OUT:
    return {...state, user: null, username: '', logged_in: false};
  case types.APP_INITIALIZED:
    return {...state, app_initialized: true};
  default:
    return state;
  }
};
