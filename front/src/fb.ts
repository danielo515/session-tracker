import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
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
const firebase = initializeApp(firebaseConfig);

export default firebase;
