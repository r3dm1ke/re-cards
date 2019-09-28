import * as types from '../actions/types';

const INITIAL_STATE = {
  errors: [],
};

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
  case types.ERROR_HAPPENED:
    return {...state, errors: [...state.errors, action.payload]};
  case types.ERROR_DISMISSED:
    return {...state, errors: state.errors.filter((e, index) => index !== action.payload)};
  default:
    return state;
  }
};
