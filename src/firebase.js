// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import {
//   getAuth,
//   GoogleAuthProvider,
//   setPersistence,
//   browserLocalPersistence,
// } from "firebase/auth";

// const firebaseConfig = {
//   // apikey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//   apiKey: process.env.REACT_APP_Firebase_API_KEY,
//   authDomain: "teamprj-3b76f.firebaseapp.com",
//   projectId: "teamprj-3b76f",
//   storageBucket: "teamprj-3b76f.firebasestorage.app",
//   messagingSenderId: "76899211170",
//   appId: "1:76899211170:web:af3e358254700b8de0c4fb",
//   measurementId: "G-J9GC2EX0ER",  
// };

// const app = initializeApp(firebaseConfig);

// export const db = getFirestore(app);
// export const storage = getStorage(app);

// export const auth = getAuth(app);

// setPersistence(auth, browserLocalPersistence);

// export const provider = new GoogleAuthProvider();






import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apikey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  apiKey: process.env.REACT_APP_Firebase_API_KEY,
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

export const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Persistence設定エラー:", error);
});

export const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account'
});