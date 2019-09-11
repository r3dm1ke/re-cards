import * as types from '../actions/types';

const INITIAL_STATE = {
  worst_cards: []
};


export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case types.WORST_CARDS_LOADED:
      return {...state, worst_cards: action.payload};
    default:
      return state;
  }
};