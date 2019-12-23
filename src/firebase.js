import firebase from 'firebase';
import {messaging_supported} from './utils/env';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_MEASUREMENT_ID,
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const firestore = firebase.firestore();

let messaging = undefined;
if (messaging_supported()) {
  // eslint-disable-next-line fp/no-mutation
  messaging = firebase.messaging();
  messaging.usePublicVapidKey(process.env.REACT_APP_VAPID_KEY);
}
export {messaging};

export default firebase;
