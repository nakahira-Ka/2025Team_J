import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

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
        styles: [
          {
            featureType: "poi",
            elementType: "all",
            stylers: [{ visibility: "off" }]
          },
          {
            featureType: "poi.park",
            elementType: "all",
            stylers: [{ visibility: "on" }]
          },
          {
            featureType: "transit",
            elementType: "all",
            stylers: [{ visibility: "off" }]
          },
        ],
      });

      // ECC マーカー
      const eccMarker = new window.google.maps.Marker({
        position: ecc,
        map: map,
        title: "ECCコンピュータ専門学校",
        icon: {
          url: "/img/kari.png",
          scaledSize: new window.google.maps.Size(40, 40),
        },
      });

      //マーカークリック → 下部に情報表示
      eccMarker.addListener("click", () => {
        setSelectedPlace({
          dayandtime:"11月25日18:00~20:00",
          name: "ボードゲームを楽しもう",
          address: "大阪市北区中崎西2丁目",
          description: "初めての人でも歓迎",
          price:"1人1000円",
        });
      });

      // ★ 現在地取得
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

            map.setCenter(currentPos);
          },
          (error) => {
            console.error("現在地を取得できませんでした:", error);
          }
        );
      }
    };

    // Google Maps API読み込み
    const script = document.createElement("script");
    const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`;
    script.async = true;
    window.initMap = loadMap;
    document.body.appendChild(script);
    return () => {
      delete window.initMap;
    };
  }, []);

  return (
    <>
      <div id="map"></div>

      {selectedPlace && (
        <div id="info-box">
        <button className="close-btn" onClick={() => setSelectedPlace(null)}>×</button>
        <h2>{selectedPlace.name}</h2>
        <p>{selectedPlace.dayandtime}</p>
        <p>住所　{selectedPlace.address}</p>
        <p>値段　{selectedPlace.price}</p>
        <p>{selectedPlace.description}</p>
        <p className="join-btn"><Link to="/chat">参加する</Link></p>
      </div>
      
      )}
    </>
  );
};

export default Map;