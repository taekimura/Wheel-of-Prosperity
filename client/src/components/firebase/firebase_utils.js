import firebase from 'firebase/app';
import 'firebase/firestore';
// import 'firebase/auth';


const config = {
    apiKey: "AIzaSyBntLJTapoFfSKw6keTZ3HTZe9ng8icaJM",
    authDomain: "universal-properity.firebaseapp.com",
    databaseURL: "https://universal-properity.firebaseio.com",
    projectId: "universal-properity",
    storageBucket: "universal-properity.appspot.com",
    messagingSenderId: "411296466831",
    appId: "1:411296466831:web:9fc869e600bc5ad7d06dfa",
    measurementId: "G-NVTYDLFLZW"
};

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

// export const auth = firebase.auth();
// export const firestore = firebase.firestore();