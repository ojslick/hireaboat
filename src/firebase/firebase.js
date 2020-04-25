import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCEjp0hXVLpKHDiEon-YqtXhSZbR00oQ4o',
  authDomain: 'hireaboat-b6aa2.firebaseapp.com',
  databaseURL: 'https://hireaboat-b6aa2.firebaseio.com',
  projectId: 'hireaboat-b6aa2',
  storageBucket: 'hireaboat-b6aa2.appspot.com',
  messagingSenderId: '610733690161',
  appId: '1:610733690161:web:25b59d0eff8326a3193410',
  measurementId: 'G-FYYMX8731F'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exist) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// OAuth
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
