import * as types from '../types';
import firebase, {messaging} from '../../firebase';
import {update_user_meta} from '../../utils/db/user';
import {error_happened} from '../errors';

export const subscribe_to_notification_key = () => async (dispatch) => {
  messaging.onTokenRefresh(() => {
    messaging.getToken().then((token) => {
      console.log(`Got notification token: ${token}`);
      update_user_meta({notification_registration_token: token})
        .then(() => {})
        .catch((e) => dispatch(error_happened('Could not enable notifications')));
    });
  });
};

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
  const {time_to_notify} = getState().widgets.streak;
  await update_user_meta({
    notification_time: new firebase.firestore.Timestamp(time_to_notify.unix()),
  });
  dispatch(close_time_for_notification_dialog());
};