import * as types from '../types';
import {push} from 'connected-react-router';
import {listen_to_decks} from '../../utils/db/decks';

export const subscribe_to_decks = () => async (dispatch, getState) => {
  const {uid} = getState().auth.user;
  listen_to_decks(uid, (data) =>
    dispatch({
      type: types.DECKS_LOADED,
      payload: data,
    })
  );
};

export const open_decks = () => async (dispatch) => {
  dispatch(push('/decks'));
};


export const decks_search_term_updated = (search_term) => ({
  type: types.DECKS_SEARCH_TERM_UPDATED,
  payload: search_term,
});

export const decks_sort_prop_changed = (sort_prop) => ({
  type: types.DECKS_SORT_PROP_CHANGED,
  payload: sort_prop,
});

export const decks_sort_direction_toggled = () => ({
  type: types.DECKS_SORT_DIRECTION_TOGGLED,
});
