import * as types from './types';
import {firestore} from '../firebase';

export const subscribe_to_trends = () => async (dispatch, getState) => {
  const {uid} = getState().auth.user;
  firestore.collection('history')
    .where('uid', '==', uid)
    .orderBy('timestamp', 'desc')
    .limit(20)
    .onSnapshot((query) => {
      let data = [];
      query.forEach((q) => data = [...data, {...q.data()}]);
      data.reverse();
      dispatch({
        type: types.TRENDS_LOADED,
        payload: data,
      });
    });
};
