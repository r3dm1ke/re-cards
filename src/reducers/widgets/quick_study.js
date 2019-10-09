import * as types from '../../actions/types';

const INITIAL_STATE = {
  number_of_cards: 1,
};

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
  case types.NUMBER_OF_CARDS_FOR_QUICK_STUDY_CHANGED:
    return {...state, number_of_cards: action.payload};
  default:
    return state;
  }
};

