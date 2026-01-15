import React from "react";
import { Link } from "react-router-dom";
import "../css/ress.css";
import "../css/footer.css";

const FooterNav = () => {
  return (
    <footer>
      <div className="nav-box">
        <div className="nav-container">
          <ul className="nav">
            <li><Link to="/home"><img src="/img/home.png" alt="home" /></Link></li>
            <li><Link to="/home"><img src="/img/kennsaku.png" alt="search" /></Link></li>
            <li><Link to="/recruitment"><img src="/img/tuika.png" alt="add" /></Link></li>
            <li><Link to="/chat"><span className="material-symbols-outlined">chat</span></Link></li>
            <li><Link to="/profile"><span className="material-symbols-outlined">person</span></Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default FooterNav;