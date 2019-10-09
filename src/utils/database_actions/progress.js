import firebase, {firestore} from '../../firebase';
import {get_uid} from '../auth';

export const save_progress =
  // eslint-disable-next-line max-params
  async (cards_count, decks_count, mastered_cards_count, study_mode) => {
    const uid = get_uid();
    const timestamp = firebase.firestore.Timestamp.now();
    const payload = {
      uid,
      timestamp,
      cards_count,
      decks_count,
      mastered_cards_count,
      study_mode,
    };
    const progress_ref = firestore.collection('progress');
    await progress_ref.add(payload);
  };
