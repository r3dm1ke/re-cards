import * as types from '../actions/types';
import {Q_TEXT} from "../const/cards";

const INITIAL_STATE = {
  cards: undefined,
  decks: undefined,
  filtered_cards: undefined,
  selected_deck: 'all',
  search_term: '',
  edit_dialog_opened: false,
  edit_dialog_question: '',
  edit_dialog_answer: '',
  edit_dialog_deck: '',
  edit_dialog_id: '',
  edit_dialog_question_type: Q_TEXT,
  edit_dialog_validation_required: false,
  sort_prop: 'question',
  refresh_helper: false,
  sort_direction: true // TRUE for desc, FALSE for asc
};

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CARDS_LOADED:
      return {
        ...state,
        cards: action.payload,
        filtered_cards: filter_cards({...state, cards: action.payload})
      };
    case types.SELECTED_DECK:
      return {
        ...state,
        selected_deck: action.payload,
        filtered_cards: filter_cards({...state, selected_deck: action.payload})
      };
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
    case types.EDIT_CARD_DIALOG_QUESTION_TYPE_CHANGED:
      return {...state, edit_dialog_question_type: action.payload};
    case types.EDIT_CARD_DIALOG_VALIDATION_REQUIRED_CHANGED:
      return {...state, edit_dialog_validation_required: action.payload};
    case types.CARDS_SEARCH_TERM_UPDATED:
      return {
        ...state,
        search_term: action.payload,
        filtered_cards: filter_cards({...state, search_term: action.payload})
      };
    case types.CARDS_SORT_PROP_CHANGED:
      return {
        ...state,
        refresh_helper: !state.refresh_helper,
        sort_prop: action.payload,
        filtered_cards: filter_cards({...state, sort_prop: action.payload})
      };
    case types.CARDS_SORT_DIRECTION_TOGGLED:
      return {
        ...state,
        refresh_helper: !state.refresh_helper,
        sort_direction: !state.sort_direction,
        filtered_cards: filter_cards({...state, sort_direction: !state.sort_direction})
      };
    default:
      return state;
  }
}

const filter_cards = (state) => {
  let filtered = state.cards;
  if (state.selected_deck !== 'all') {
    filtered = filtered.filter(card => card.deck.id === state.selected_deck)
  }

  if (state.search_term !== '') {
    filtered = filtered.filter(card => card.question.includes(state.search_term) || card.answer.includes(state.search_term));
  }

  filtered.sort((card1, card2) => card1[state.sort_prop] > card2[state.sort_prop] ? -1 : 1);

  if (state.sort_direction) filtered.reverse();

  return filtered;
};