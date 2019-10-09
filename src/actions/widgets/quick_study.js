import * as types from '../types';
import {shuffle} from '../../utils/random';
import {cards_for_simple_study_loaded, start_study} from '../study';
import {SIMPLE_STUDY} from '../../const/study';

export const number_of_cards_changed = (value) => ({
  type: types.NUMBER_OF_CARDS_FOR_QUICK_STUDY_CHANGED,
  payload: value,
});

export const start_quick_study = () => async (dispatch, getState) => {
  const state = getState();
  const {cards} = state.cards;
  const {number_of_cards} = state.widgets.quick_study;
  const shuffled_cards = shuffle([...cards]);
  const cards_for_study = shuffled_cards.slice(0, number_of_cards);
  dispatch(cards_for_simple_study_loaded(cards_for_study));
  dispatch(start_study(SIMPLE_STUDY));
};
