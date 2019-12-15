import * as types from '../types';

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
