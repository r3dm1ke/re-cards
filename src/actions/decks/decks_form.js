import * as types from '../types';
import {firestore} from '../../firebase';
import {add_loader, remove_loader} from '../mics';
import {validate_deck_name} from '../../validators/decks';
import {error_happened} from '../errors';
import {create_deck, update_deck, delete_deck as delete_deck_from_db, get_deck_ref} from '../../utils/db/decks';
import {delete_cards_by_deck} from '../../utils/db/cards';

export const toggle_edit_deck_dialog = () => ({
  type: types.EDIT_DECK_DIALOG_TOGGLED,
});

export const edit_deck_dialog_name_changed = (name) => ({
  type: types.EDIT_DECK_DIALOG_NAME_CHANGED,
  payload: name,
});

export const edit_deck_dialog_id_changed = (id) => ({
  type: types.EDIT_DECK_DIALOG_ID_CHANGED,
  payload: id,
});

export const edit_deck_dialog_add_error = (handle, description) => ({
  type: types.EDIT_DECK_DIALOG_ERROR_ADDED,
  payload: {handle, description},
});

export const edit_deck_dialog_clear_error = () => ({
  type: types.EDIT_DECK_DIALOG_ERRORS_CLEARED,
});

const edit_deck_dialog_validate = async (dispatch, getState) => {
  const {edit_deck_dialog_name} = getState().decks_form;
  dispatch(edit_deck_dialog_clear_error());
  const validate_result = await validate_deck_name(edit_deck_dialog_name);
  if (!validate_result.ok) {
    dispatch(edit_deck_dialog_add_error('name', validate_result.error));
    return false;
  }
  return true;
};

export const on_edit_deck_dialog_submit = () => async (dispatch, getState) => {
  if (await edit_deck_dialog_validate(dispatch, getState)) {
    dispatch(add_loader('edit', 'Saving...'));
    dispatch(toggle_edit_deck_dialog());
    const {edit_deck_dialog_id, edit_deck_dialog_name} = getState().decks_form;
    try {
      if (edit_deck_dialog_id === '') {
        const {uid} = getState().auth.user;
        await create_new_deck(edit_deck_dialog_name, uid);
      } else {
        await save_existing_deck(edit_deck_dialog_id, edit_deck_dialog_name);
      }
    } catch {
      dispatch(error_happened('Error saving deck. That\'s it.'));
    }
    dispatch(remove_loader('edit'));
  }
};

const create_new_deck = async (name, uid) => {
  try {
    await create_deck({subject: name, uid});
  } catch (e) {
    // eslint-disable-next-line fp/no-throw
    throw e;
  }
};

const save_existing_deck = async (id, name) => {
  try {
    await update_deck(id,
      {
        subject: name,
      });
  } catch (e) {
    // eslint-disable-next-line fp/no-throw
    throw e;
  }
};

const delete_deck = (id) => async (dispatch, getState) => {
  dispatch(add_loader('delete', 'Deleting...'));

  // eslint-disable-next-line no-restricted-globals
  const confirmed = confirm(
    'Deleting this deck will also delete all cards associated to it. ' +
    'Do you wish to continue?'
  );

  if (confirmed) {
    const {uid} = getState().auth.user;
    const deck_ref = get_deck_ref(id);
    try {
      await delete_deck_from_db(id);
      await delete_cards_by_deck(uid, deck_ref);
    } catch (e) {
      console.error(e);
      dispatch(error_happened('Error deleting stuff. Maybe it\'s a sign.'));
    }
  }

  dispatch(remove_loader('delete'));
};

export const on_edit_deck_dialog_delete = () => async (dispatch, getState) => {
  dispatch(toggle_edit_deck_dialog());
  const {edit_deck_dialog_id} = getState().decks_form;
  dispatch(delete_deck(edit_deck_dialog_id));
};

export const open_edit_dialog = (id='') => async (dispatch, getState) => {
  dispatch(edit_deck_dialog_id_changed(id));
  if (id !== '') {
    const deck = getState().decks.decks.find((d) => d.id === id);
    dispatch(edit_deck_dialog_name_changed(deck.name));
  }
  dispatch({
    type: types.EDIT_DECK_DIALOG_TOGGLED,
  });
};
