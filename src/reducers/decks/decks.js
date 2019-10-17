import * as types from '../../actions/types';

const INITIAL_STATE = {
  decks: [],
  filtered_decks: [],
  search_term: '',
  sort_prop: 'name',
  refresh_helper: false,
  sort_direction: true, // TRUE for desc, FALSE for asc
};

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
  case types.DECKS_LOADED:
    return {
      ...state,
      decks: action.payload,
      filtered_decks: filter_decks({...state, decks: action.payload}),
      refresh_helper: !state.refresh_helper,
    };
  case types.DECKS_SEARCH_TERM_UPDATED:
    return {
      ...state,
      search_term: action.payload,
      filtered_decks: filter_decks({...state, search_term: action.payload}),
      refresh_helper: !state.refresh_helper,
    };
  case types.DECKS_SORT_PROP_CHANGED:
    return {
      ...state,
      sort_prop: action.payload,
      filtered_decks: filter_decks({...state, sort_prop: action.payload}),
      refresh_helper: !state.refresh_helper,
    };
  case types.DECKS_SORT_DIRECTION_TOGGLED:
    return {
      ...state,
      sort_direction: !state.sort_direction,
      filtered_decks: filter_decks({...state, sort_direction: !state.sort_direction}),
      refresh_helper: !state.refresh_helper,
    };
  default:
    return state;
  }
};

const filter_decks = (state) => {
  let filtered = state.decks;

  // eslint-disable-next-line fp/no-mutation
  filtered = filtered.filter((deck) =>
    deck.name
      .toLowerCase()
      .includes(state.search_term.toLowerCase())
  );

  // eslint-disable-next-line fp/no-mutating-methods
  filtered.sort((d1, d2) => d1[state.sort_prop] > d2[state.sort_prop] ? -1 : 1);

  // eslint-disable-next-line fp/no-mutating-methods
  if (state.sort_direction) filtered.reverse();

  return filtered;
};
