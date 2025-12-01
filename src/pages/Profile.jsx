import React from "react";
import "../css/ress.css";
import "../css/profile.css";
import FooterNav from "../components/FooterNav";
import { Link } from "react-router-dom";


const Profile = () => {
  return (
    <main>
      <div className="profile-box">
        <div className="profile-main">
        <img src="/img/setting.png" alt="setting" />
          <img src="/img/profil.jpg" alt="icon" />
           <h1>ABCDEF</h1> {/*ユーザー名 */}
            <p>abcdef_1234</p>{/*ユーザーID */}
        </div>
      </div>
      <FooterNav />
    </main>
  );
};

export default Profile;












// import React, { useState } from "react";
// import "../css/ress.css";
// import "../css/profile.css";
// import FooterNav from "../components/FooterNav";

// const Profile = () => {
//  const [mode, setMode] = useState("view");  // "view" or "edit"
//   return (
//     <main>
//       <div className="profile-box">
//         <div className="profile-header">
//           {/* 戻るボタン: 編集画面の時だけ表示 */}
//           {mode === "edit" && (
//             <h2 onClick={() => setMode("view")} style={{ cursor: "pointer" }}>
//               ＜
//             </h2>
//           )}
//           {/* 設定アイコン: 通常画面の時だけ表示 */}
//           {mode === "view" && (
//             <img
//               src="/img/setting.png"
//               alt="設定"
//               onClick={() => setMode("edit")}
//               style={{ cursor: "pointer" }}
//             />
//           )}
//         </div>

//         {/* ====== メインエリア ====== */}
//         <div className="profile-main">
//           {mode === "view" && <ProfileView />}
//           {mode === "edit" && <ProfileEdit />}
//         </div>

//       </div>
      
//       <FooterNav />
//     </main>
//   );
// };

// const ProfileView = () => {
//   return <div>sdfg</div>;
// };
// const ProfileEdit = () => {
//   return <h1>ABCDEF</h1>;
//   <div>ここにプロフィール編集フォームを表示</div>;
// };

// export default Profile;
