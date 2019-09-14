import firebase, {auth, provider, firestore} from '../firebase';
import * as types from './types';
import {push} from 'connected-react-router';
import {open_dashboard} from "./dashboard";

// Subscribers
import {subscribe_to_trends} from "./trend";
import {subscribe_to_cards} from "./cards";
import {subscribe_to_decks} from "./decks";
import {subscribe_to_worst_cards} from "./worst_cards";

export const init = () => async (dispatch, getState) => {
  auth.onAuthStateChanged(user => {
    console.log(`auth state changed ${user}`);
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
      dispatch(add_subscribers());
      dispatch({
        type: types.REMOVE_LOADER,
        payload: 'loading'
      });
    }
  });
  await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  await firestore.enablePersistence();
};

const add_subscribers = () => async (dispatch, getState) => {
  dispatch(subscribe_to_decks());
  dispatch(subscribe_to_cards());
  dispatch(subscribe_to_trends());
  dispatch(subscribe_to_worst_cards());
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