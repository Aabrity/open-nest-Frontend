// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-b6034.firebaseapp.com",
  projectId: "mern-estate-b6034",
  storageBucket: "mern-estate-b6034.firebasestorage.app",
  messagingSenderId: "89245580770",
  appId: "1:89245580770:web:a997c6910a2f6649280dbb",
  measurementId: "G-CWM8J08PPE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);