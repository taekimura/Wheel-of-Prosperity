import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId
};

export const getAllResults = async () => {
    const snapshot = await firestore.collection('results').get();
    return snapshot.docs.map(doc => doc.data());
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const role = "user"
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
}

firebase.initializeApp(config);
export default firebase


export const auth = firebase.auth();
export const firestore = firebase.firestore();