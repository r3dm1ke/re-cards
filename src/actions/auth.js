import firebase, {auth, provider, firestore} from '../firebase';
import * as types from './types';
import {push} from 'connected-react-router';
import {open_dashboard} from './dashboard';
import {add_subscribers} from '../utils/listeners';
import {add_loader, remove_loader} from './mics';
import {error_happened} from './errors';
import {DEFAULT_USER_METADATA} from '../const/user';

const app_initialized = () => ({
  type: types.APP_INITIALIZED,
});

export const init = () => async (dispatch, getState) => {
  const state = getState();
  if (!state.auth.app_initialized) {
    auth.onAuthStateChanged((user) => {
      console.log(`auth state changed ${user}`);
      dispatch(app_initialized());
      if (user) {
        dispatch(add_loader('loading', 'Loading...'));
        dispatch({type: types.LOGGED_IN, payload: user});
        dispatch(load_user_info(user.uid));
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
  }
};

const load_user_info = (uid) => async (dispatch) => {
  console.log(`Loading_user_info for user ${uid}`);
  dispatch(add_loader('user_meta', 'Loading your information...'));
  try {
    const ref = firestore.collection('users');
    const doc = await ref.doc(uid).get();
    const data = doc.data();
    dispatch({type: types.USER_METADATA_LOADED, payload: data});
  } catch {
    dispatch(create_user_info(uid));
  }
  dispatch(remove_loader('user_meta'));
};

const create_user_info = (uid) => async (dispatch) => {
  const ref = firestore.collection('users');
  const doc = ref.doc(uid);
  doc.set(DEFAULT_USER_METADATA).then(() => {});
  dispatch({type: types.USER_METADATA_LOADED, payload: DEFAULT_USER_METADATA});
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
