// src/pages/Recruitment.jsx
import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import MarkerForm from "./MarkerForm"; // フォームコンポーネント
import FooterNav from "../components/FooterNav";
import { saveMarkerToFirestore } from "./firebaseFunctions";

const containerStyle = { width: "100%", height: "400px" };
const center = { lat: 34.6937, lng: 135.5023 }; // 大阪初期位置

export default function Recruitment() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // ご自身のAPIキーに置き換え
    });

    const [marker, setMarker] = useState(null); // 選択したピン
    const [showForm, setShowForm] = useState(false); // フォーム表示

    // マップクリックでピンを設定
    const handleMapClick = (event) => {
        setMarker({
            position: { lat: event.latLng.lat(), lng: event.latLng.lng() },
        });
        setShowForm(true);
    };

    // フォーム保存処理
    const handleSave = async (data) => {
        await saveMarkerToFirestore(data); // Firestoreに保存
        setMarker(null);
        setShowForm(false);
    };

    if (!isLoaded) return <div>Loading Map...</div>;

    return (
        <div>
            <h2>募集作成ページ</h2>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                onClick={handleMapClick}
            >
                {marker && <Marker position={marker.position} />}
            </GoogleMap>

            {showForm && (
                <MarkerForm
                    marker={marker}
                    onSave={handleSave}
                    onClose={() => setShowForm(false)}
                />
            )}

            <FooterNav />
        </div>
    );
}

