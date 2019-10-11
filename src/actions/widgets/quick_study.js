import * as types from '../types';
import {shuffle} from '../../utils/random';
import {cards_for_simple_study_loaded, start_study} from '../study';
import {SIMPLE_STUDY} from '../../const/study';

export const number_of_cards_changed_for_quick_study = (value) => ({
  type: types.NUMBER_OF_CARDS_FOR_QUICK_STUDY_CHANGED,
  payload: value,
});

export const start_quick_study = () => async (dispatch, getState) => {
  const state = getState();
  const cards = state.widgets.quick_study.eligible_cards;
  const number_of_cards = state.widgets.quick_study.number_of_cards_selected;
  const shuffled_cards = shuffle([...cards]);
  const cards_for_study = shuffled_cards.slice(0, number_of_cards);
  dispatch(cards_for_simple_study_loaded(cards_for_study));
  dispatch(start_study(SIMPLE_STUDY));
};

export const deck_selected_for_quick_study = (deck_id) => ({
  type: types.DECK_SELECTED_FOR_QUICK_STUDY,
  payload: deck_id,
});

export const deck_unselected_for_quick_study = (deck_id) => ({
  type: types.DECK_UNSELECTED_FOR_QUICK_STUDY,
  payload: deck_id,
});

export const mastered_cards_included_for_quick_study_toggled = () => ({
  type: types.MASTERED_CARDS_INCLUDED_FOR_QUICK_STUDY_TOGGLED,
});
