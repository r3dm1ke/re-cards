import * as types from '../actions/types';
import {firestore} from '../firebase';
import {push} from 'connected-react-router';
import {add_loader, remove_loader} from "./mics";

let unsubscribe;

export const subscribe_to_cards = () => async (dispatch, getState) => {
  const {uid} = getState().auth.user;
  unsubscribe = firestore.collection('cards')
    .where('uid', '==', uid)
    .onSnapshot(async query => {
      const data = [];
      for (const q of query.docs) {
        const card_data = q.data();
        card_data.id = q.id;
        const deck_data = await card_data.deck.get();
        card_data.deckName = deck_data.data().subject;
        data.push(card_data);
      }
      dispatch({
        type: types.CARDS_LOADED,
        payload: data
      })
    });
};

export const open_cards = () => async (dispatch, getState) => {
  dispatch({
    type: types.ADD_LOADER,
    payload: {
      handle: 'cards',
      description: 'Loading your cards...'
    }
  });

  dispatch(push('/cards'));

  dispatch({
    type: types.REMOVE_LOADER,
    payload: 'cards'
  })
};

export const open_cards_for_deck = (deckId) => async (dispatch, getState) => {
  dispatch({
    type: types.SELECTED_DECK,
    payload: deckId
  });
  dispatch(open_cards());
}

export const deck_selected = deckId => async (dispatch, getState) => {
  dispatch({
    type: types.SELECTED_DECK,
    payload: deckId
  });
};

export const open_edit_card_dialog = () => ({
  type: types.OPEN_EDIT_CARD_DIALOG
});

export const open_edit_card_dialog_for_new_card = () => async (dispatch, getState) => {
  const {selected_deck} = getState().cards;
  dispatch({
    type: types.EDIT_CARD_DIALOG_ID_CHANGED,
    payload: ''
  });
  dispatch(edit_card_dialog_deck_changed(selected_deck === 'all' ? '' : selected_deck));
  dispatch(edit_card_dialog_answer_changed(''));
  dispatch(edit_card_dialog_question_changed(''));
  dispatch(open_edit_card_dialog());
};

export const open_edit_card_dialog_for_existing_card = card => async (dispatch, getState) => {
  console.log(card);
  dispatch({
    type: types.EDIT_CARD_DIALOG_ID_CHANGED,
    payload: card.id
  });
  dispatch(edit_card_dialog_deck_changed(card.deck.id));
  dispatch(edit_card_dialog_answer_changed(card.answer));
  dispatch(edit_card_dialog_question_changed(card.question));
  dispatch(edit_dialog_validation_required_changed(card.validation_required));
  dispatch(edit_dialog_question_type_changed(card.question_type));
  dispatch(open_edit_card_dialog());
};

export const edit_card_dialog_question_changed = question => ({
  type: types.EDIT_CARD_DIALOG_QUESTION_CHANGED,
  payload: question
});

export const edit_card_dialog_answer_changed = answer => ({
  type: types.EDIT_CARD_DIALOG_ANSWER_CHANGED,
  payload: answer
});

export const edit_card_dialog_deck_changed = deck => ({
  type: types.EDIT_CARD_DIALOG_DECK_CHANGED,
  payload: deck
});

export const delete_card_from_dialog = () => async (dispatch, getState) => {
  dispatch(add_loader('del_card', 'Deleting...'));
  const state = getState();
  const {edit_dialog_id} = state.cards;

  if (edit_dialog_id !== '') {
    const ref = firestore.collection('cards').doc(edit_dialog_id);
    await ref.delete();
  }
  dispatch({
    type: types.CLOSE_EDIT_CARD_DIALOG
  });
  dispatch(remove_loader('del_card'));
};

export const save_card_from_dialog = () => async (dispatch, getState) => {
  const state = getState();
  const {
    edit_dialog_question,
    edit_dialog_answer,
    edit_dialog_deck,
    edit_dialog_id,
    edit_dialog_question_type,
    edit_dialog_validation_required
  } = state.cards;
  const {uid} = state.auth.user;

  dispatch({
    type: types.ADD_LOADER,
    payload: {
      handle: 'add_card',
      description: 'Saving...'
    }
  });
  dispatch(close_edit_card_dialog());

  const deckRef = firestore.collection('decks').doc(edit_dialog_deck);

  const data = {
    answer: edit_dialog_answer,
    question: edit_dialog_question,
    uid,
    deck: deckRef,
    total: 0,
    score: 0,
    ratio: 0,
    validation_required: edit_dialog_validation_required,
    question_type: edit_dialog_question_type
  };

  if (edit_dialog_id === '' || edit_dialog_id === null || edit_dialog_id === undefined) {
    const ref = firestore.collection('cards');
    await ref.add(data)
  } else {
    const ref = firestore.collection('cards').doc(edit_dialog_id);
    await ref.set(data, {merge: true})
  }

  dispatch({
    type: types.REMOVE_LOADER,
    payload: 'add_card'
  });
};

export const edit_dialog_question_type_changed = q_type => ({
  type: types.EDIT_CARD_DIALOG_QUESTION_TYPE_CHANGED,
  payload: q_type
});

export const edit_dialog_validation_required_changed = validation_required => ({
  type: types.EDIT_CARD_DIALOG_VALIDATION_REQUIRED_CHANGED,
  payload: validation_required
});

export const close_edit_card_dialog = () => ({
  type: types.CLOSE_EDIT_CARD_DIALOG
});