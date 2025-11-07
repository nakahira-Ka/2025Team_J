
// import React from "react";

// const FooterNav = () => {
//   return (
//     <footer>
//       <div className="nav-box">
//         <div className="nav-container">
//           <ul className="nav">
//             <li><img src="img/home.png" alt="home" /></li>
//             <li><img src="img/kennsaku.png" alt="search" /></li>
//             <li><img src="img/tuika.png" alt="add" /></li>
//             <li><img src="img/chat.png" alt="chat" /></li>
//             <li><img src="img/hito.png" alt="profile" /></li>
//           </ul>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default FooterNav;























import React from "react";
import { Link } from "react-router-dom";


const FooterNav = () => {
  return (
    <footer>
      <div className="nav-box">
        <div className="nav-container">
          <ul className="nav">
          <li><Link to="/map"><img src="/img/home.png" alt="home" /></Link></li>
          <li><Link to="/map"><img src="/img/kennsaku.png" alt="search" /></Link></li>
          <li><Link to="/map"><img src="/img/tuika.png" alt="add" /></Link></li>
          <li><Link to="/map"><img src="/img/chat.png" alt="chat" /></Link></li>
          <li><Link to="/map"><img src="/img/hito.png" alt="profile" /></Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default FooterNav;