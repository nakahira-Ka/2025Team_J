import React, { useEffect, useState } from "react";
import "../css/ress.css";
import "../css/map.css";
import { useNavigate } from "react-router-dom";

// Firestore
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";

const Map = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Firestore テスト書き込み
  const addTest = async () => {
    try {
      await addDoc(collection(db, "recruitments"), {
        title: "テスト募集",
        createdAt: serverTimestamp(),
      });
      alert("Firestore 書き込み成功！");
    } catch (e) {
      alert("エラー: " + e.message);
    }
  };

  useEffect(() => {
    const loadMap = async () => {
      const center = { lat: 34.7063, lng: 135.5034 };

      const map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: center,
        disableDefaultUI: true, // ← Pegman対策
        clickableIcons: false,
      });

      // --- 固定ピン ---
      const fixedLocations = [
        { position: { lat: 34.7042, lng: 135.4978 }, title: "大阪駅" },
        { position: { lat: 34.7025, lng: 135.4959 }, title: "梅田スカイビル" },
        { position: { lat: 34.706054, lng: 135.500131 }, title: "ジャンカラ 茶屋町ty店" },
      ];

      fixedLocations.forEach((loc) => {
        const marker = new window.google.maps.Marker({
          position: loc.position,
          map: map,
          title: loc.title,
          icon: {
            url: "img/kari.png",
            scaledSize: new window.google.maps.Size(40, 40),
          },
        });

        marker.addListener("click", () => {
          setSelectedLocation({
            title: loc.title,
            description: "固定スポット",
          });
        });
      });

      // --- Firestore の募集データを取得してピン表示 ---
      try {
        const snapshot = await getDocs(collection(db, "recruitments"));
        snapshot.forEach((doc) => {
          const data = doc.data();

          // 緯度経度が無いデータはスキップ
          if (!data.lat || !data.lng) return;

          const marker = new window.google.maps.Marker({
            position: { lat: data.lat, lng: data.lng },
            map: map,
            title: data.shop,
            icon: {
              url: "img/kari.png",
              scaledSize: new window.google.maps.Size(40, 40),
            },
          });

          // クリックしたらモーダルに表示
          marker.addListener("click", () => {
            setSelectedLocation({
              title: data.shop,
              description: `目的：${data.purpose}<br>時間：${data.time}`,
            });
          });
        });
      } catch (e) {
        console.error("Firestore 読み込みエラー:", e);
      }
    };

    // Google Maps API 読み込み
    const script = document.createElement("script");
    const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`;
    script.async = true;
    window.initMap = loadMap;
    document.body.appendChild(script);
    console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
    return () => {
      delete window.initMap;
    };
  }, []);

  const closeModal = () => setSelectedLocation(null);
  const goToAddPage = () => navigate("/add");

  return (
    <main>
      <div id="map"></div>


      {/* Firestore テストボタン */}
      <button className="test-button" onClick={addTest}>
        Firestore テスト
      </button>

      {/* ＋追加ボタン */}
      <button className="add-button" onClick={goToAddPage}>
        ＋
      </button>

      {/* モーダル */}
      {selectedLocation && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedLocation.title}</h2>
            {/* HTMLを表示するため dangerouslySetInnerHTML */}
            <p dangerouslySetInnerHTML={{ __html: selectedLocation.description }} />
            <button onClick={closeModal}>閉じる</button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Map;
