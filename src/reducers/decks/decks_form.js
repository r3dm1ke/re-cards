import * as types from '../../actions/types';

const INITIAL_STATE = {
  edit_deck_dialog_id: '',
  edit_deck_dialog_opened: false,
  edit_deck_dialog_name: '',
};

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
  case types.EDIT_DECK_DIALOG_ID_CHANGED:
    return {...state, edit_deck_dialog_id: action.payload};
  case types.EDIT_DECK_DIALOG_NAME_CHANGED:
    return {...state, edit_deck_dialog_name: action.payload};
  case types.EDIT_DECK_DIALOG_TOGGLED:
    return {...state, edit_deck_dialog_opened: !state.edit_deck_dialog_opened};
  default:
    return state;
  }
};
