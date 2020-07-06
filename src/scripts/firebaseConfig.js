import firebase from 'firebase';

const Config = {
  apiKey: 'AIzaSyAwCZKA_lr8ekB9qP2kPqj9rUBM2kbUE80',
  authDomain: 'my-dropbox-410ec.firebaseapp.com',
  databaseURL: 'https://my-dropbox-410ec.firebaseio.com',
  projectId: 'my-dropbox-410ec',
  storageBucket: 'my-dropbox-410ec.appspot.com',
  messagingSenderId: '594029495494',
  appId: '1:594029495494:web:a8714805de4cbf9f6b43c7',
  measurementId: 'G-87LDYRXNN2',
};

if (!firebase.apps.length) {
  firebase.initializeApp(Config);
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export {
  auth,
  firestore,
  storage,
  firebase,
};
