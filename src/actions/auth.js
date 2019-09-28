import firebase, {auth, provider, firestore} from '../firebase';
import * as types from './types';
import {push} from 'connected-react-router';
import {open_dashboard} from './dashboard';
import {add_subscribers} from '../utils/listeners';
import {add_loader, remove_loader} from './mics';
import {error_happened} from './errors';

const app_initialized = () => ({
  type: types.APP_INITIALIZED,
});

export const init = () => async (dispatch) => {
  auth.onAuthStateChanged((user) => {
    console.log(`auth state changed ${user}`);
    dispatch(app_initialized());
    if (user) {
      dispatch(add_loader('loading', 'Loading...'));
      const action = {
        type: types.LOGGED_IN,
        payload: user,
      };
      dispatch(action);
      dispatch(open_dashboard());
      dispatch(add_subscribers());
      dispatch(remove_loader('loading'));
    }
  });
  try {
    await set_persistence_async();
  } catch {
    dispatch(error_happened('Error initializing local storage. Are you a developer?'));
  }
};

const set_persistence_async = async () => {
  try {
    await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    await firestore.enablePersistence();
  } catch (e) {
    // eslint-disable-next-line fp/no-throw
    throw e;
  }
};


export const login = () => async (dispatch) => {
  dispatch(add_loader('login', 'Logging in...'));
  try {
    await auth.signInWithPopup(provider);
  } catch {
    dispatch(error_happened('Error while logging in. Are you sure you are you?'));
  }
  dispatch(remove_loader('login'));
};

export const logout = () => async (dispatch) => {
  await auth.signOut();
  dispatch({
    type: types.LOGGED_OUT,
  });
  dispatch(push('/'));
};
