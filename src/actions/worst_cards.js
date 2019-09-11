import * as types from './types';
import {firestore} from '../firebase';
import {add_loader, remove_loader} from "./mics";
import {push} from 'connected-react-router';

export const load_worst_cards = () => async (dispatch, getState) => {
  dispatch(add_loader('worst', 'Loading your worst cards...'));
  const {uid} = getState().auth.user;
  const cards_ref = firestore.collection('cards');
  const ordered_cards_ref = cards_ref.where('uid', '==', uid).orderBy('ratio').limit(25);
  const cards_data = await ordered_cards_ref.get();

  dispatch({
    type: types.WORST_CARDS_LOADED,
    payload: cards_data.docs.map(card => ({...card.data(), id: card.id}))
  });
  dispatch(remove_loader('worst'))
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