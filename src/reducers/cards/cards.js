import * as types from '../../actions/types';

const INITIAL_STATE = {
  cards: undefined,
  decks: undefined,
  filtered_cards: undefined,
  selected_deck: 'all',
  search_term: '',
  sort_prop: 'question',
  refresh_helper: false,
  sort_direction: true, // TRUE for desc, FALSE for asc
  mastered_cards: 0,
  cards_due_for_smart_study: [],
  total_cards: 0,
  smart_study_advisable: false,
};

const count_mastered_cards = (cards) => cards.filter((card) => card.mastered).length;
const count_cards_due_for_smart_study = (cards) =>
  cards.filter((card) => card.eligible_for_smart_study);

// eslint-disable-next-line complexity
export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
  case types.CARDS_LOADED:
    const cards_due_for_smart_study = count_cards_due_for_smart_study(action.payload);
    return {
      ...state,
      cards: action.payload,
      filtered_cards: filter_cards({...state, cards: action.payload}),
      mastered_cards: count_mastered_cards(action.payload),
      total_cards: action.payload.length,
      cards_due_for_smart_study,
      smart_study_advisable: cards_due_for_smart_study.length > 0,
    };
  case types.DECK_SELECTED:
    return {
      ...state,
      selected_deck: action.payload,
      filtered_cards: filter_cards({...state, selected_deck: action.payload}),
    };
  case types.DECKS_LOADED:
    return {...state, decks: action.payload};
  case types.CARDS_SEARCH_TERM_UPDATED:
    return {
      ...state,
      search_term: action.payload,
      filtered_cards: filter_cards({...state, search_term: action.payload}),
    };
  case types.CARDS_SORT_PROP_CHANGED:
    return {
      ...state,
      refresh_helper: !state.refresh_helper,
      sort_prop: action.payload,
      filtered_cards: filter_cards({...state, sort_prop: action.payload}),
    };
  case types.CARDS_SORT_DIRECTION_TOGGLED:
    return {
      ...state,
      refresh_helper: !state.refresh_helper,
      sort_direction: !state.sort_direction,
      filtered_cards: filter_cards({...state, sort_direction: !state.sort_direction}),
    };
  default:
    return state;
  }
};

const filter_cards = (state) => {
  let filtered = state.cards;
  if (state.selected_deck !== 'all') {
    // eslint-disable-next-line fp/no-mutation
    filtered = filtered.filter((card) => card.deck.id === state.selected_deck);
  }

  if (state.search_term !== '') {
    // eslint-disable-next-line fp/no-mutation
    filtered = filtered.filter((card) =>
      card.question
        .toLowerCase()
        .includes(state.search_term.toLowerCase()) ||
      card.answer
        .toLowerCase()
        .includes(state.search_term.toLowerCase()));
  }

  // eslint-disable-next-line fp/no-mutating-methods
  filtered.sort((card1, card2) => card1[state.sort_prop] > card2[state.sort_prop] ? -1 : 1);

  // eslint-disable-next-line fp/no-mutating-methods
  if (state.sort_direction) filtered.reverse();

  return filtered;
};
