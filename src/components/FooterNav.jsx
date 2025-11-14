import React from "react";
import { Link } from "react-router-dom";


const FooterNav = () => {
  return (
    <footer>
      <div className="nav-box">
        <div className="nav-container">
          <ul className="nav">
          <li><Link to="/login"><img src="/img/home.png" alt="home" /></Link></li>
          <li><Link to="/home"><img src="/img/kennsaku.png" alt="search" /></Link></li>
          <li><Link to="/home"><img src="/img/tuika.png" alt="add" /></Link></li>
          <li><Link to="/home"><img src="/img/chat.png" alt="chat" /></Link></li>
          <li><Link to="/home"><img src="/img/hito.png" alt="profile" /></Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default FooterNav;