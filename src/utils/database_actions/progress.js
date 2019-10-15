import firebase, {firestore} from '../../firebase';
import moment from 'moment-timezone';
import {get_uid} from '../auth';

export const save_progress =
  // eslint-disable-next-line max-params
  async (state) => {
    const uid = get_uid();
    const timestamp = firebase.firestore.Timestamp.now();
    const cards_count = state.cards.cards.length;
    const decks_count = state.decks.decks.length;
    const mastered_cards_count = state.cards.mastered_cards;
    const study_mode = state.study.study_mode;
    const streak = get_streak_count(state);
    const payload = {
      uid,
      timestamp,
      cards_count,
      decks_count,
      mastered_cards_count,
      study_mode,
      streak,
    };
    const progress_ref = firestore.collection('progress');
    await progress_ref.add(payload);
  };

const get_streak_count = (state) => {
  if (state.progress.progress !== undefined) {
    const last_progress = state.progress.progress[state.progress.progress.length - 1];
    const timezone = moment.tz.guess();
    const moment_last_progress_timestamp = moment.tz(last_progress.timestamp.seconds * 1000, timezone);
    const yesterday_timestamp = moment().subtract(1, 'days').hour(0).minute(0).second(0);
    const today_timestamp = moment().hour(0).minute(0).second(0);
    if (moment_last_progress_timestamp.isAfter(yesterday_timestamp) &&
        moment_last_progress_timestamp.isBefore(today_timestamp)
    ) {
      return last_progress.streak ? last_progress.streak + 1 : 1;
    }
  }
  return 1;
};

