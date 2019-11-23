import firebase from 'firebase';
import {is_dev} from './utils/env';
const prod_config = {
  apiKey: 'AIzaSyDF_7xgM8nZoOSu4YNYWR-yaIibWKrHRrA',
  authDomain: 'flashcards-94116.firebaseapp.com',
  databaseURL: 'https://flashcards-94116.firebaseio.com',
  projectId: 'flashcards-94116',
  storageBucket: '',
  messagingSenderId: '644108685857',
  appId: '1:644108685857:web:3b20d30255704b06',
};

const dev_config = {
  apiKey: 'AIzaSyA64UEeRiG4vrdh_kGvm07vcdLL1kPPs5Y',
  authDomain: 're-cards-dev.firebaseapp.com',
  databaseURL: 'https://re-cards-dev.firebaseio.com',
  projectId: 're-cards-dev',
  storageBucket: 're-cards-dev.appspot.com',
  messagingSenderId: '230766994083',
  appId: '1:230766994083:web:2fd6e98544517d6bbf9516',
};

firebase.initializeApp(is_dev() ? dev_config : prod_config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase;
