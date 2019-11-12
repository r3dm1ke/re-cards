import moment from 'moment-timezone';
import {firestore} from '../../firebase';
import {get_uid} from '../auth';

export const create_card = async (card_data) => {
  return await get_cards_collection().add(card_data);
};

export const update_card = async (card_id, card_data) => {
  const ref = get_card_ref('card_id');
  return await ref.set(card_data, {merge: true});
};

export const delete_card = async (card_id) => {
  const ref = get_card_ref(card_id);
  return await ref.delete();
};

export const delete_cards_by_deck = async (deck_ref) => {
  const uid = get_uid();
  const cardRefs = get_cards_collection()
    .where('deck', '==', deck_ref)
    .where('uid', '==', uid);

  return await delete_cards(await cardRefs.get());
};

const delete_cards = async (card_refs) => {
  const batch = firestore.batch();
  card_refs.docs.forEach((card) =>
    batch.delete(get_card_ref(card.id))
  );
  return await batch.commit();
};

export const get_card_ref = (card_id) => {
  return get_cards_collection().doc(card_id);
};

const get_cards_collection = () => firestore.collection('cards');

export const listen_to_cards = (callback) =>
  get_cards_collection()
    .where('uid', '==', get_uid())
    .onSnapshot(async (query) => {
      const data = await extract_cards_from_docs_async(query);
      callback(data);
    });

const extract_card_from_ref_async = async (card) => {
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

const extract_cards_from_docs_async = async (cards) => {
  return await Promise.all(cards.docs.map(async (q) => ({...(await extract_card_from_ref_async(q))})));
};
