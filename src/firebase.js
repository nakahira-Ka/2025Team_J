// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAD0F65voelrHwbo1guiCRP7V0gI_QfL9Y",
  // apiKey: "AIzaSyDjDzuveYRJhZQR1BF8JQli9pnYupewpmSc",
  authDomain: "teamprj-3b76f.firebaseapp.com",
  projectId: "teamprj-3b76f",
  storageBucket: "teamprj-3b76f.firebasestorage.app",
  messagingSenderId: "76899211170",
  appId: "1:76899211170:web:af3e358254700b8de0c4fb",
  measurementId: "G-J9GC2EX0ER",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
