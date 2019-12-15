import * as types from '../../actions/types';
import moment from 'moment-timezone';

const INITIAL_STATE = {
  time_to_notify: null,
  dialog_opened: false,
};

const reducer = (state=INITIAL_STATE, {type, payload}) => {
  switch (type) {
  case types.TIME_FOR_NOTIFICATION_DIALOG_OPENED:
    return {...state, dialog_opened: true, time_to_notify: moment().add(2, 'hours')};
  case types.TIME_FOR_NOTIFICATION_DIALOG_CLOSED:
    return {...state, dialog_opened: false};
  case types.TIME_FOR_NOTIFICATION_CHANGED:
    return {...state, time_to_notify: payload};
  default:
    return state;
  }
};

export default reducer;
