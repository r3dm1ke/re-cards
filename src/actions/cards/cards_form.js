import * as types from '../types';
import {A_TEXT, Q_TEXT} from '../../const/cards';
import {add_loader, remove_loader} from '../mics';
import {firestore} from '../../firebase';
import {validate_card} from '../../validators/cards';

export const open_edit_card_dialog = () => ({
  type: types.OPEN_EDIT_CARD_DIALOG,
});

export const open_edit_card_dialog_for_new_card = () =>
  async (dispatch) => {
    dispatch({
      type: types.EDIT_CARD_DIALOG_ID_CHANGED,
      payload: '',
    });
    dispatch(set_defaults_for_new_card_dialog());
  };

const set_defaults_for_new_card_dialog = () => async (dispatch, getState) => {
  const {selected_deck} = getState().cards;

  dispatch(edit_card_dialog_deck_changed(
    selected_deck === 'all' ? '' : selected_deck));
  dispatch(edit_card_dialog_answer_changed(''));
  dispatch(edit_card_dialog_answer_type_changed(A_TEXT));
  dispatch(edit_card_dialog_question_type_changed(Q_TEXT));
  dispatch(edit_card_dialog_answer_list_changed([]));
  dispatch(edit_card_dialog_question_changed(''));
  dispatch(open_edit_card_dialog());
};

export const open_edit_card_dialog_for_existing_card = (card) =>
  async (dispatch) => {
    dispatch(populate_edit_card_dialog(card));
    dispatch(open_edit_card_dialog());
  };

const populate_edit_card_dialog = (card) => async (dispatch) => {
  dispatch({
    type: types.EDIT_CARD_DIALOG_ID_CHANGED,
    payload: card.id,
  });
  dispatch(edit_card_dialog_deck_changed(card.deck.id));
  dispatch(edit_card_dialog_answer_changed(card.answer));
  dispatch(edit_card_dialog_question_changed(card.question));
  dispatch(edit_card_dialog_answer_type_changed(card.answer_type));
  dispatch(
    edit_card_dialog_validation_required_changed(card.validation_required));
  dispatch(edit_card_dialog_question_type_changed(card.question_type));
  dispatch(edit_card_dialog_answer_list_changed(
    card.answer_list ? card.answer_list: []));
};

export const edit_card_dialog_answer_list_changed = (answer_list) => ({
  type: types.EDIT_CARD_DIALOG_ANSWER_LIST_CHANGED,
  payload: answer_list,
});

export const edit_card_dialog_question_changed = (question) => ({
  type: types.EDIT_CARD_DIALOG_QUESTION_CHANGED,
  payload: question,
});

export const edit_card_dialog_answer_changed = (answer) => ({
  type: types.EDIT_CARD_DIALOG_ANSWER_CHANGED,
  payload: answer,
});

export const edit_card_dialog_deck_changed = (deck) => ({
  type: types.EDIT_CARD_DIALOG_DECK_CHANGED,
  payload: deck,
});

export const save_card_from_dialog = () => async (dispatch, getState) => {
  const state = getState();
  const data = load_edited_card_from_state(state);
  const decks = state.decks.decks;
  dispatch(clear_errors());
  const errors = await validate_card_data(data, decks);
  console.log('errors');
  console.log(errors);
  if (Object.keys(errors).length === 0) {
    dispatch(add_loader('add_card', 'Saving...'));
    dispatch(close_edit_card_dialog());

    const {edit_dialog_id} = state.cards_form;

    if (
      edit_dialog_id === '' ||
      edit_dialog_id === null ||
      edit_dialog_id === undefined) {
      const ref = firestore.collection('cards');
      await ref.add(data);
    } else {
      const ref = firestore.collection('cards').doc(edit_dialog_id);
      await ref.set(data, {merge: true});
    }

    dispatch(remove_loader('add_card'));
  } else {
    dispatch(add_errors(errors));
    dispatch(skip_tabs_to_error());
  }
};

const add_errors = (errors) => ({
  type: types.EDIT_CARD_DIALOG_ERRORS_CHANGED,
  payload: errors,
});

const clear_errors = () => ({
  type: types.EDIT_CARD_DIALOG_ERRORS_CLEARED,
});

const validate_card_data = async (card_data, decks) => {
  return await validate_card(card_data, decks);
};

const load_edited_card_from_state = (state) => ({
  answer: state.cards_form.edit_dialog_answer,
  answer_type: state.cards_form.edit_dialog_answer_type,
  answer_list: state.cards_form.edit_dialog_answer_list,
  question: state.cards_form.edit_dialog_question,
  question_type: state.cards_form.edit_dialog_question_type,
  uid: state.auth.user.uid,
  deck: state.cards_form.edit_dialog_deck !== '' ?
    firestore.collection('decks').doc(
      state.cards_form.edit_dialog_deck
    ) : null,
  total: 0,
  score: 0,
  ratio: 0,
  validation_required: state.cards_form.edit_dialog_validation_required,
});

export const edit_card_dialog_question_type_changed = (q_type) => ({
  type: types.EDIT_CARD_DIALOG_QUESTION_TYPE_CHANGED,
  payload: q_type,
});

export const edit_card_dialog_validation_required_changed =
  (validation_required) => ({
    type: types.EDIT_CARD_DIALOG_VALIDATION_REQUIRED_CHANGED,
    payload: validation_required,
  });

export const edit_card_dialog_answer_type_changed = (answer_type) => ({
  type: types.EDIT_CARD_DIALOG_ANSWER_TYPE_CHANGED,
  payload: answer_type,
});

export const close_edit_card_dialog = () => ({
  type: types.CLOSE_EDIT_CARD_DIALOG,
});

export const edit_card_dialog_answer_list_added_new_entry = () => ({
  type: types.EDIT_CARD_DIALOG_ANSWER_LIST_ADDED_NEW_ENTRY,
});

export const edit_card_dialog_answer_list_entry_modified =
  (index, newEntry) => ({
    type: types.EDIT_CARD_DIALOG_ANSWER_LIST_ENTRY_MODIFIED,
    payload: [index, newEntry],
  });

export const edit_card_dialog_answer_list_removed_entry = (index) => ({
  type: types.EDIT_CARD_DIALOG_ANSWER_LIST_REMOVED_ENTRY,
  payload: index,
});

export const edit_card_dialog_tab_changed = (index) => ({
  type: types.EDIT_CARD_DIALOG_TAB_CHANGED,
  payload: index,
});

export const edit_card_dialog_next_tab = () => async (dispatch, getState) => {
  const index = getState().cards_form.edit_dialog_tab;
  dispatch(edit_card_dialog_tab_changed(index + 1));
};

export const edit_card_dialog_previous_tab = () => async (dispatch, getState) => {
  const index = getState().cards_form.edit_dialog_tab;
  dispatch(edit_card_dialog_tab_changed(index - 1));
};

// КОСТЫЛЬ ПИЗДЕЦ
const skip_tabs_to_error = () => async (dispatch, getState) => {
  const errors = getState().cards_form.edit_dialog_errors;
  if ('question' in errors || 'question_type' in errors) {
    dispatch(edit_card_dialog_tab_changed(0));
  } else if ('decks' in errors) {
    dispatch(edit_card_dialog_tab_changed(2));
  } else {
    dispatch(edit_card_dialog_tab_changed(1));
  }
};
