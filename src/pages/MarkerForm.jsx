// src/pages/MarkerForm.jsx
import React, { useState } from "react";

const MarkerForm = ({ marker, onSave, onClose }) => {
    const [shop, setShop] = useState("");      // お店名
    const [time, setTime] = useState("");      // 集合時間
    const [purpose, setPurpose] = useState(""); // 目的

    const handleSave = () => {
        onSave({ ...marker, shop, time, purpose });
    };

    return (
        <div style={{ padding: "20px", border: "1px solid #ccc", marginTop: "10px" }}>
            <h3>募集情報入力</h3>
            <div>
                <label>お店の名前: </label>
                <input value={shop} onChange={(e) => setShop(e.target.value)} />
            </div>
            <div>
                <label>集合時間: </label>
                <input type="datetime-local" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
            <div>
                <label>目的: </label>
                <input value={purpose} onChange={(e) => setPurpose(e.target.value)} />
            </div>
            <button onClick={handleSave}>保存</button>
            <button onClick={onClose}>キャンセル</button>
        </div>
    );
};

export default MarkerForm;
