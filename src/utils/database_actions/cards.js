import moment from 'moment-timezone';
import {firestore} from '../../firebase';

export const create_card = async (card_data) => {
  return await firestore.collection('cards').add(card_data);
};

export const update_card = async (card_id, card_data) => {
  const ref = firestore.collection('cards').doc(card_id);
  return await ref.set(card_data, {merge: true});
};

export const delete_card = async (card_id) => {
  const ref = firestore.collection('cards').doc(card_id);
  return await ref.delete();
};

export const listen_to_cards = (uid, callback) => {
  return firestore.collection('cards')
    .where('uid', '==', uid)
    .onSnapshot(async (query) => {
      const data = await extract_cards_from_docs_async(query);
      callback(data);
    });
};

export const extract_card_from_ref_async = async (card) => {
  const raw_card_data = card.data();
  const deck_data = await raw_card_data.deck.get();
  const card_data = {
    ...raw_card_data,
    id: card.id,
    deck_name: deck_data.data().subject,
    eligible_for_smart_study: true,
  };
  if (card_data.last_studied && card_data.s_r_deck) {
    const timezone = moment.tz.guess();
    const {last_studied, s_r_deck} = card_data;
    const moment_last_studied = moment.tz(last_studied.seconds * 1000, timezone);
    const moment_repetition_due = moment_last_studied.clone();
    moment_repetition_due.add(s_r_deck, 'days')
      .hour(0).minute(0).second(0);
    const smart_study_advisable = moment().isAfter(moment_repetition_due);
    return {
      ...card_data,
      last_studied: moment_last_studied,
      repetition_due: moment_repetition_due,
      eligible_for_smart_study: smart_study_advisable,
    };
  }
  return card_data;
};

export const extract_cards_from_docs_async = async (cards) => {
  return await Promise.all(cards.docs.map(async (q) => ({...(await extract_card_from_ref_async(q))})));
};
