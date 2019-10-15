import {firestore} from '../firebase';
import * as types from './types';

export const subscribe_to_progress = () => async (dispatch, getState) => {
  const {uid} = getState().auth.user;
  firestore.collection('progress')
    .where('uid', '==', uid)
    .orderBy('timestamp')
    .onSnapshot(async (query) => {
      const docs = query.docs;
      const payload = docs.map((doc) => doc.data());
      dispatch({type: types.PROGRESS_LOADED, payload});
    });
};
