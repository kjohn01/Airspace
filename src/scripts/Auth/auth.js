import { auth, firebase } from '../firebaseConfig';
import { clearOnlinePresence, detachListener } from '../database';

// Auth with Google

export const signInWithGoogle = () => new Promise((resolve) => {
  const provider = new firebase.auth.GoogleAuthProvider();

  // Use device language
  auth.useDeviceLanguage();

  // Oath2
  // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  resolve(auth.signInWithRedirect(provider));
});

export const signOut = async () => {
  if (!auth.currentUser) console.error('Already signed out');
  else {
    const { uid } = auth.currentUser;
    await clearOnlinePresence(uid).then(() => auth.signOut());
  }
  return null;
};

const getAuthUser = (user) => {
  if (user) {
    // eslint-disable-next-line no-param-reassign
    user = {
    // providerData: user.providerData,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
    };
  }
  return user;
};

export const listenForAuthUser = (updateUser) => {
  auth.onAuthStateChanged((user) => updateUser(getAuthUser(user)));
};
