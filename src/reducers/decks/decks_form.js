import * as types from '../../actions/types';

const INITIAL_STATE = {
  edit_deck_dialog_id: '',
  edit_deck_dialog_opened: false,
  edit_deck_dialog_name: '',
  edit_deck_dialog_errors: {},
};

// eslint-disable-next-line complexity
export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
  case types.EDIT_DECK_DIALOG_ID_CHANGED:
    return {...state, edit_deck_dialog_id: action.payload};
  case types.EDIT_DECK_DIALOG_NAME_CHANGED:
    return {...state, edit_deck_dialog_name: action.payload};
  case types.EDIT_DECK_DIALOG_TOGGLED:
    return {...state, edit_deck_dialog_opened: !state.edit_deck_dialog_opened};
  case types.EDIT_DECK_DIALOG_ERROR_ADDED:
    return {
      ...state,
      edit_deck_dialog_errors:
        {
          ...state.edit_deck_dialog_errors,
          [action.payload.handle]: action.payload.description,
        },
    };
  case types.EDIT_DECK_DIALOG_ERRORS_CLEARED:
    return {
      ...state,
      edit_deck_dialog_errors: {},
    };
  default:
    return state;
  }
};
