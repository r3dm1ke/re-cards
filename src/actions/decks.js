import * as types from './types';
import {push} from 'connected-react-router';
import firebase, {firestore} from '../firebase';
import {load_list_of_decks} from "./cards";

export const open_decks = () => async (dispatch, getState) => {
  dispatch({
    type: types.ADD_LOADER,
    payload: {
      handle: 'decks',
      description: 'Loading your decks...'
    }
  });

  dispatch(push('/decks'));
  const {uid} = getState().auth.user;
  const decks = await load_list_of_decks(uid);

  dispatch({
    type: types.DECKS_LOADED,
    payload: decks
  });
  dispatch({
    type: types.REMOVE_LOADER,
    payload: 'decks'
  });
};

export const on_new_deck_name_changed = event => ({
  type: types.NEW_DECK_NAME_CHANGED,
  payload: event.target.value
});

export const toggle_new_deck_dialog = () => ({
  type: types.TOGGLE_NEW_DECK_DIALOG
});

export const on_new_deck_submit = () => async (dispatch, getState) => {
  dispatch({
    type: types.ADD_LOADER,
    payload: {
      handle: 'new_deck',
      description: 'Saving...'
    }
  });

  const state = getState();
  const {uid} = state.auth.user;
  const {new_deck_name} = state.decks;
  if (new_deck_name === '') {
    dispatch({
      type: types.NEW_DECK_DIALOG_ERROR,
      payload: 'Name cannot be empty'
    });
  } else {
    const ref = firestore.collection('decks');
    await ref.add({
      subject: new_deck_name,
      uid
    });
    dispatch({
      type: types.NEW_DECK_DIALOG_ERROR,
      payload: ''
    });
    dispatch({
      type: types.TOGGLE_NEW_DECK_DIALOG
    });
    dispatch({
      type: types.NEW_DECK_NAME_CHANGED,
      payload: ''
    });
    dispatch(open_decks());
  }
  dispatch({
    type: types.REMOVE_LOADER,
    payload: 'new_deck'
  })
};

export const toggle_edit_deck_dialog = () => ({
  type: types.TOGGLE_EDIT_DECK_DIALOG
});

export const edit_deck_name_changed = event => ({
  type: types.EDIT_DECK_NAME_CHANGED,
  payload: event.target.value
});

export const edit_deck_dialog_error = error => ({
  type: types.EDIT_DECK_DIALOG_ERROR,
  payload: error
});

export const on_edit_deck_submit = () => async (dispatch, getState) => {
  dispatch({
    type: types.ADD_LOADER,
    payload: {
      handle: 'edit',
      description: 'Saving changes...'
    }
  });
  dispatch(toggle_edit_deck_dialog());
  const {edit_deck_id, edit_deck_dialog_name} = getState().decks;
  const ref = firestore.collection('decks').doc(edit_deck_id);
  await ref.set({
    subject: edit_deck_dialog_name
  }, {merge: true});
  dispatch(open_decks());
  dispatch({
    type: types.REMOVE_LOADER,
    payload: 'edit'
  });
};

export const on_edit_deck_delete = () => async (dispatch, getState) => {
  dispatch({
    type: types.ADD_LOADER,
    payload: {
      handle: 'delete',
      description: 'Deleting...'
    }
  });
  dispatch(toggle_edit_deck_dialog());
  const {edit_deck_id} = getState().decks;
  const ref = firestore.collection('decks').doc(edit_deck_id);
  await ref.delete();
  dispatch(open_decks());
  dispatch({
    type: types.REMOVE_LOADER,
    payload: 'delete'
  });
};

export const open_edit_dialog = id => async (dispatch, getState) => {
  dispatch({
    type: types.SET_EDIT_DECK_ID,
    payload: id
  });
  const deck = getState().decks.decks.find(d => d.id === id);
  dispatch({
    type: types.EDIT_DECK_NAME_CHANGED,
    payload: deck.subject
  });
  dispatch({
    type: types.TOGGLE_EDIT_DECK_DIALOG
  });
};
