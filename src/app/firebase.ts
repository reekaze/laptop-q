// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "laptop-q.firebaseapp.com",
  projectId: "laptop-q",
  storageBucket: "laptop-q.appspot.com",
  messagingSenderId: "467734320370",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-BSYJVGX0NX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
