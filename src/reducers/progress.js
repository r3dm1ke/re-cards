import * as types from '../actions/types';
import moment from 'moment-timezone';

const INITIAL_STATE = {
  progress: undefined,
  last_progress: undefined,
  studied_today: false,
  streak: 0,
};

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
  case types.PROGRESS_LOADED:
    return {
      ...state,
      progress: action.payload,
      last_progress: action.payload[action.payload.length - 1],
      studied_today: did_study_today(action.payload[action.payload.length - 1]),
      streak: is_progress_from_yesterday(action.payload[action.payload.length - 1]) ?
        action.payload[action.payload.length - 1].streak :
        0,
    };
  default:
    return state;
  }
};

const did_study_today = (last_progress) => {
  if (last_progress !== undefined) {
    const today_moment = moment().hours(0).minutes(0).seconds(0);
    const timezone = moment.tz.guess();
    const last_progress_moment = moment.tz(last_progress.timestamp.seconds * 1000, timezone);
    return last_progress_moment.isAfter(today_moment);
  }
  return false;
};

const is_progress_from_yesterday = (last_progress) => {
  if (last_progress !== undefined) {
    const yesterday_moment = moment().subtract(1, 'days').hours(0).minutes(0).seconds(0);
    const timezone = moment.tz.guess();
    const last_progress_moment = moment.tz(last_progress.timestamp.seconds * 1000, timezone);
    return last_progress_moment.isAfter(yesterday_moment);
  }
  return false;
};

