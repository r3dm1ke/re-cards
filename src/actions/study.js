import * as types from './types';
import {push} from 'connected-react-router';
import {functions} from '../firebase';
import {add_loader, remove_loader, show_alert} from "./mics";

export const start_simple_study = () => async (dispatch, getState) => {
  dispatch({
    type: types.ADD_LOADER,
    payload: {
      handle: 'ss',
      description: 'Preparing your study session...'
    }
  });
  const state = getState();
  const {simple_study_decks} = state.dashboard;
  const {cards} = state.cards;
  const filtered_cards = cards.filter(card =>
    simple_study_decks.indexOf(card.deck.id) > -1
  );

  dispatch({
    type: types.CARDS_FOR_SIMPLE_STUDY_LOADED,
    payload: filtered_cards
  });
  dispatch({
    type: types.START_SIMPLE_STUDY
  });
  dispatch(push('/study'));
  dispatch({
    type: types.REMOVE_LOADER,
    payload: 'ss'
  });
};

export const simple_study_register_answer = stoopid => async (dispatch, getState) => {
  const state = getState();
  const {simple_study_index, simple_study_length, simple_study_cards} = state.study;

  const register_answer = functions.httpsCallable('register_answer');
  register_answer({card: simple_study_cards[simple_study_index].id, answer: !stoopid})
    .then(() => {});

  if (!stoopid) {
    dispatch({
      type: types.SIMPLE_STUDY_INCREMENT_SCORE
    });
  }
  if (simple_study_index === simple_study_length - 1) {
    dispatch({
      type: types.SIMPLE_STUDY_SHOW_RESULTS
    });
  }
  dispatch({
    type: types.SIMPLE_STUDY_INCREMENT_INDEX
  });
};

export const simple_study_teardown = () => async (dispatch, getState) => {
  dispatch({
    type: types.SIMPLE_STUDY_FINISHED
  });

  const state = getState();
  const {uid} = state.auth.user;
  const {simple_study_decks} = state.dashboard;
  const {simple_study_score, simple_study_length} = state.study;
  const score = Math.round((simple_study_score / simple_study_length) * 100);
  const register_simple_study_session = functions.httpsCallable('register_simple_study_session');
  register_simple_study_session({
    uid,
    score,
    deck_ids: simple_study_decks
  })
    .then(() => {});

  dispatch(push('/dashboard'));
};

export const start_smart_study = () => async (dispatch) => {
  dispatch(add_loader('smart_start', 'Preparing your study session...'));
  const get_smart_study_cards = functions.httpsCallable('get_smart_study_cards');
  const cards = await get_smart_study_cards();
  if (cards.data.length === 0) {
    dispatch(show_alert(
  'You are done for today',
        'You have no cards left to study today. Come back tomorrow or try any other study modes.'
      ));
  } else {
    dispatch({
      type: types.CARDS_FOR_SMART_STUDY_LOADED,
      payload: cards.data
    });
    dispatch({
      type: types.START_SMART_STUDY
    });
    dispatch(push('/study'));
  }
  dispatch(remove_loader('smart_start'));
};

export const smart_study_register_answer = stoopid => async (dispatch, getState) => {
  const state = getState();
  const {smart_study_index, smart_study_length, smart_study_cards} = state.study;

  const register_answer = functions.httpsCallable('register_answer');
  register_answer({card: smart_study_cards[smart_study_index].id, answer: !stoopid, smart: true})
    .then(() => {});

  if (!stoopid) {
    dispatch({type: types.SMART_STUDY_INCREMENT_SCORE});
  }

  if (smart_study_index === smart_study_length - 1) {
    dispatch({type: types.SMART_STUDY_SHOW_RESULTS});
  }

  dispatch({type: types.SMART_STUDY_INCREMENT_INDEX});
};

export const smart_study_teardown = () => async (dispatch, getState) => {
  dispatch({type: types.SMART_STUDY_FINISHED});

  // TODO register smart study session in __functions__

  dispatch(push('/dashboard'));
};

export const engage_exam_mode = () => async (dispatch, getState) => {
  dispatch(add_loader('exam', 'Clearing your past sins...'))
  const engage = functions.httpsCallable('engage_exam_mode');
  await engage();
  dispatch(remove_loader('exam'));
};