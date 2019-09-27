import {firestore} from '../firebase';
import {get_uid} from '../utils/auth';

export const validate_deck_name = async (deck_name) => {
  if (!validate_deck_name_not_empty(deck_name)) {
    return {
      ok: false,
      error: 'Deck name cannot be empty',
    };
  } else if (! await validate_deck_name_not_duplicate(deck_name)) {
    return {
      ok: false,
      error: 'There already exists a deck with this name',
    };
  }

  return {ok: true};
};

const validate_deck_name_not_empty = (deck_name) => deck_name !== '';
const validate_deck_name_not_duplicate = async (deck_name) => {
  const deck_ref = firestore.collection('decks')
    .where('uid', '==', get_uid())
    .where('subject', '==', deck_name);
  const docs = (await deck_ref.get()).docs;
  return docs.length === 0;
};
