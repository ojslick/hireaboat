import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import history from '../history';
import BoatingQualification from '../components/CaptainProfileEdit/BoatingQualification/BoatingQualification';

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
      await userRef.update({
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

export const updateUserProfile = async (userAuth, additionalData) => {
  const userRef = firestore.doc(`users/${userAuth.id}`);
  const batch = firestore.batch();

  await batch.update(userRef, additionalData);
  return await batch.commit();
};

// upload user photo
export const uploadUserPhoto = async (userAuth, additionalData) => {
  const userRef = firestore.doc(`users/${userAuth.id}`);
  const updateImage = async (image) => {
    const path = `users/${userAuth.id}/profile-image/${Math.round(
      Math.random() * 1000000000
    )}.jpg`;
    const blob = new Blob(image, { type: 'mime' });
    const storageRef = firebase.storage().ref();

    try {
      const task = await storageRef.child(path).put(blob);
      console.log('task--->>>', task);

      const imageRes = await task.ref.getDownloadURL();

      console.log('imageRes---->>>>', imageRes);
      await userRef.update({ images: imageRes });
    } catch (errorr) {
      console.log('ohew--->>>', errorr);
    }
  };

  const updateImageArray = async (image) => {
    try {
      const response = await updateImage(image);
      console.log('responses---->>>', response);
      return response;
    } catch (error) {
      console.log('error occurred', error);
    }
  };

  return await updateImageArray(additionalData);
};

export const uploadBoatingQualification = async (
  userAuth,
  boatingResume,
  captainLicense
) => {
  console.log('captainLicense==> ', captainLicense);
  console.log('boatingQualification==>', boatingResume);
  const userRef = firestore.doc(`users/${userAuth.id}`);

  const batch = firestore.batch();

  await batch.update(userRef, boatingResume);

  const updateImage = async (image) => {
    const path = `users/${userAuth.id}/profile-image/${Math.round(
      Math.random() * 1000000000
    )}.jpg`;
    const blob = new Blob(image, { type: 'mime' });
    const storageRef = firebase.storage().ref();

    try {
      const task = await storageRef.child(path).put(blob);
      console.log('task--->>>', task);

      const imageRes = await task.ref.getDownloadURL();

      console.log('imageRes---->>>>', imageRes);
      await userRef.update({ captainLicense: imageRes });
    } catch (errorr) {
      console.log('ohew--->>>', errorr);
    }
  };

  const updateImageArray = async (image) => {
    try {
      const response = await updateImage(image);
      console.log('responses---->>>', response);
      return response;
    } catch (error) {
      console.log('error occurred', error);
    }
  };

  updateImageArray(captainLicense);
  return await batch.commit();
};

export const addCollectionAndDocument = async (
  collectionKey,
  objectsToAdd,
  boatImages,
  currentUser
) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  const newDocRef = collectionRef.doc(`${currentUser.id}`);

  const newCollectionRef = newDocRef.collection('userBoats');

  const newRef = newCollectionRef.doc();
  const response = await batch.set(newRef, objectsToAdd);
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
      await newRef.update({ images: imagesUpload });
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
