import * as types from '../../actions/types';

const INITIAL_STATE = {
  cards: undefined,
  number_of_cards: 0,
  decks_selected: new Set(),
  mastered_cards_included: false,
  number_of_eligible_cards: 0,
};

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
  case types.DECKS_LOADED:
    const ids = action.payload.map((deck) => deck.id);
    const __new_decks_selected = new Set(ids);
    const __number_of_eligible_cards =
      count_number_of_eligible_cards(state.cards, __new_decks_selected, state.mastered_cards_included);
    return {
      ...state,
      decks_selected: new Set(ids),
      number_of_eligible_cards: __number_of_eligible_cards,
      number_of_cards: __number_of_eligible_cards,
    };
  case types.CARDS_LOADED:
    const ___number_of_eligible_cards =
      count_number_of_eligible_cards(action.payload, state.decks_selected, state.mastered_cards_included);
    return {
      ...state,
      cards: action.payload,
      number_of_eligible_cards: ___number_of_eligible_cards,
      number_of_cards: ___number_of_eligible_cards,
    };
  case types.NUMBER_OF_CARDS_FOR_QUICK_STUDY_CHANGED:
    return {...state, number_of_cards: action.payload};
  case types.DECK_SELECTED_FOR_QUICK_STUDY:
    const new_decks_selected = new Set(state.decks_selected);
    new_decks_selected.add(action.payload);
    const number_of_eligible_cards =
      count_number_of_eligible_cards(state.cards, new_decks_selected, state.mastered_cards_included);
    return {
      ...state,
      decks_selected: new_decks_selected,
      number_of_eligible_cards,
      number_of_cards: number_of_eligible_cards,
    };
  case types.DECK_UNSELECTED_FOR_QUICK_STUDY:
    const _new_decks_selected = new Set(state.decks_selected);
    _new_decks_selected.delete(action.payload);
    const _number_of_eligible_cards =
      count_number_of_eligible_cards(state.cards, _new_decks_selected, state.mastered_cards_included);
    return {
      ...state,
      decks_selected: _new_decks_selected,
      number_of_eligible_cards: _number_of_eligible_cards,
      number_of_cards: _number_of_eligible_cards,
    };
  case types.MASTERED_CARDS_INCLUDED_FOR_QUICK_STUDY_TOGGLED:
    const ____number_of_eligible_cards =
      count_number_of_eligible_cards(state.cards, state.decks_selected, !state.mastered_cards_included);
    return {
      ...state,
      mastered_cards_included: !state.mastered_cards_included,
      number_of_eligible_cards: ____number_of_eligible_cards,
      number_of_cards: ____number_of_eligible_cards,
    };
  default:
    return state;
  }
};

const count_number_of_eligible_cards = (cards, decks_selected, mastered_cards_included) => {
  if (cards === undefined) return 0;
  console.dir(cards);
  return cards.filter((card) => {
    if (decks_selected.has(card.deck.id)) {
      console.log('Card failed deck');
      return false;
    }
    if (mastered_cards_included) return true;
    else if (!card.mastered) return true;
    console.log('Card failed everything');
    return false;
  });
};


