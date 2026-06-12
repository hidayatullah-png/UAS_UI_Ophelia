import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Collections() {
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        fetch(import.meta.env.BASE_URL + "data/collection.json")
            .then((res) => res.json())
            .then((data) => {
                const collectionsArray = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setCollections(collectionsArray);
            })
            .catch((err) => console.error("Gagal memuat daftar koleksi:", err));
    }, []);

    return (
        <div className="ophelia-collections-wrapper">

            <h2 className="collections-main-heading">OPHELIA'S COLLECTION</h2>

            <div className="collections-banner-stack">

                {collections.length > 0 ? (
                    collections.map((col, index) => (
                        <div className="collection-banner-card" key={index}>
                            <img src={col.image} alt={col.title} className="banner-bg-image" />
                            <div className="banner-overlay-content">
                                <Link to="/shop" className="btn-shop-overlay">SHOP NOW</Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="collection-banner-card empty-skeleton">
                        <p style={{ textAlign: "center", color: "var(--line)", width: "100%", marginTop: "20%" }}>Loading Exclusive Collections...</p>
                    </div>
                )}

            </div>
        </div>
    );
}