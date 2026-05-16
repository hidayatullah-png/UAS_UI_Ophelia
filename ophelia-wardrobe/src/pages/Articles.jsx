import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Articles() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch("/data/articles.json")
            .then((res) => res.json())
            .then((data) => setArticles(data))
            .catch((err) => console.error("Gagal memuat artikel:", err));
    }, []);

    const formatBadgeDate = (dateStr) => {
        if (!dateStr) return { month: "MAY", day: "10" };
        const parts = dateStr.split(" "); // memisahkan kata berdasarkan spasi
        const month = parts ? parts.substring(0, 3).toUpperCase() : "MAY";
        const day = parts ? parts.replace(",", "") : "10";
        return { month, day };
    };

    return (
        <div className="articles">
        </div>
    );
}