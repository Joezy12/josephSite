// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCw0zj-H6dM6PS9oEG-JQoCYHARgWP3LDw",
  authDomain: "banking-72257.firebaseapp.com",
  projectId: "banking-72257",
  storageBucket: "banking-72257.firebasestorage.app",
  messagingSenderId: "631869022656",
  appId: "1:631869022656:web:8c8bbec340b4010f872825",
  measurementId: "G-XXCW46C5Q7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app)
const analytics = getAnalytics(app);
export default app;
