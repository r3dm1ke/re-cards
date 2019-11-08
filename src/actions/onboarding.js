import * as types from './types';
import {A_TEXT, Q_MATH} from '../const/cards';
import {firestore} from '../firebase';
import {load_user_info} from './auth';
import {add_loader, remove_loader} from './mics';
import {create_card} from '../utils/db/cards';

const SAMPLE_CARD = {
  question_type: Q_MATH,
  question: '2 + 2 * 2',
  answer_type: A_TEXT,
  answer: '6',
  validation_required: true,
  mastered: false,
};

export const deck_name_changed = (deck_name) => ({
  type: types.ONBOARDING_DECK_NAME_CHANGED,
  payload: deck_name,
});

export const onboard_user = () => async (dispatch, getState) => {
  dispatch(add_loader('meta', 'Creating your profile...'));
  const state = getState();
  const {new_deck_name} = state.onboarding;
  const {uid} = state.auth.user;
  dispatch(update_user_meta());
  const new_deck = await create_default_deck(new_deck_name, uid);
  await create_default_card(new_deck, uid);
  dispatch(remove_loader('meta'));
};

const update_user_meta = () => async (dispatch, getState) => {
  dispatch(add_loader('meta_save', 'Saving your profile'));
  const {uid} = getState().auth.user;
  const ref = firestore.collection('users');
  const doc = ref.doc(uid);
  await doc.set({onboarded: true}, {merge: true});
  dispatch(load_user_info(uid));
  dispatch(remove_loader('meta_save'));
};

const create_default_deck = async (new_deck_name, uid) => {
  const ref = firestore.collection('decks');
  const deck_name = new_deck_name === '' ? 'Sample Deck' : new_deck_name;
  return await ref.add({subject: deck_name, uid});
};

const create_default_card = async (deck, uid) => {
  return await create_card({
    ...SAMPLE_CARD,
    uid,
    deck,
  });
};
