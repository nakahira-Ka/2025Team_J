// src/pages/Map.jsx
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const Map = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    const loadMap = () => {
      const ecc = { lat: 34.70634877320853, lng: 135.50347567743663 };

      const map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 17,
        center: ecc,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        zoomControl: false,
        scaleControl: false,
        rotateControl: false,
        clickableIcons: false,
      });

      // ECC マーカー
      new window.google.maps.Marker({
        position: ecc,
        map: map,
        title: "ECCコンピュータ専門学校",
        icon: {
          url: "/img/kari.png",
          scaledSize: new window.google.maps.Size(40, 40),
        },
      });

      // Firestore からマーカーを表示
      const postsRef = collection(db, "posts");

      onSnapshot(postsRef, (snapshot) => {
        // 既存マーカーを消したい場合はここで管理する必要あり（簡易実装は毎回消す -> 再描画）
        // 簡易：全部消してから再描画（小〜中規模ならOK）
        // ここでは map に紐づくマーカーを配列で保管していないため、簡素に new だけ行います。
        snapshot.docs.forEach((doc) => {
          const data = doc.data();

          if (!data.position) return;

          // アイコン選定：pinColor（既定）優先、なければ purpose/category による分岐
          let iconUrl = "/img/boardgame_on.png"; // default
          if (data.pinColor) {
            // もし pinColor が "blue" / "red" 等なら google の dot を使う
            iconUrl = `http://maps.google.com/mapfiles/ms/icons/${data.pinColor}-dot.png`;
          } else {
            const cat = data.category || data.purpose || "";
            if (cat === "カラオケ") iconUrl = "/img/karaoke_on.png";
            else if (cat === "ボードゲーム") iconUrl = "/img/boardgame_on.png";
          }

          new window.google.maps.Marker({
            position: data.position,
            map: map,
            title: data.title || data.shop || "",
            icon: {
              url: iconUrl,
              scaledSize: new window.google.maps.Size(40, 40),
            },
            // クリックで info を設定
            // クリックハンドラは即下の selectedPlace 操作につなげる
            // ※ 注意: ここで closure を使って setSelectedPlace を呼ぶと map 上のクリックで反応します
            // ただし anonymous function が増えるとパフォーマンスに影響する場合あり
          }).addListener("click", function () {
            setSelectedPlace(data);
          });
        });
      });

      // 現在地
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const currentPos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            new window.google.maps.Marker({
              position: currentPos,
              map: map,
              title: "現在地",
              icon: {
                url: "/img/hito.png",
                scaledSize: new window.google.maps.Size(40, 40),
              },
            });

            // map.setCenter(currentPos); // 中心は固定したい場合はコメント解除
          },
          (error) => {
            console.error("現在地を取得できませんでした:", error);
          }
        );
      }
    };

    // Google Maps API読み込み（既に読み込まれている場合は2重追加しないでください）
    if (!window.google) {
      const script = document.createElement("script");
      const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`;
      script.async = true;
      window.initMap = loadMap;
      document.body.appendChild(script);
      return () => {
        delete window.initMap;
      };
    } else {
      loadMap();
    }
  }, []);

  return (
    <>
      <div id="map" style={{ width: "100%", height: "100vh" }}></div>

      {selectedPlace && (
        <div id="info-box">
          <button className="close-btn" onClick={() => setSelectedPlace(null)}>×</button>
          <h2>{selectedPlace.name || selectedPlace.title || selectedPlace.shop}</h2>
          <p>{selectedPlace.dayandtime || selectedPlace.time}</p>
          <p>住所　{selectedPlace.address || ""}</p>
          <p>値段　{selectedPlace.price || ""}</p>
          <p>{selectedPlace.description || selectedPlace.message}</p>
          <p className="join-btn"><Link to="/chat">参加する</Link></p>
        </div>
      )}
    </>
  );
};

export default Map;
