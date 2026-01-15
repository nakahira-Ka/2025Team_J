// src/components/InfoModal.jsx
import React from "react";
import "../css/modal.css";

export default function InfoModal({ data, onClose }) {
    if (!data) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>{data.title || data.shop || "募集"}</h3>
                <p>{data.message}</p>
                <p>カテゴリ: {data.purpose}</p>
                <p>人数: {data.memberCount} / 金額: {data.price}円</p>
                <p>時間: {data.time}</p>

                <button className="close-btn" onClick={onClose}>閉じる</button>
            </div>
        </div>
    );
}
