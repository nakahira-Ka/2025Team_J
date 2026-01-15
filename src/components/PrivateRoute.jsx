import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect, useState } from "react";

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      console.log("PrivateRoute: 認証状態変更", currentUser);
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  // 認証状態確認中はローディング表示
  if (user === undefined) {
    return <div>読み込み中...</div>;
  }

  // 未ログインなら Login に戻す
  if (!user) {
    console.log("PrivateRoute: 未ログインのため / にリダイレクト");
    return <Navigate to="/" replace />;
  }

  console.log("PrivateRoute: ログイン済み、children を表示");
  return children;
};

export default PrivateRoute;