import * as types from '../types';
import {firestore} from '../../firebase';
import {add_loader, remove_loader} from '../mics';
import {validate_deck_name} from '../../validators/decks';

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
    if (edit_deck_dialog_id === '') {
      const {uid} = getState().auth.user;
      await create_new_deck(edit_deck_dialog_name, uid);
    } else {
      await save_existing_deck(edit_deck_dialog_id, edit_deck_dialog_name);
    }
    dispatch(remove_loader('edit'));
  }
};

const create_new_deck = async (name, uid) => {
  const ref = firestore.collection('decks');
  await ref.add({subject: name, uid});
};

const save_existing_deck = async (id, name) => {
  const ref = firestore.collection('decks').doc(id);
  await ref.set({
    subject: name,
  }, {merge: true});
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
    const batch = firestore.batch();
    const ref = firestore.collection('decks').doc(id);
    batch.delete(ref);
    const cardsRef = firestore.collection('cards')
      .where('deck', '==', ref)
      .where('uid', '==', uid);

    const cards = await cardsRef.get();
    cards.docs.forEach((card) => {
      batch.delete(firestore.collection('cards').doc(card.id));
    });
    await batch.commit();
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
