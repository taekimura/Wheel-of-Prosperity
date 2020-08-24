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
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
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

//Array(12)
// 0: {category: "Rejuvenation", value: 5}
// 1: {category: "Embrace", value: 5}
// 2: {category: "Lifestyle", value: 7}
// 3: {category: "Self", value: 6}
// 4: {category: "Relationship", value: 7}
// 5: {category: "Family", value: 6}
// 6: {category: "Inspiration", value: 4}
// 7: {category: "Creativity", value: 3}
// 8: {category: "Health", value: 6}
// 9: {category: "Money", value: 5}
// 10: {category: "Work", value: 7}
// 11: {category: "Expansion", value: 5}

// export const createUserProfileDocument = async (additionalData) => {
//     if (!userAuth) return;

//     const userRef = firestore.doc('results');
//     const snapShot = await userRef.get();

//     if (!snapShot.exists) {
//         const results = {
//             0: { category: "Rejuvenation", value: 10 },
//             1: { category: "Embrace", value: 10 },
//             2: { category: "Lifestyle", value: 10 },
//             3: { category: "Self", value: 10 },
//             4: { category: "Relationship", value: 10 },
//             5: { category: "Family", value: 10 },
//             6: { category: "Inspiration", value: 10 },
//             7: { category: "Creativity", value: 10 },
//             8: { category: "Health", value: 10 },
//             9: { category: "Money", value: 10 },
//             10: { category: "Work", value: 10 },
//             11: { category: "Expansion", value: 10 },
//         }
//         const createdAt = new Date();

//         try {
//             await userRef.set({
//                 createdAt,
//                 results
//             });
//         } catch (error) {
//             console.log("Error creating user. ", error.message);
//         }
//     }
//     return userRef;
// }
// firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();