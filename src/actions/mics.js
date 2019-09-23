import * as types from './types';

export const add_loader = (handle, description) => ({
  type: types.ADD_LOADER,
  payload: {handle, description},
});

export const remove_loader = (handle) => ({
  type: types.REMOVE_LOADER,
  payload: handle,
});

export const show_alert = (title, description) => ({
  type: types.SHOW_ALERT,
  payload: {title, description},
});

export const hide_alert = () => ({
  type: types.HIDE_ALERT,
});
