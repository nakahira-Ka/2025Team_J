import React, { useState, useEffect, useRef } from "react";
import {
    GoogleMap,
    Marker,
    useJsApiLoader,
    StandaloneSearchBox
} from "@react-google-maps/api";

import MarkerForm from "./MarkerForm";
import { saveRecruitment } from "../firebaseFunctions";
import { useNavigate } from "react-router-dom";
import FooterNav from "../components/FooterNav";
import "../css/recruitment.css";

const mapContainerStyle = { width: "100%", height: "350px" };

export default function Recruitment() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ["places"]
    });

    const [currentPos, setCurrentPos] = useState(null);
    const [marker, setMarker] = useState(null);

    // ★ カテゴリーの状態
    const [category, setCategory] = useState("ボードゲーム");

    const searchBoxRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                pos => {
                    setCurrentPos({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                },
                () => {
                    setCurrentPos({ lat: 34.6937, lng: 135.5023 });
                }
            );
        } else {
            setCurrentPos({ lat: 34.6937, lng: 135.5023 });
        }
    }, []);

    const onMapClick = (e) => {
        setMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    };

    const onPlacesLoad = ref => {
        searchBoxRef.current = ref;
    };

    const onPlacesChanged = () => {
        const places = searchBoxRef.current.getPlaces();
        if (!places || places.length === 0) return;
        const place = places[0];
        if (!place.geometry) return;

        const loc = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        };
        setMarker(loc);
        setCurrentPos(loc);
    };

    const handleSave = async (formData) => {
        const toSave = {
            ...formData,
            position: marker || formData.position || null
        };

        if (!toSave.position) {
            alert("地図で場所を選択してください");
            return;
        }

        try {
            await saveRecruitment(toSave);
            navigate("/home");
        } catch (e) {
            console.error(e);
            alert("保存に失敗しました");
        }
    };

    // ★ カテゴリ別の画像切り替え
    const getMarkerIcon = () => {
        if (category === "ボードゲーム") return "/img/boardgame_on.png";
        if (category === "カラオケ") return "/img/karaoke_on.png";
        return "/img/boardgame_on.png";
    };

    if (!isLoaded || !currentPos) return <div>Loading...</div>;

    return (
        <div className="recruit-page" style={{ paddingBottom: 100 }}>
            <div className="map-area">
                <div className="searchbox-wrapper">
                    <StandaloneSearchBox onLoad={onPlacesLoad} onPlacesChanged={onPlacesChanged}>
                        <input
                            type="text"
                            placeholder="場所を検索"
                            className="search-box-input"
                        />
                    </StandaloneSearchBox>
                </div>

                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={currentPos}
                    zoom={16}
                    onClick={onMapClick}
                >
                    {marker && (
                        <Marker
                            position={marker}
                            icon={{
                                url: getMarkerIcon(),
                                scaledSize: new window.google.maps.Size(40, 40)
                            }}
                        />
                    )}
                </GoogleMap>
            </div>

            <MarkerForm
                marker={marker}
                onSave={handleSave}
                onCategoryChange={(cat) => setCategory(cat)}
            />

            <FooterNav />
        </div>
    );
}
