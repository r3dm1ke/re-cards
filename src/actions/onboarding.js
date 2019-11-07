import * as types from './types';

export const deck_name_changed = (deck_name) => ({
  type: types.ONBOARDING_DECK_NAME_CHANGED,
  payload: deck_name,
});
