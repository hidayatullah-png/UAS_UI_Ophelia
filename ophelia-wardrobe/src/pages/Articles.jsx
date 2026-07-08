import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Articles() {
    const [articles, setArticles] = useState([]);
    const [viewMode, setViewMode] = useState("list");

    // State untuk filter yang dipilih
    const [selectedMonth, setSelectedMonth] = useState("ALL");
    const [selectedAuthor, setSelectedAuthor] = useState("ALL");

    // State & Ref untuk status terbuka/tertutup dropdown
    const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
    const [isListDropdownOpen, setIsListDropdownOpen] = useState(false);

    const monthDropdownRef = useRef(null);
    const listDropdownRef = useRef(null);

    useEffect(() => {
        fetch("/UAS_UI_Ophelia/data/article.json")
            .then((res) => res.json())
            .then((data) => setArticles(data))
            .catch((err) => console.error("Gagal memuat artikel:", err));
    }, []);

    // Logika Click Outside untuk kedua dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (monthDropdownRef.current && !monthDropdownRef.current.contains(event.target)) {
                setIsMonthDropdownOpen(false);
            }
            if (listDropdownRef.current && !listDropdownRef.current.contains(event.target)) {
                setIsListDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const formatBadgeDate = (dateStr) => {
        if (!dateStr) return { month: "MAY", day: "10" };
        const parts = dateStr.split(" ");
        const month = parts[0] ? parts[0].substring(0, 3).toUpperCase() : "MAY";
        const day = parts[1] ? parts[1].replace(",", "") : "10";
        return { month, day };
    };

    // Ekstrak data unik dari JSON
    const uniqueMonths = [...new Set(articles.map(article => formatBadgeDate(article.date).month))];
    const uniqueAuthors = [...new Set(articles.map(article => article.author))];

    // Logika Filter Gabungan
    const displayedArticles = articles.filter(article => {
        if (viewMode === "month" && selectedMonth !== "ALL") {
            return formatBadgeDate(article.date).month === selectedMonth;
        }
        if (viewMode === "list" && selectedAuthor !== "ALL") {
            return article.author === selectedAuthor;
        }
        return true;
    });

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

                        {/* WRAPPER TOMBOL LIST & DROPDOWN PENULIS */}
                        <div className="filter-dropdown-wrapper" ref={listDropdownRef}>
                            <button
                                className={`view-toggle-btn ${viewMode === "list" ? "active-view" : ""}`}
                                onClick={() => {
                                    setViewMode("list");
                                    setIsListDropdownOpen((prev) => !prev);
                                    setIsMonthDropdownOpen(false); // Tutup dropdown sebelah
                                    setSelectedMonth("ALL"); // Reset filter bulan
                                }}
                            >
                                <i className="fa-solid fa-list"></i> List
                            </button>

                            {viewMode === "list" && isListDropdownOpen && (
                                <select
                                    className="filter-dropdown-select"
                                    value={selectedAuthor}
                                    onChange={(e) => {
                                        setSelectedAuthor(e.target.value);
                                        setIsListDropdownOpen(false);
                                    }}
                                >
                                    <option value="ALL">All Authors</option>
                                    {uniqueAuthors.map(author => (
                                        <option key={author} value={author}>{author}</option>
                                    ))}
                                </select>
                            )}
                        </div>

                        {/* WRAPPER TOMBOL MONTH & DROPDOWN BULAN */}
                        <div className="filter-dropdown-wrapper" ref={monthDropdownRef}>
                            <button
                                className={`view-toggle-btn ${viewMode === "month" ? "active-view" : ""}`}
                                onClick={() => {
                                    setViewMode("month");
                                    setIsMonthDropdownOpen((prev) => !prev);
                                    setIsListDropdownOpen(false); // Tutup dropdown sebelah
                                    setSelectedAuthor("ALL"); // Reset filter penulis
                                }}
                            >
                                <i className="fa-solid fa-calendar-days" ></i> Month
                            </button>

                            {viewMode === "month" && isMonthDropdownOpen && (
                                <select
                                    className="filter-dropdown-select"
                                    value={selectedMonth}
                                    onChange={(e) => {
                                        setSelectedMonth(e.target.value);
                                        setIsMonthDropdownOpen(false);
                                    }}
                                >
                                    <option value="ALL">All Months</option>
                                    {uniqueMonths.map(month => (
                                        <option key={month} value={month}>{month}</option>
                                    ))}
                                </select>
                            )}
                        </div>

                    </div>
                </div>

                <div className="journal-grid">
                    {displayedArticles.length > 0 ? (
                        displayedArticles.map((article) => {
                            const { month, day } = formatBadgeDate(article.date);
                            return (
                                <div className="journal-row-card" key={article.id}>
                                    <div className="journal-date-column">
                                        <span className="journal-month">{month}</span>
                                        <span className="journal-day">{day}</span>
                                    </div>
                                    <div className="journal-image-column">
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
                        })
                    ) : (
                        <p style={{ textAlign: "center", width: "100%", padding: "2rem" }}>
                            No publications found based on your filter.
                        </p>
                    )}
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