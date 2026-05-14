import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isWishlist, setIsWishlist] = useState(false);
    const [selectedSize, setSelectedSize] = useState("M");

    useEffect(() => {
        console.log("Fetching product with ID:", id);
        fetch("/data/product.json")
            .then((res) => res.json())
            .then((data) => {
                const foundProduct = data.find((p) => p.id === parseInt(id));
                setProduct(foundProduct);
                setLoading(false);
            })
            .catch((err) => console.error("Gagal memuat produk:", err));
        setLoading(false);
    }, [id]);

    if (loading) {
        return <div className="loading-text">Loading...</div>;
    }
    if (!product) {
        return (
            <div className="error-text">
                <h3>Product not found</h3>
                <Link to="/" className="btn-back">Back to home</Link>
            </div>
        );
    }
    return (
        <div className="product-detail-container">
            <div className="product-detail-wrapper">
                <div className='detail-gallery-pb'>
                    <div className="product-image">
                        <img src={product.image} alt={product.name} />
                    </div>
                </div>
                <div className="detail-info-box">
                    <Link to="/" className="btn-back-link">
                        <i className="fa-solid fa-arrow-left"></i> Back to Catalog
                    </Link>
                    <div className="info-header">
                        <span className="collection-tag">Ophelia's Exclusive</span>
                        <div className="title-row">
                            <h2>{product.name}</h2>
                            <button className="wishlist-btn" onClick={() => setIsWishlist(!isWishlist)}>
                                <i className={`fa-regular fa-heart ${isWishlist ? 'fas' : ''}`}></i>
                            </button>
                        </div>
                        <p className="detail-price">${product.price.toFixed(2)}</p>
                    </div>
                    <div className="detail-description">
                        <p>
                            {product.description ||
                                "A beautifully crafted gothic piece, tailored for those who embrace the midnight elegance. Made from premium materials with exquisite dark accents."}
                        </p>
                    </div>
                    <div className="detail-options">
                        <div className="size-selector">
                            <div className="size-header">
                                <h4>Select Size:</h4>
                                <a href="#size-guide" className="size-guide-link">Size Guide</a>
                            </div>
                            <div className="size-options">
                                {["S", "M", "L", "XL"].map((size) => (
                                    <button
                                        key={size}
                                        className={selectedSize === size ? "active" : ""}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="detail-actions">
                        <button className="btn-add-to-cart">
                            <i className="fa-solid fa-bag-shopping"></i> Add to Wardrobe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}