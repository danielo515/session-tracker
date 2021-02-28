// @ts-check

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics';

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/database';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  appId: process.env.REACT_APP_FB_APP_ID,
  databaseURL: process.env.REACT_APP_FB_DATABASE_URL,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: 'time-tracker-a0213',
  storageBucket: 'time-tracker-a0213.appspot.com',
  messagingSenderId: '858753867825',
  measurementId: 'G-SHEYGKGY9P',
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
firebase.analytics();

export default firebase;
