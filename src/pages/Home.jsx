// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { subscribeRecruitments } from "../firebaseFunctions";
import FooterNav from "../components/FooterNav";
import "../css/home.css";

const mapStyle = { width: "100%", height: "100vh" };

// 表示カテゴリ一覧（あとで増やすだけでOK）
const ALL_CATEGORIES = ["カラオケ", "ボードゲーム"];

export default function Home() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"]
  });

  const [currentPos, setCurrentPos] = useState({ lat: 34.6937, lng: 135.5023 });
  const [recruitments, setRecruitments] = useState([]);
  const [selected, setSelected] = useState(null);

  // ★ 表示中のカテゴリー ("all" ですべて表示)
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    // 現在地取得
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        setCurrentPos({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }

    // Firestore リアルタイム購読
    const unsub = subscribeRecruitments(items => {
      setRecruitments(items);
    });

    return () => unsub && unsub();
  }, []);

  if (!isLoaded) return <div>Loading map...</div>;

  // ★ カテゴリーごとにアイコン切替
  const getMarkerIcon = (category) => {
    if (category === "カラオケ") return "/img/karaoke_on.png";
    if (category === "ボードゲーム") return "/img/boardgame_on.png";
    return "/img/boardgame_on.png";
  };

  // ★ 選択されたカテゴリーだけ表示
  const filteredRecruitments = recruitments.filter(r => {
    const category = r.category || r.purpose;
    if (!r.position) return false;

    // "all" の場合は全部表示
    if (selectedCategory === "all") return true;

    return category === selectedCategory;
  });

  return (
    <div className="home-container">

      {/* --- カテゴリーフィルターUI --- */}
      <div
        style={{
          padding: "10px",
          display: "flex",
          gap: "10px",
          background: "#fff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          zIndex: 10,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0
        }}
      >
        <button
          onClick={() => setSelectedCategory("all")}
          style={{
            padding: "6px 12px",
            borderRadius: "999px",
            background: selectedCategory === "all" ? "#007bff" : "#e6e6e6",
            color: selectedCategory === "all" ? "#fff" : "#333",
            border: "none",
            fontWeight: 600
          }}
        >
          すべて
        </button>

        {ALL_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "6px 12px",
              borderRadius: "999px",
              background: selectedCategory === cat ? "#007bff" : "#e6e6e6",
              color: selectedCategory === cat ? "#fff" : "#333",
              border: "none",
              fontWeight: 600
            }}
          >
            {cat}
          </button>
        ))}

        <div style={{ marginLeft: "auto", fontSize: 14, color: "#555" }}>
          表示件数：{filteredRecruitments.length}
        </div>
      </div>

      {/* --- Google Map --- */}
      <GoogleMap mapContainerStyle={mapStyle} center={currentPos} zoom={14}>
        {filteredRecruitments.map(r => {
          const category = r.category || r.purpose;
          return (
            <Marker
              key={r.id}
              position={r.position}
              icon={{
                url: getMarkerIcon(category),
                scaledSize: new window.google.maps.Size(40, 40)
              }}
              onClick={() => setSelected(r)}
            />
          );
        })}
      </GoogleMap>

      {/* --- モーダル --- */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selected.title || selected.shop || "募集"}</h3>
            <p>{selected.message}</p>
            <p>カテゴリ: {selected.category || selected.purpose}</p>
            <p>人数: {selected.memberCount ?? "-"}名</p>
            <p>金額: {selected.price} 円</p>
            <p>時間: {selected.time}</p>
            <p>場所: {selected.shop}</p>
            <button onClick={() => setSelected(null)}>閉じる</button>
          </div>
        </div>
      )}

      <FooterNav />
    </div>
  );
}
