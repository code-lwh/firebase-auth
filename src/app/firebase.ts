import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAbD5y37-JyoTN_5cJi2yw0n0fhVcNiPjY",
  authDomain: "restapi-8f3da.firebaseapp.com",
  projectId: "restapi-8f3da",
  storageBucket: "restapi-8f3da.appspot.com",
  messagingSenderId: "726954115061",
  appId: "1:726954115061:web:5925bc7f639a86ea62aabc",
  measurementId: "G-GH44ZGLLRB"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const storage = firebase.storage();
export const firestore = firebase.firestore();

export default firebase;