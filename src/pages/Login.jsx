import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/home"); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="top">
      <h1>あそ募</h1>

      <button className="google-login" onClick={handleGoogleLogin}>
        <img
          src="/img/web_neutral_sq_SI@1x.png"
          alt="Sign in with Google"
        />
      </button>
    </div>
  );
};

export default Login;
