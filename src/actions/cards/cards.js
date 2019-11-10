import * as types from '../types';
import {push} from 'connected-react-router';
import {add_loader, remove_loader} from '../mics';
import {delete_card as delete_card_from_db, listen_to_cards} from '../../utils/db/cards';
import {error_happened} from '../errors';

export const subscribe_to_cards = () => async (dispatch, getState) => {
  const {uid} = getState().auth.user;
  listen_to_cards(uid, (data) => {
    dispatch({
      type: types.CARDS_LOADED,
      payload: data,
    });
  });
};

export const open_cards = () => async (dispatch) => {
  dispatch(push('/cards'));
};

export const open_cards_for_deck = (deckId) => async (dispatch) => {
  dispatch(deck_selected(deckId));
  dispatch(open_cards());
};

export const deck_selected = (deckId) => async (dispatch) => {
  dispatch({
    type: types.DECK_SELECTED,
    payload: deckId,
  });
};


export const delete_card = (card) => async (dispatch) => {
  dispatch(add_loader('del_card', 'Deleting...'));
  try {
    await delete_card_from_db(card.id);
  } catch (e) {
    console.error(e);
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
