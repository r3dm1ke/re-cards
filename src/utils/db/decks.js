import {firestore} from '../../firebase';

const get_decks_collection = () => firestore.collection('decks');

export const get_decks_ref = (deck_id) => get_decks_collection().doc(deck_id);

export const listen_to_decks = (uid, callback) =>
  get_decks_collection()
    .where('uid', '==', uid)
    .onSnapshot(async (query) => {
      const data = extract_decks_from_docs(query);
      callback(data);
    });

export const create_deck = async (data) => {
  const collection = get_decks_collection();
  return await collection.add(data);
};

export const update_deck = async (id, data) => {
  const ref = get_decks_ref(id);
  return await ref.set(data, {merge: true});
};

export const delete_deck = async (id) => {
  const ref = get_decks_ref(id);
  return await ref.delete();
};


const extract_deck_from_ref = (deck) => {
  const raw_deck_data = deck.data();
  return {id: deck.id, name: raw_deck_data.subject, uid: raw_deck_data.uid};
};

const extract_decks_from_docs = (decks) =>
  decks.docs.map((deck) => extract_deck_from_ref(deck));

