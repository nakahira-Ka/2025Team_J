import React, { useState } from "react";

export default function MarkerForm({ marker, onSave, onCategoryChange }) {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [category, setCategory] = useState("ボードゲーム");
    const [count, setCount] = useState(1);
    const [price, setPrice] = useState(0);
    const [timeStart, setTimeStart] = useState("");
    const [timeEnd, setTimeEnd] = useState("");
    const [shop, setShop] = useState("");

    const validateAndSubmit = () => {
        if (!title.trim()) return alert("タイトルを入力してください（最大12文字）");
        if (title.length > 12) return alert("タイトルは12文字以内で入力してください");
        if (message.length > 100) return alert("一言メッセージは100文字以内で入力してください");
        if (!marker) return alert("地図で場所を選んでください");
        if (!timeStart || !timeEnd) return alert("開始・終了時間を入力してください");

        const payload = {
            title: title.trim(),
            message: message.trim(),
            category,
            count,
            price,
            time: `${timeStart}~${timeEnd}`,
            shop: shop.trim(),
            position: { lat: marker.lat, lng: marker.lng },
        };

        onSave(payload);
    };

    return (
        <div className="post-card">
            <h2 className="post-title">新規投稿</h2>

            <label className="label">タイトル（最大12文字）</label>
            <input
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={12}
            />

            <label className="label">一言メッセージ</label>
            <textarea
                className="textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={100}
            />

            <label className="label">カテゴリ</label>
            <div className="chip-row">
                <button
                    type="button"
                    className={`chip ${category === "ボードゲーム" ? "active" : ""}`}
                    onClick={() => {
                        setCategory("ボードゲーム");
                        onCategoryChange && onCategoryChange("ボードゲーム");
                    }}
                >
                    ボードゲーム
                </button>

                <button
                    type="button"
                    className={`chip ${category === "カラオケ" ? "active" : ""}`}
                    onClick={() => {
                        setCategory("カラオケ");
                        onCategoryChange && onCategoryChange("カラオケ");
                    }}
                >
                    カラオケ
                </button>
            </div>

            <div className="two-col">
                <div>
                    <label className="label">募集人数</label>
                    <div className="counter">
                        <button onClick={() => setCount(c => Math.max(1, c - 1))}>−</button>
                        <span>{count}</span>
                        <button onClick={() => setCount(c => Math.min(10, c + 1))}>＋</button>
                    </div>
                </div>

                <div>
                    <label className="label">金額（円）</label>
                    <div className="counter">
                        <button onClick={() => setPrice(p => Math.max(0, p - 100))}>−</button>
                        <span>{price}</span>
                        <button onClick={() => setPrice(p => p + 100)}>＋</button>
                    </div>
                </div>
            </div>

            <div className="two-col">
                <div>
                    <label className="label">開始</label>
                    <input
                        className="input"
                        type="datetime-local"
                        value={timeStart}
                        onChange={(e) => setTimeStart(e.target.value)}
                    />
                </div>
                <div>
                    <label className="label">終了</label>
                    <input
                        className="input"
                        type="datetime-local"
                        value={timeEnd}
                        onChange={(e) => setTimeEnd(e.target.value)}
                    />
                </div>
            </div>

            <label className="label">募集場所（店名）</label>
            <input
                className="input"
                value={shop}
                onChange={(e) => setShop(e.target.value)}
            />

            <div className="selected-pos">
                <label className="label">選択位置</label>
                <div className="pos-text">
                    {marker
                        ? `📍 ${marker.lat.toFixed(6)}, ${marker.lng.toFixed(6)}`
                        : "地図で選択してください"}
                </div>
            </div>

            <button className="submit-btn" onClick={validateAndSubmit}>
                投稿する
            </button>
        </div>
    );
}
