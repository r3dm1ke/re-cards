import * as types from '../actions/types';

const INITIAL_STATE = {
  username: '',
  user: null,
  logged_in: false
};

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOGGED_IN:
      return {...state, user: action.payload, username: action.payload.email, logged_in: true};
    default:
      return state
  }
}