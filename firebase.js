// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7GPtSDuNFuFPoyHJCQPweOVNgT0rGyV4",
  authDomain: "talkit-1a494.firebaseapp.com",
  projectId: "talkit-1a494",
  storageBucket: "talkit-1a494.appspot.com",
  messagingSenderId: "435587983164",
  appId: "1:435587983164:web:fcbb485035879e129aa039",
  measurementId: "G-TBG1JDPSWH",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const storage = getStorage(app);
