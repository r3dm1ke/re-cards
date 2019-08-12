import * as types from './types';

export const add_loader = (handle, description) => ({
  type: types.ADD_LOADER,
  payload: {handle, description}
}) ;

export const remove_loader = handle => ({
  type: types.REMOVE_LOADER,
  payload: handle
});