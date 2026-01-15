// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Recruitment from "./pages/Recruitment";
// import Chat from "./pages/Chat";
// import Profile from "./pages/Profile"; 


// const App = () => {
//   return (
//     <Router>
//       <Routes>
        
//         <Route path="/home" element={<Home />} />
//         <Route path="/recruitment" element={<Recruitment />} />
//         <Route path="/chat" element={<Chat />} />
//         <Route path="/profile" element={<Profile />} />
//       </Routes>
//     </Router>
//   );
// };


// export default App;








import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Recruitment from "./pages/Recruitment";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ログイン画面 */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* ログイン必須エリア */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/recruitment"
          element={
            <PrivateRoute>
              <Recruitment />
            </PrivateRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
