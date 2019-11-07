import * as types from '../actions/types';

const INITIAL_STATE = {
  new_deck_name: '',
};

const reducer = (state=INITIAL_STATE, {type, payload}) => {
  switch (type) {
  case types.ONBOARDING_DECK_NAME_CHANGED:
    return {...state, new_deck_name: payload};
  default:
    return state;
  }
};

export default reducer;
