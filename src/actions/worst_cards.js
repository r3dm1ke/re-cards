import * as types from './types';
import {firestore} from '../firebase';
import {add_loader, remove_loader} from './mics';
import {push} from 'connected-react-router';
import {extract_cards_from_docs_async} from '../utils/database';
import {SIMPLE_STUDY} from '../const/study';

export const subscribe_to_worst_cards = () => async (dispatch, getState) => {
  const {uid} = getState().auth.user;
  firestore.collection('cards')
    .where('uid', '==', uid)
    .orderBy('ratio')
    .limit(25)
    .onSnapshot(async (query) => {
      const data = await extract_cards_from_docs_async(query);
      dispatch({
        type: types.WORST_CARDS_LOADED,
        payload: data,
      });
    });
};

export const study_worst_cards = () => async (dispatch, getState) => {
  dispatch(add_loader('worst_study', 'Preparing your study session...'));
  const {worst_cards} = getState().worst_cards;
  dispatch({
    type: types.CARDS_FOR_STUDY_LOADED,
    payload: worst_cards,
  });
  dispatch({
    type: types.SET_STUDY_MODE,
    payload: SIMPLE_STUDY,
  });
  dispatch({
    type: types.START_STUDY,
  });
  dispatch(push('/study'));
  dispatch(remove_loader('worst_study'));
};
