import * as types from '../actions/types';

const INITIAL_STATE = {
  cards: [],
  decks: [],
  selected_deck: 'all',
  edit_dialog_opened: false,
  edit_dialog_question: '',
  edit_dialog_answer: '',
  edit_dialog_deck: '',
  edit_dialog_id: ''
};

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CARDS_LOADED:
      return {...state, cards: action.payload};
    case types.SELECTED_DECK:
      return {...state, selected_deck: action.payload};
    case types.DECKS_LOADED:
      return {...state, decks: action.payload};
    case types.OPEN_EDIT_CARD_DIALOG:
      return {...state, edit_dialog_opened: true};
    case types.EDIT_CARD_DIALOG_ID_CHANGED:
      return {...state, edit_dialog_id: action.payload};
    case types.EDIT_CARD_DIALOG_DECK_CHANGED:
      return {...state, edit_dialog_deck: action.payload};
    case types.EDIT_CARD_DIALOG_ANSWER_CHANGED:
      return {...state, edit_dialog_answer: action.payload};
    case types.EDIT_CARD_DIALOG_QUESTION_CHANGED:
      return {...state, edit_dialog_question: action.payload};
    case types.CLOSE_EDIT_CARD_DIALOG:
      return {...state, edit_dialog_opened: false};
    default:
      return state;
  }
}