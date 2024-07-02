// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7GPtSDuNFuFPoyHJCQPweOVNgT0rGyV4",
  authDomain: "talkit-1a494.firebaseapp.com",
  projectId: "talkit-1a494",
  storageBucket: "talkit-1a494.appspot.com",
  messagingSenderId: "435587983164",
  appId: "1:435587983164:web:fcbb485035879e129aa039",
  measurementId: "G-TBG1JDPSWH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);