import * as types from '../actions/types';

const INITIAL_STATE = {
  simple_study_decks: [],
  refresh_helper: false
};

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SIMPLE_STUDY_DECK_SELECTED:
      const [deck, status] = action.payload;
      const {simple_study_decks} = state;
      const index = simple_study_decks.indexOf(deck);
      if (status && index === -1) {
        simple_study_decks.push(deck);
      } else if (!status && index > -1) {
        simple_study_decks.splice(simple_study_decks.indexOf(deck), 1);
      }
      return {...state, simple_study_decks, refresh_helper: !state.refresh_helper};
    default:
      return state;
  }
}