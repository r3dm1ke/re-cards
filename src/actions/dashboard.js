import * as types from './types';
import {push} from 'connected-react-router';
import {load_list_of_cards, load_list_of_decks} from "./cards";
import {load_worst_cards} from "./worst_cards";

export const open_dashboard = () => async (dispatch, getState) => {
  let {decks, cards} = getState().cards;
  const {uid} = getState().auth.user;
  if (decks.length === 0) {
    dispatch({
      type: types.ADD_LOADER,
      payload: {handle: 'decks', description: 'Loading decks..'}
    });
    decks = await load_list_of_decks(uid);
    dispatch({
      type: types.DECKS_LOADED,
      payload: decks
    });
    dispatch({
      type: types.REMOVE_LOADER,
      payload: 'decks'
    });
  }
  if (cards.length === 0) {
    dispatch({
      type: types.ADD_LOADER,
      payload: {handle: 'cards', description: 'Loading cards...'}
    });
    cards = await load_list_of_cards(uid, 'all', decks);
    dispatch({
      type: types.CARDS_LOADED,
      payload: cards
    });
    dispatch({
      type: types.REMOVE_LOADER,
      payload: 'cards'
    });
    dispatch(load_worst_cards());
  }
  dispatch(push('/dashboard'));
};

export const simple_study_deck_selected = (deck, selected) => ({
  type: types.SIMPLE_STUDY_DECK_SELECTED,
  payload: [deck, selected]
});