import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function ArticleDetail() {
    const { id } = useParams(); // Menangkap ID dari URL browser (misal: 1, 2, atau 3)
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mengambil data dari JSON lokal kamu
        fetch("/data/article.json")
            .then((res) => res.json())
            .then((data) => {
                // Cari 1 artikel yang ID-nya pas dengan ID di URL
                const found = data.find((item) => item.id === parseInt(id));
                setArticle(found);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Gagal memuat detail artikel:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="article-status-msg">Loading Article...</div>;
    if (!article) return <div className="article-status-msg">Article Not Found.</div>;

    return (
        <article className="ophelia-article-detail-page">
            <div className="article-detail-container">

                <div className="back-to-journal-nav">
                    <Link to="/articles">
                        <i className="fa-solid fa-arrow-left-long"></i> Back to Journal
                    </Link>
                </div>

                <div className="article-detail-header">
                    <span className="article-detail-cat" style={{ color: "var(--accent-color)" }}>
                        {article.category}
                    </span>
                    <h1 className="article-detail-title">{article.title}</h1>
                    <div className="article-detail-meta">
                        <span className="article-detail-author">By {article.author}</span>
                        <span className="meta-divider">•</span>
                        <span className="article-detail-date">{article.date}</span>
                    </div>
                </div>

                <div className="article-detail-hero-image">
                    <img src={article.image} alt={article.title} />
                </div>

                <div className="article-detail-content-wrapper">
                    <p className="article-detail-summary-teaser">
                        {article.summary}
                    </p>
                    <div className="article-detail-body-text">
                        <p>{article.content}</p>
                    </div>
                </div>

            </div>
        </article>
    );
}