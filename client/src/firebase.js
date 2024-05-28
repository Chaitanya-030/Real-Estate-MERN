// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-897f7.firebaseapp.com",
  projectId: "real-estate-897f7",
  storageBucket: "real-estate-897f7.appspot.com",
  messagingSenderId: "412264677506",
  appId: "1:412264677506:web:8453330c8f364f3475749b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);