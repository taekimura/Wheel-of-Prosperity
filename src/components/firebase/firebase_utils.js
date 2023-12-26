import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_APP_MEASUREMENT_ID
};

export const getAllResults = async () => {
  const snapshot = await firestore
    .collection('results')
    .orderBy('createdAt', 'desc')
    .get();
  return snapshot.docs.map((doc) => doc.data());
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const role = 'user';
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        role,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('Error creating user. ', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);
export default firebase;

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
