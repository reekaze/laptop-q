// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBT_kRDFVXZrzGe31VPPH5VmI8MCkZAevM",
  authDomain: "laptop-q.firebaseapp.com",
  projectId: "laptop-q",
  storageBucket: "laptop-q.appspot.com",
  messagingSenderId: "467734320370",
  appId: "1:467734320370:web:305ded9f2789b2d9bf2c6b",
  measurementId: "G-BSYJVGX0NX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
