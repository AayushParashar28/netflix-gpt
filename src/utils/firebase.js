// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkYz0dvmHVwauZyY4DscQfx2gDGs9kqO8",
  authDomain: "netflix-gpt-48110.firebaseapp.com",
  projectId: "netflix-gpt-48110",
  storageBucket: "netflix-gpt-48110.firebasestorage.app",
  messagingSenderId: "841226781814",
  appId: "1:841226781814:web:0a47518c9c7eeb0296cb57",
  measurementId: "G-03008NX560"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(analytics)

export const auth = getAuth();