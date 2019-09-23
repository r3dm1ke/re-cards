import firebase, {auth, provider, firestore} from '../firebase';
import * as types from './types';
import {push} from 'connected-react-router';
import {open_dashboard} from './dashboard';
import {add_subscribers} from '../utils/listeners';
import {add_loader, remove_loader} from './mics';

export const init = () => async (dispatch, getState) => {
  auth.onAuthStateChanged((user) => {
    console.log(`auth state changed ${user}`);
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
  await set_persistence_async();
};

const set_persistence_async = async () => {
  await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  await firestore.enablePersistence();
};


export const login = () => async (dispatch, getState) => {
  dispatch(add_loader('login', 'Logging in...'));
  await auth.signInWithPopup(provider);
  dispatch(remove_loader('login'));
};

export const logout = () => async (dispatch, getState) => {
  await auth.signOut();
  dispatch({
    type: types.LOGGED_OUT,
  });
  dispatch(push('/'));
};
