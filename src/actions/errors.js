import * as types from './types';

export const error_happened = (description) => ({
  type: types.ERROR_HAPPENED,
  payload: {description},
});

export const error_dismissed = (index) => ({
  type: types.ERROR_DISMISSED,
  payload: index,
});
