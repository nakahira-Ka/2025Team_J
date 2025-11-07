import React, { useEffect } from "react";
import "../css/ress.css";
import "../css/map.css";
import FooterNav from "../components/FooterNav";

const Map = () => {
  useEffect(() => {
    // Google Maps初期化
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

      // ECCマーカー
      new window.google.maps.Marker({
        position: ecc,
        map: map,
        title: "ECCコンピュータ専門学校",
        icon: {
          url: "img/kari.png",
          scaledSize: new window.google.maps.Size(40, 40),
        },
      });

      // 現在地取得処理
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // 現在地座標を変数に格納
            const currentPos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            // 現在地マーカーを追加
            new window.google.maps.Marker({
              position: currentPos,
              map: map,
              title: "現在地",
              icon: {
                url: "img/hito.png", // 自作アイコン
                scaledSize: new window.google.maps.Size(40, 40),
              },
            });

            // 現在地を地図の中心に
            map.setCenter(currentPos);
          },
          (error) => {
            console.error("現在地を取得できませんでした:", error);
          }
        );
      } else {
        console.error("このブラウザは位置情報をサポートしていません。");
      }
    };

    // Google Maps APIを読み込み
    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAuGKjTtiGSbAFW-ky8XUw4tMqXh7b-7vk&callback=initMap";
    script.async = true;
    window.initMap = loadMap;
    document.body.appendChild(script);

    return () => {
      delete window.initMap;
    };
  }, []);

  return (
    <main>
      <div id="map"></div>
      <FooterNav />
    </main>
  );
};

export default Map;
