// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // if using authentication
import { getFirestore } from "firebase/firestore"; // if using Firestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJ0fU0SNavj0Ugl7oWDch6BxIihLR4kE8",
  authDomain: "authvalidator-44333.firebaseapp.com",
  projectId: "authvalidator-44333",
  storageBucket: "authvalidator-44333.firebasestorage.app",
  messagingSenderId: "999290075588",
  appId: "1:999290075588:web:2d1f5f8936c52ea26b0c91",
  measurementId: "G-13BZBJJMR1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);      // export auth if needed
export const db = getFirestore(app);   // export Firestore if needed
export default app;