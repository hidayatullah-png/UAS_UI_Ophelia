import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Articles() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        // 🛠️ PERBAIKAN 1: Path fetch di-hardcode ke repository GitHub Pages
        fetch("/UAS_UI_Ophelia/data/article.json")
            .then((res) => res.json())
            .then((data) => setArticles(data))
            .catch((err) => console.error("Gagal memuat artikel:", err));
    }, []);

    const formatBadgeDate = (dateStr) => {
        if (!dateStr) return { month: "MAY", day: "10" };
        const parts = dateStr.split(" ");
        // parts = "May", parts = "10,"  parts = "2025"
        const month = parts ? parts.substring(0, 3).toUpperCase() : "MAY";
        const day = parts ? parts.replace(",", "") : "10";

        return { month, day };
    };

    return (
        <div className="journal">
            <div className="journal-banner" style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.25)), url('/UAS_UI_Ophelia/assets/journal-hero.png') no-repeat center center`,
                backgroundSize: 'cover'
            }}>
                <div className="journal-hero-overlay">
                    <h1>ARTICLES</h1>
                    <p>.✦ ݁˖ Explore the latest insights, styling guides, and subcultural updates from Ophelia .✦ ݁˖</p>
                </div>
            </div>
            <div className="journal-content">
                <div className="journal-filter">
                    <div className="filter-left-title">
                        <h3>Latest Publications</h3>
                    </div>
                    <div className="filter-right-views">
                        <button className="view-toggle-btn active-view">
                            <i className="fa-solid fa-list" style={{ marginRight: "6px" }}></i> List
                        </button>
                        <button className="view-toggle-btn">
                            <i className="fa-solid fa-calendar-days" style={{ marginRight: "6px" }}></i> Month
                        </button>
                    </div>
                </div>
                <div className="journal-grid">
                    {articles.map((article) => {
                        const { month, day } = formatBadgeDate(article.date);
                        return (
                            <div className="journal-row-card" key={article.id}>
                                <div className="journal-date-column">
                                    <span className="journal-month">{month}</span>
                                    <span className="journal-day">{day}</span>
                                </div>
                                <div className="journal-image-column">
                                    {/* 🛠️ PERBAIKAN 2: Path gambar diikat mutlak ke repository */}
                                    <img src={`/UAS_UI_Ophelia/${article.image}`} alt={article.title} />
                                </div>
                                <div className="journal-info-column">
                                    <span className="journal-category" style={{ color: "var(--accent-color)" }}>{article.category}</span>
                                    <h4 className="journal-title">{article.title}</h4>
                                    <p className="journal-summary">{article.summary}</p>
                                    <p className="journal-author">Written by {article.author}</p>
                                    <Link to={`/article/${article.id}`} className="journal-details-link">
                                        View Journal Details <i className="fa-solid fa-arrow-right-long"></i>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="journal-previous-trigger">
                    <button className="btn-load-previous">
                        <i className="fa-regular fa-circle-left"></i> Load Older Publications
                    </button>
                </div>
            </div>
        </div>
    );
}