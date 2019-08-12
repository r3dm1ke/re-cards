import {auth, provider} from '../firebase';
import * as types from './types';

export const login = () => async (dispatch, getState) => {
  const result = await auth.signInWithPopup(provider);

  const action = {
    type: types.LOGGED_IN,
    payload: result.user
  };
  dispatch(action);
};

export const logout = () => ({
  type: types.LOGGED_OUT
});