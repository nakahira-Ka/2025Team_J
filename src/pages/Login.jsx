import React from "react";
import "../css/ress.css";
import "../css/index.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="top">
      <Link to="/home">
        <h1>あそ募</h1>
      </Link>
    </div>
  );
};

export default Login;
