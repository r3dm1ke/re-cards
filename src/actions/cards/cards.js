import * as types from '../types';
import {firestore} from '../../firebase';
import {push} from 'connected-react-router';
import {add_loader, remove_loader} from '../mics';
import {A_TEXT, Q_TEXT} from '../../const/cards';
import {extract_cards_from_docs_async} from '../../utils/database';
import {error_happened} from '../errors';

export const subscribe_to_cards = () => async (dispatch, getState) => {
  const {uid} = getState().auth.user;
  firestore.collection('cards')
    .where('uid', '==', uid)
    .onSnapshot(async (query) => {
      const data = await extract_cards_from_docs_async(query);
      dispatch({
        type: types.CARDS_LOADED,
        payload: data,
      });
    });
};

export const open_cards = () => async (dispatch) => {
  dispatch(push('/cards'));
};

export const open_cards_for_deck = (deckId) => async (dispatch, getState) => {
  dispatch(deck_selected(deckId));
  dispatch(open_cards());
};

export const deck_selected = (deckId) => async (dispatch, getState) => {
  dispatch({
    type: types.DECK_SELECTED,
    payload: deckId,
  });
};


export const delete_card = (card) => async (dispatch, getState) => {
  dispatch(add_loader('del_card', 'Deleting...'));
  const ref = firestore.collection('cards').doc(card.id);
  try {
    await ref.delete();
  } catch {
    dispatch(error_happened('Error deleting card. Is it really there?'));
  }
  dispatch(remove_loader('del_card'));
};

export const cards_search_term_updated = (search_term) => ({
  type: types.CARDS_SEARCH_TERM_UPDATED,
  payload: search_term,
});

export const cards_sort_prop_updated = (sort_prop) => ({
  type: types.CARDS_SORT_PROP_CHANGED,
  payload: sort_prop,
});

export const cards_sort_direction_toggled = () => ({
  type: types.CARDS_SORT_DIRECTION_TOGGLED,
});
