import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,  } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwale-N1V-NWS_ALLHf7q4jFqp4AESSZM",
  authDomain: "teddlo-mvp.firebaseapp.com",
  projectId: "teddlo-mvp",
  storageBucket: "teddlo-mvp.appspot.com",
  messagingSenderId: "163293705772",
  appId: "1:163293705772:web:1b53bbf0d2df84c07fc389",
  measurementId: "G-S5JQ9EG8RT"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { app, db, auth }