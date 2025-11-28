// src/pages/firebaseFunctions.js
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const saveMarkerToFirestore = async (markerData) => {
    try {
        await addDoc(collection(db, "recruitments"), {
            ...markerData,
            createdAt: serverTimestamp(),
        });
        console.log("マーカーをFirestoreに保存しました");
    } catch (e) {
        console.error("Firestore保存エラー:", e);
        throw e;
    }
};
