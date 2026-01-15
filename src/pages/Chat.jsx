import React, { useState, useEffect, useRef } from "react";
import "../css/ress.css";
import "../css/chat.css";
import FooterNav from "../components/FooterNav";
import { db, storage } from "../firebase";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


// -------------- ヘッダー ---------------- //
const ChatHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="chat-header">
      <div className="chat-header-top" onClick={() => setOpen(!open)}>
        <h1>ボードゲームを楽しもう</h1>

        {!open && (
          <span className="material-symbols-outlined">keyboard_arrow_down</span>
        )}
        {open && (
          <span className="material-symbols-outlined">keyboard_arrow_up</span>
        )}
      </div>

      <div className={`chat-detail ${open ? "open" : ""}`}>
        <p>◯人</p>
        <p>11月25日18:00~20:00</p>
      </div>
    </div>
  );
};



// -------------- メイン Chat ---------------- //
const Chat = () => {
  const [text, setText] = useState("");
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const [modalImage, setModalImage] = useState(null);

  const galleryInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const bottomRef = useRef(null);

  // ---------------------------------------------
  // Firestore メッセージ取得（リアルタイム）
  // ---------------------------------------------
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);

      // 最新メッセージへスクロール
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    });

    return () => unsubscribe();
  }, []);

  // ---------------------------------------------
  // メッセージ送信
  // ---------------------------------------------
  const handleSend = async () => {
    if (text.trim() === "") return;

    await addDoc(collection(db, "messages"), {
      text: text,
      user: "user1",
      createdAt: serverTimestamp(),
    });

    setText("");
  };

  // ---------------------------------------------
  // 画像アップロード
  // ---------------------------------------------
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      await addDoc(collection(db, "messages"), {
        imageUrl: url,
        user: "user1",
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("画像アップロードエラー:", error);
    }
  };

  // ---------------------------------------------
  // スマホキーボード検知 & --vh対策
  // ---------------------------------------------
  useEffect(() => {
    const setAppHeight = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    setAppHeight();
    window.addEventListener("resize", setAppHeight);

    const initialHeight = window.innerHeight;
    const handleResize = () => {
      const currentHeight = window.innerHeight;
      setKeyboardOpen(currentHeight < initialHeight - 150);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", setAppHeight);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main className={keyboardOpen ? "keyboard-open" : ""}>
      <div className="chat-box">
        <ChatHeader />

        {/* メッセージ一覧 */}
        <div className="messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message-bubble ${
                msg.user === "user1" ? "right" : "left"
              }`}
            >
              {msg.text && <p>{msg.text}</p>}

              {msg.imageUrl && (
                <img
                  src={msg.imageUrl}
                  alt=""
                  className="chat-image"
                  onClick={() => setModalImage(msg.imageUrl)}
                />
              )}
            </div>
          ))}
          <div ref={bottomRef}></div>
        </div>

        {/* 隠し input */}
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={galleryInputRef}
          onChange={handleImageUpload}
        />

        <input
          type="file"
          accept="image/*"
          capture="environment"
          style={{ display: "none" }}
          ref={cameraInputRef}
          onChange={handleImageUpload}
        />

        {/* フッター */}
        <div className="chat-footer">
          <span
            className="material-symbols-outlined"
            onClick={() => galleryInputRef.current.click()}
          >
            photo
          </span>

          <span
            className="material-symbols-outlined"
            onClick={() => cameraInputRef.current.click()}
          >
            photo_camera
          </span>

          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="メッセージを入力"
          />

          <span className="material-symbols-outlined" onClick={handleSend}>
            send
          </span>
        </div>
      </div>

      {!keyboardOpen && <FooterNav />}

      {/* -------- モーダル（画像拡大） -------- */}
      {modalImage && (
        <div className="modal-overlay" onClick={() => setModalImage(null)}>
          <img src={modalImage} className="modal-image" />
        </div>
      )}
    </main>
  );
};

export default Chat;