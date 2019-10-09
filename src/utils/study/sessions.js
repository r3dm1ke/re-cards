import firebase, {firestore} from '../../firebase';
import {get_uid} from '../auth';

export const register_study_session = (deck_ids, score, is_smart) => {
  const uid = get_uid();
  const timestamp = firebase.firestore.Timestamp.now();
  const deck_ref = firestore.collection('decks');
  const deck_refs = deck_ids.map((id) => deck_ref.doc(id));
  const entry = {
    payload: deck_refs,
    score,
    timestamp,
    type: is_smart ? 'smart' : 'simple',
    uid,
  };
  const history_ref = firestore.collection('history');
  return history_ref.add(entry);
};
