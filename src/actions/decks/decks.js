import * as types from '../types';
import {push} from 'connected-react-router';
import {firestore} from '../../firebase';

export const subscribe_to_decks = () => async (dispatch, getState) => {
  const {uid} = getState().auth.user;
  firestore.collection('decks')
    .where('uid', '==', uid)
    .onSnapshot(async (query) => {
      let data = [];
      // eslint-disable-next-line fp/no-loops
      for (const q of query.docs) {
        const deck_data = q.data();
        // eslint-disable-next-line fp/no-mutation
        data = [
          ...data,
          {id: q.id, name: deck_data.subject, uid: deck_data.uid}
        ];
      }
      dispatch({
        type: types.DECKS_LOADED,
        payload: data,
      });
    });
};

export const open_decks = () => async (dispatch, getState) => {
  dispatch({
    type: types.ADD_LOADER,
    payload: {
      handle: 'decks',
      description: 'Loading your decks...',
    },
  });

  dispatch(push('/decks'));

  dispatch({
    type: types.REMOVE_LOADER,
    payload: 'decks',
  });
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
