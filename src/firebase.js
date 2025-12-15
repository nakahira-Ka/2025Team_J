// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "matchingplay-1b6be.firebaseapp.com",
    projectId: "matchingplay-1b6be",
    storageBucket: "matchingplay-1b6be.appspot.com",
    messagingSenderId: "510138932844",
    appId: "1:510138932844:web:231071be8393gda317c249"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
