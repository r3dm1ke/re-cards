import * as types from './types';
import {push} from 'connected-react-router';
import {functions} from '../firebase';
import {add_loader, remove_loader, show_alert} from './mics';
import {SIMPLE_STUDY, SMART_STUDY} from '../const/study';

export const start_study = (type=undefined) => async (dispatch, getState) => {
  dispatch(add_loader('ss', 'Preparing your study session...'));
  const state = getState();
  const study_mode = type !== undefined ? type : state.study.study_mode;
  dispatch({
    type: types.SET_STUDY_MODE,
    payload: study_mode,
  });
  console.log(`Bootstrapping ${study_mode}`);
  let cards_for_session;
  if (study_mode === SIMPLE_STUDY) {
    cards_for_session = await load_cards_for_simple_study(state);
    console.log('Loaded these cards:');
    console.log(cards_for_session);
  } else if (study_mode === SMART_STUDY) {
    cards_for_session = await load_cards_for_smart_study(state);
    if (cards_for_session.length === 0) {
      dispatch(show_alert(
        'You are done for today',
        'You have no cards left to study today. Come back tomorrow or try any other study modes.'
      ));
      dispatch(remove_loader('ss'));
      return;
    }
  }
  dispatch({
    type: types.CARDS_FOR_STUDY_LOADED,
    payload: cards_for_session,
  });
  dispatch({
    type: types.START_STUDY,
  });
  dispatch(push('/study'));
  dispatch(remove_loader('ss'));
};

const load_cards_for_simple_study = async (state) => {
  const {simple_study_decks} = state.dashboard;
  const {cards} = state.cards;
  return cards.filter((card) =>
    simple_study_decks.indexOf(card.deck.id) > -1
  );
};

const load_cards_for_smart_study = async () => {
  const get_smart_study_cards = functions.httpsCallable('get_smart_study_cards');
  return (await get_smart_study_cards()).data;
};

export const register_answer = (is_incorrect) => async (dispatch, getState) => {
  const state = getState();
  const {study_index, study_length, study_cards, study_mode} = state.study;

  const register_answer = functions.httpsCallable('register_answer');
  register_answer({
    card: study_cards[study_index],
    answer: !is_incorrect,
    smart: study_mode === SMART_STUDY,
  })
    .then(() => {});

  if (!is_incorrect) dispatch({type: types.STUDY_INCREMENT_SCORE});
  if (study_index === study_length - 1) {
    dispatch({type: types.STUDY_SHOW_RESULTS});
  }
  dispatch({type: types.STUDY_INCREMENT_INDEX});
};

export const study_teardown = () => async (dispatch, getState) => {
  dispatch({type: types.STUDY_FINISHED});
  const state = getState();
  const {simple_study_decks} = state.dashboard;
  const {study_score, study_length, study_mode} = state.study;
  const score = Math.round((study_score / study_length) * 100);
  const register_study_session = functions.httpsCallable('register_study_session');
  register_study_session({
    score,
    deck_ids: study_mode === SIMPLE_STUDY ? simple_study_decks : [],
    is_smart: study_mode === SMART_STUDY,
  })
    .then(() => {});

  dispatch(push('/dashboard'));
};

export const engage_exam_mode = () => async (dispatch, getState) => {
  dispatch(add_loader('exam', 'Clearing your past sins...'));
  const engage = functions.httpsCallable('engage_exam_mode');
  await engage();
  dispatch(remove_loader('exam'));
};
