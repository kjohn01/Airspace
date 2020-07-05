import { auth, firebase } from './firebaseConfig';

// Auth with Google

export const signInWithGoogle = () => new Promise((resolve) => {
  const provider = new firebase.auth.GoogleAuthProvider();

  // Use device language
  auth.useDeviceLanguage();

  // Oath2
  // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  resolve(auth.signInWithRedirect(provider));
});

// export const checkRedirectResult = () => auth.getRedirectResult().then((result) => {
//   if (result.credential) {
//   // This gives you a Google Access Token. You can use it to access the Google API.
//     const token = result.credential.accessToken;
//     console.log(`Signed in with token: ${token}`);
//   // ...
//   }
//   // The signed-in user info.
//   const { user } = result;
//   return user;
//   // TODO: Add user info to the firestore
// }).catch((error) => {
// // Handle Errors here.
//   const errorCode = error.code;
//   console.error(`Error Code: ${errorCode}`);
//   const errorMessage = error.message;
//   console.error(`Error Msg: ${errorMessage}`);
//   // The email of the user's account used.
//   const { email } = error;
//   console.error(`email :${email}`);
//   // The firebase.auth.AuthCredential type that was used.
//   const { credential } = error;
//   console.error(`credential: ${credential}`);
// // ...
// });

export const signOut = () => {
  if (!auth.currentUser) console.error('Already signed out');
  auth.signOut();
  return null;
  // TODO: clear user presence on firestore
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
