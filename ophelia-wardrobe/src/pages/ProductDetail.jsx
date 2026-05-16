import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function ProductDetail({ addToCart, toggleWishlist, wishlistItems }) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const isInWishlist = wishlistItems.some((item) => item.id === product?.id);

    const [selectedSize, setSelectedSize] = useState("M");

    useEffect(() => {
        setLoading(true);
        fetch("/data/product.json")
            .then((res) => res.json())
            .then((data) => {
                const foundProduct = data.find((p) => p.id === parseInt(id));
                setProduct(foundProduct);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Gagal memuat detail produk:", err);
                setLoading(false);
            });
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
                            <button className="wishlist-btn" onClick={() => toggleWishlist(product)}>
                                <i className={isInWishlist ? 'fa-solid fa-heart active-heart' : 'fa-regular fa-heart'}></i>
                            </button>
                        </div>
                        <p className="detail-price">${product.price.toFixed(2)}</p>
                    </div>
                    <div className="detail-description">
                        <p>
                            {product.description ||
                                "A beautifully crafted gothic piece, tailored for those who embrace the midnight elegance. Made from premium materials with exquisite dark accents."}<br></br>
                            <span className="model-info">Model: {product.model || "Height 177 cm and size M"}</span>
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
                        <button className="btn-add-to-cart" onClick={() => addToCart(product, selectedSize)}>
                            Add to Wardrobe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}