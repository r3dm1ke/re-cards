import * as types from '../../actions/types';
import {A_LIST_DEFAULT_ENTRY, A_TEXT, Q_TEXT} from '../../const/cards';

const INITIAL_STATE = {
  edit_dialog_opened: false,
  edit_dialog_question: '',
  edit_dialog_answer: '',
  edit_dialog_deck: '',
  edit_dialog_id: '',
  edit_dialog_answer_list: [],
  edit_dialog_answer_type: A_TEXT,
  edit_dialog_question_type: Q_TEXT,
  edit_dialog_validation_required: false,
};

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
  case types.OPEN_EDIT_CARD_DIALOG:
    return {...state, edit_dialog_opened: true};
  case types.EDIT_CARD_DIALOG_ID_CHANGED:
    return {...state, edit_dialog_id: action.payload};
  case types.EDIT_CARD_DIALOG_DECK_CHANGED:
    return {...state, edit_dialog_deck: action.payload};
  case types.EDIT_CARD_DIALOG_ANSWER_CHANGED:
    return {...state, edit_dialog_answer: action.payload};
  case types.EDIT_CARD_DIALOG_ANSWER_TYPE_CHANGED:
    return {...state, edit_dialog_answer_type: action.payload};
  case types.EDIT_CARD_DIALOG_QUESTION_CHANGED:
    return {...state, edit_dialog_question: action.payload};
  case types.CLOSE_EDIT_CARD_DIALOG:
    return {...state, edit_dialog_opened: false};
  case types.EDIT_CARD_DIALOG_QUESTION_TYPE_CHANGED:
    return {...state, edit_dialog_question_type: action.payload};
  case types.EDIT_CARD_DIALOG_VALIDATION_REQUIRED_CHANGED:
    return {...state, edit_dialog_validation_required: action.payload};
  case types.EDIT_CARD_DIALOG_ANSWER_LIST_ADDED_NEW_ENTRY:
    return {
      ...state,
      edit_dialog_answer_list:
        [...state.edit_dialog_answer_list, A_LIST_DEFAULT_ENTRY],
    };
  case types.EDIT_CARD_DIALOG_ANSWER_LIST_REMOVED_ENTRY:
    return {
      ...state,
      edit_dialog_answer_list: state.edit_dialog_answer_list
        .filter((elem, index) => index !== action.payload),
    };
  case types.EDIT_CARD_DIALOG_ANSWER_LIST_ENTRY_MODIFIED:
    const newEntries = state.edit_dialog_answer_list
      .map((elem, index) => (index === action.payload[0] ? action.payload[1] : elem));
    return {
      ...state,
      edit_dialog_answer_list: newEntries,
    };
  case types.EDIT_CARD_DIALOG_ANSWER_LIST_CHANGED:
    return {
      ...state,
      edit_dialog_answer_list: action.payload,
    };
  default:
    return state;
  }
}
