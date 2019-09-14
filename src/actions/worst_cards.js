import * as types from './types';
import {firestore} from '../firebase';
import {add_loader, remove_loader} from "./mics";
import {push} from 'connected-react-router';

export const subscribe_to_worst_cards = () => async (dispatch, getState) => {
  const {uid} = getState().auth.user;
  const unsubscribe = firestore.collection('cards')
    .where('uid', '==', uid)
    .orderBy('ratio')
    .limit(25)
    .onSnapshot(async query => {
      const data = [];
      query.forEach(async q => {
        const card_data = q.data();
        card_data.id = q.id;
        const deck_data = await card_data.deck.get();
        card_data.deckName = deck_data.data().subject;
        data.push(card_data);
      });
      dispatch({
        type: types.WORST_CARDS_LOADED,
        payload: data
      });
    });
};

export const study_worst_cards = () => async (dispatch, getState) => {
  dispatch(add_loader('worst_study', 'Preparing your study session...'));
  const {worst_cards} = getState().worst_cards;
  dispatch({
    type: types.CARDS_FOR_SIMPLE_STUDY_LOADED,
    payload: worst_cards
  });
  dispatch({
    type: types.START_SIMPLE_STUDY
  });
  dispatch(push('/study'));
  dispatch(remove_loader('worst_study'));
};