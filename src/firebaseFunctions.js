import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export const saveRecruitment = async (data) => {
    // data.position: { lat, lng }
    await addDoc(collection(db, "recruitments"), {
        title: data.title || "",
        message: data.message || "",
        purpose: data.category || "",
        shop: data.shop || "",
        memberCount: data.count || 1,
        price: data.price || 0,
        time: data.time || "",
        position: data.position || null,
        createdAt: serverTimestamp(),
    });
};

export const subscribeRecruitments = (onUpdate) => {
    const q = query(collection(db, "recruitments"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        onUpdate(items);
    });
};
