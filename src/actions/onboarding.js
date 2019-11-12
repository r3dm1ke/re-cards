import * as types from './types';
import {A_TEXT, Q_MATH} from '../const/cards';
import {firestore} from '../firebase';
import {add_loader, remove_loader} from './mics';
import {create_card} from '../utils/db/cards';
import {update_user_meta} from '../utils/db/user';
import {get_uid} from '../utils/auth';
import {create_deck} from '../utils/db/decks';

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
  await update_user_meta({onboarded: true});
  const new_deck = await create_default_deck(new_deck_name);
  await create_default_card(new_deck);
  dispatch(remove_loader('meta'));
};

const create_default_deck = async (new_deck_name) => {
  const deck_name = new_deck_name === '' ? 'Sample Deck' : new_deck_name;
  return await create_deck({subject: deck_name, uid: get_uid()});
};

const create_default_card = async (deck) => {
  return await create_card({
    ...SAMPLE_CARD,
    uid: get_uid(),
    deck,
  });
};
