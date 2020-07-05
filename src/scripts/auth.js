import { auth, firebase } from '../../firebaseConfig';

// Auth with Google
const provider = new firebase.auth.GoogleAuthProvider();

// Use device language
auth.useDeviceLanguage();

// Oath2
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

auth.signInWithRedirect(provider);
auth.getRedirectResult().then((result) => {
  if (result.credential) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const token = result.credential.accessToken;
    // ...
  }
  // The signed-in user info.
  const { user } = result;
}).catch((error) => {
  // Handle Errors here.
  const errorCode = error.code;
  const errorMessage = error.message;
  // The email of the user's account used.
  const { email } = error;
  // The firebase.auth.AuthCredential type that was used.
  const { credential } = error;
  // ...
});
