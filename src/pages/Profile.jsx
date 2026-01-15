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