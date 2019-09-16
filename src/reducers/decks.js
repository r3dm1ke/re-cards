import * as types from '../actions/types';

const INITIAL_STATE = {
  decks: [],
  filtered_decks: [],
  new_deck_name: '',
  new_deck_dialog_opened: false,
  new_deck_dialog_error: '',
  edit_deck_id: '',
  edit_deck_dialog_opened: false,
  edit_deck_dialog_name: '',
  edit_deck_dialog_error: '',
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
        refresh_helper: !state.refresh_helper
      };
    case types.TOGGLE_NEW_DECK_DIALOG:
      return {...state, new_deck_dialog_opened: !state.new_deck_dialog_opened};
    case types.NEW_DECK_NAME_CHANGED:
      return {...state, new_deck_name: action.payload};
    case types.NEW_DECK_DIALOG_ERROR:
      return {...state, new_deck_dialog_error: action.payload};
    case types.TOGGLE_EDIT_DECK_DIALOG:
      return {...state, edit_deck_dialog_opened: !state.edit_deck_dialog_opened};
    case types.SET_EDIT_DECK_ID:
      return {...state, edit_deck_id: action.payload};
    case types.EDIT_DECK_NAME_CHANGED:
      return {...state, edit_deck_dialog_name: action.payload};
    case types.EDIT_DECK_DIALOG_ERROR:
      return {...state, edit_deck_dialog_error: action.payload};
    case types.DECKS_SEARCH_TERM_UPDATED:
      return {
        ...state,
        search_term: action.payload,
        filtered_decks: filter_decks({...state, search_term: action.payload}),
        refresh_helper: !state.refresh_helper
      };
    case types.DECKS_SORT_PROP_CHANGED:
      return {
        ...state,
        sort_prop: action.payload,
        filtered_decks: filter_decks({...state, sort_prop: action.payload}),
        refresh_helper: !state.refresh_helper
      };
    case types.DECKS_SORT_DIRECTION_TOGGLED:
      return {
        ...state,
        sort_direction: !state.sort_direction,
        filtered_decks: filter_decks({...state, sort_direction: !state.sort_direction}),
        refresh_helper: !state.refresh_helper
      };
    default:
      return state;
  }
}

const filter_decks = state => {
  let filtered = state.decks;

  filtered = filtered.filter(deck =>
    deck.name
      .toLowerCase()
      .includes(state.search_term.toLowerCase())
  );

  filtered.sort((d1, d2) => d1[state.sort_prop] > d2[state.sort_prop] ? -1 : 1);

  if (state.sort_direction) filtered.reverse();

  return filtered;
};