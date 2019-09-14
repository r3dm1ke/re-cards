import * as types from './types';
import {push} from 'connected-react-router';

export const open_dashboard = () => async (dispatch, getState) => {
  dispatch(push('/dashboard'));
};

export const simple_study_deck_selected = (deck, selected) => ({
  type: types.SIMPLE_STUDY_DECK_SELECTED,
  payload: [deck, selected]
});