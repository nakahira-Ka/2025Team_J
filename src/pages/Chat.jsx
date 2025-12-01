// import React from "react";
// import { useState } from "react";
// import "../css/ress.css";
// import "../css/chat.css";
// import FooterNav from "../components/FooterNav";
// // import { Link } from "react-router-dom";


// const Chat = () => {
//   const [text, setText] = useState("");
//   return (
//     <main>
//     <div className="chat-box">
//     <div className="chat-header">
//       <h1>ボードゲームを楽しもう</h1>
//       <div className="chat-detail">
//         <p>◯人</p>
//         <p>11月25日18:00~20:00</p>
//       </div>
//     </div>
//     <div className="chat-main">
//     {text}
//     </div>
//     <div className="chat-footer">
//       <span className="material-symbols-outlined">photo</span>
//       <span className="material-symbols-outlined">photo_camera</span>
//       <input type="text" value={text} onChange={(event) => setText(event.target.value)}placeholder="メッセージを入力"></input>
//       <span className="material-symbols-outlined">send</span>
//     </div>
//     </div>
//       <FooterNav />
//     </main>
//   );
// };

// export default Chat;

















import React, { useState, useEffect } from "react";
import "../css/ress.css";
import "../css/chat.css";
import FooterNav from "../components/FooterNav";

const ChatHeader = () => {
  const [open, setOpen] = useState(false);

  const toggleDetail = () => {
    setOpen(!open);
  };

  return (
    <div className="chat-header">
      <div className="chat-header-top" onClick={toggleDetail}>
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

const Chat = () => {
  const [text, setText] = useState("");
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const initialHeight = window.innerHeight;

    const handleResize = () => {
      const currentHeight = window.innerHeight;
      setKeyboardOpen(currentHeight < initialHeight - 150);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className={keyboardOpen ? "keyboard-open" : ""}>
      <div className="chat-box">

        {/* ← ここで ChatHeader を表示 */}
        <ChatHeader />

        <div className="chat-main">
          {text}
        </div>

        <div className="chat-footer">
          <span className="material-symbols-outlined">photo</span>
          <span className="material-symbols-outlined">photo_camera</span>

          <input
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="メッセージを入力"
          />

          <span className="material-symbols-outlined">send</span>
        </div>
      </div>

      {!keyboardOpen && <FooterNav />}
    </main>
  );
};

export default Chat;
