import * as types from '../../actions/types';

const INITIAL_STATE = {
  cards: undefined,
  number_of_cards_selected: 0,
  decks_selected: new Set(),
  mastered_cards_included: false,
  number_of_eligible_cards: undefined,
  eligible_cards: undefined,
};

export default (state=INITIAL_STATE, action) => {
  const reduced_state = reduce_state(state, action);
  const eligible_cards = get_eligible_cards(reduced_state);
  const number_of_eligible_cards = eligible_cards && eligible_cards.length;
  let {number_of_cards_selected} = reduced_state;
  if (
    reduced_state.number_of_cards_selected === 0 &&
    number_of_eligible_cards > 0
  ) {
    // eslint-disable-next-line fp/no-mutation
    number_of_cards_selected = number_of_eligible_cards;
  } else if (number_of_eligible_cards !== undefined) {
    // eslint-disable-next-line fp/no-mutation
    number_of_cards_selected = Math.min(reduced_state.number_of_cards_selected, number_of_eligible_cards);
  }
  return {
    ...reduced_state,
    eligible_cards,
    number_of_eligible_cards,
    number_of_cards_selected,
  };
};

const reduce_state = (state=INITIAL_STATE, action) => {
  switch (action.type) {
  case types.CARDS_LOADED:
    return {...state, cards: action.payload};
  case types.DECKS_LOADED:
    return {...state, decks_selected: new Set(action.payload.map((deck) => deck.id))};
  case types.NUMBER_OF_CARDS_FOR_QUICK_STUDY_CHANGED:
    return {...state, number_of_cards_selected: action.payload};
  case types.MASTERED_CARDS_INCLUDED_FOR_QUICK_STUDY_TOGGLED:
    return {...state, mastered_cards_included: !state.mastered_cards_included};
  case types.DECK_SELECTED_FOR_QUICK_STUDY:
    const set_with_added_deck = new Set(state.decks_selected);
    set_with_added_deck.add(action.payload);
    return {...state, decks_selected: set_with_added_deck};
  case types.DECK_UNSELECTED_FOR_QUICK_STUDY:
    const set_without_removed_deck = new Set(state.decks_selected);
    set_without_removed_deck.delete(action.payload);
    return {...state, decks_selected: set_without_removed_deck};
  default:
    return state;
  }
};

const get_eligible_cards = (state) => state.cards &&
  state.cards.filter((card) => {
    if (state.decks_selected.has(card.deck.id)) {
      if ((state.mastered_cards_included && card.mastered) || !card.mastered) {
        return true;
      }
    }
    return false;
  });


