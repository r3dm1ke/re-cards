import * as types from './types';
import {firestore} from "../firebase";

let unsubscribe;

export const subscribe_to_trends = () => async (dispatch, getState) => {
  const {uid} = getState().auth.user;
  unsubscribe = firestore.collection('history')
    .where('uid', '==', uid)
    .orderBy('timestamp', 'desc')
    .limit(20)
    .onSnapshot(query => {
      const data = [];
      query.forEach(q => data.push({...q.data()}));
      data.reverse();
      dispatch({
        type: types.TRENDS_LOADED,
        payload: data
      });
    })
};

export const unsubscribe_from_trends = () => async (dispatch, getState) => {
  unsubscribe();
  dispatch({
    type: types.TRENDS_LOADED,
    payload: []
  })
};