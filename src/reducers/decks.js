import * as types from '../actions/types';

const INITIAL_STATE = {
  decks: [],
  new_deck_name: '',
  new_deck_dialog_opened: false,
  new_deck_dialog_error: '',
  edit_deck_id: '',
  edit_deck_dialog_opened: false,
  edit_deck_dialog_name: '',
  edit_deck_dialog_error: ''
};

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case types.DECKS_LOADED:
      return {...state, decks: action.payload};
    case types.TOGGLE_NEW_DECK_DIALOG:
      return {...state, new_deck_dialog_opened: !state.new_deck_dialog_opened}
    case types.NEW_DECK_NAME_CHANGED:
      return {...state, new_deck_name: action.payload};
    case types.NEW_DECK_DIALOG_ERROR:
      return {...state, new_deck_dialog_error: action.payload};
    case types.TOGGLE_EDIT_DECK_DIALOG:
      return {...state, edit_deck_dialog_opened: !state.edit_deck_dialog_opened}
    case types.SET_EDIT_DECK_ID:
      return {...state, edit_deck_id: action.payload};
    case types.EDIT_DECK_NAME_CHANGED:
      return {...state, edit_deck_dialog_name: action.payload};
    case types.EDIT_DECK_DIALOG_ERROR:
      return {...state, edit_deck_dialog_error: action.payload};
    default:
      return state;
  }
}