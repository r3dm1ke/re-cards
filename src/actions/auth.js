import firebase, {auth, provider, firestore} from '../firebase';
import * as types from './types';
import {push} from 'connected-react-router';
import {open_dashboard} from "./dashboard";

export const init = () => async (dispatch, getState) => {
  auth.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: types.ADD_LOADER,
        payload: {
          handle: 'loading',
          description: 'Loading...'
        }
      });
      const action = {
        type: types.LOGGED_IN,
        payload: user
      };
      dispatch(action);
      dispatch(open_dashboard());
      dispatch({
        type: types.REMOVE_LOADER,
        payload: 'loading'
      });
    }
  });
  await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  await firestore.enablePersistence();
};

export const login = () => async (dispatch, getState) => {
  dispatch({
    type: types.ADD_LOADER,
    payload: {
      handle: 'login',
      description: 'Logging in...'
    }
  });
  await auth.signInWithPopup(provider);
  dispatch({
    type: types.REMOVE_LOADER,
    payload: 'login'
  });
};

export const logout = () => async (dispatch, getState) => {
  await auth.signOut();
  dispatch({
    type: types.LOGGED_OUT
  });
  dispatch(push('/'));
};