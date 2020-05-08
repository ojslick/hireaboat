import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import history from '../history';

const config = {
  apiKey: 'AIzaSyCEjp0hXVLpKHDiEon-YqtXhSZbR00oQ4o',
  authDomain: 'hireaboat-b6aa2.firebaseapp.com',
  databaseURL: 'https://hireaboat-b6aa2.firebaseio.com',
  projectId: 'hireaboat-b6aa2',
  storageBucket: 'hireaboat-b6aa2.appspot.com',
  messagingSenderId: '610733690161',
  appId: '1:610733690161:web:25b59d0eff8326a3193410',
  measurementId: 'G-FYYMX8731F',
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
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocument = async (
  collectionKey,
  objectsToAdd,
  boatImages,
  currentUser
) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  const newDocRef = collectionRef.doc();
  const response = await batch.set(newDocRef, objectsToAdd);
  if (response) {
    history.push('/listaboat/successful');
  }

  const imagesUpload = [];

  const updateImage = async (image) => {
    const path = `users/${currentUser.id}/images/${Math.round(
      Math.random() * 1000000000
    )}.jpg`;
    const blob = new Blob(image, { type: 'mime' });
    const storageRef = firebase.storage().ref();
    try {
      const task = await storageRef.child(path).put(blob);
      console.log('task--->>>', task);

      // task.ref.getDownloadURL().then(downloadURL => {
      //   console.log('downloadUrl===>', downloadURL);
      //   newDocRef.update({ images: [downloadURL, downloadURL ]});
      // });

      const imageRes = await task.ref.getDownloadURL();
      imagesUpload.push(imageRes);
      console.log('imageRes---->>>>', imageRes);
      await newDocRef.update({ images: imagesUpload });
    } catch (errorr) {
      console.log('ohew--->>>', errorr);
    }
  };

  const updateImageArray = async (imageArray) => {
    try {
      const responses = Promise.all(
        imageArray.map(async (image) => {
          await updateImage(image);
        })
      );
      console.log('responses---->>>', responses);
      return responses;
    } catch (error) {
      console.log('error occurred', error);
    }
  };

  updateImageArray(boatImages);

  return await batch.commit();
};

export const addContactForm = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  const newDocRef = collectionRef.doc();
  await batch.set(newDocRef, objectsToAdd);
  console.log('collectionRef===>', collectionRef);
  console.log('objectsToAdd===>', objectsToAdd);
  return await batch.commit();
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// OAuth
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
