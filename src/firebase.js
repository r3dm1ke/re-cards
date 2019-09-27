import firebase from 'firebase';
const config = {
  apiKey: 'AIzaSyDF_7xgM8nZoOSu4YNYWR-yaIibWKrHRrA',
  authDomain: 'flashcards-94116.firebaseapp.com',
  databaseURL: 'https://flashcards-94116.firebaseio.com',
  projectId: 'flashcards-94116',
  storageBucket: '',
  messagingSenderId: '644108685857',
  appId: '1:644108685857:web:3b20d30255704b06',
};
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const functions = firebase.functions();
export const firestore = firebase.firestore();
export default firebase;
