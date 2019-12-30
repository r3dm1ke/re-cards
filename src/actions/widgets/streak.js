import * as types from '../types';
import firebase, {messaging} from '../../firebase';
import {update_user_meta} from '../../utils/db/user';
import {error_happened} from '../errors';

export const notification_requested = () => async (dispatch) => {
  if (!are_notifications_allowed()) {
    dispatch(open_notification_permission_dialog());
  } else {
    dispatch(open_time_for_notification_dialog());
  }
};

const are_notifications_allowed = () => Notification.permission === 'granted';

export const request_notification_permission = () => async (dispatch) => {
  if (await Notification.requestPermission() === 'granted') {
    dispatch(close_notification_permission_dialog());
    dispatch(open_time_for_notification_dialog());
  }
};

export const open_notification_permission_dialog = () => ({
  type: types.NOTIFICATION_PERMISSION_DIALOG_OPENED,
});

export const close_notification_permission_dialog = () => ({
  type: types.NOTIFICATION_PERMISSION_DIALOG_CLOSED,
});

export const open_time_for_notification_dialog = () => ({
  type: types.TIME_FOR_NOTIFICATION_DIALOG_OPENED,
});

export const close_time_for_notification_dialog = () => ({
  type: types.TIME_FOR_NOTIFICATION_DIALOG_CLOSED,
});

export const time_for_notification_changed = (time_for_notification) => ({
  type: types.TIME_FOR_NOTIFICATION_CHANGED,
  payload: time_for_notification,
});

export const time_for_notification_submitted = () => async (dispatch, getState) => {
  try {
    const {time_to_notify} = getState().widgets.streak;
    const token = await get_token_with_timeout();
    await update_user_meta({
      notification_registration_token: token,
      notification_time: new firebase.firestore.Timestamp(time_to_notify.unix()),
      notification: true,
    });
  } catch (e) {
    dispatch(error_happened('Cannot schedule a notification. Nothing I can do at the moment.'));
  }
  dispatch(close_time_for_notification_dialog());
};

const get_token_with_timeout = async () => {
  return await Promise.any(
    new Promise((_, reject) => setTimeout(reject, 3000)),
    messaging.getToken()
  );
};
