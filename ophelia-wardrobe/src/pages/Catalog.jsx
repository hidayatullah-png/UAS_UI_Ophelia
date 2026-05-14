import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Catalog() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    useEffect(() => {
        fetch("/data/product.json")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Gagal memuat produk:", err));
    }, []);

    // 2. LOGIKA MATEMATIKA PAGINATION
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Fungsi untuk berpindah halaman
    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="new-arrivals">
            <div className="category-burger-btn">
                <button className="burger-btn">
                    <i class="fa fa-bars" aria-hidden="true"></i>
                </button>
                <h3>Ophelia's Dynamic Catalog</h3>
                <button className="filter-btn">
                    Filter
                </button>
            </div>

            {/* Grid Produk hanya memetakan 9 produk yang sudah dipotong */}
            <div className="product-grid">
                {currentProducts.map((product) => (
                    <div className="product-card" key={product.id}>
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>${product.price.toFixed(2)}</p>
                        <a href={`/shop.html#/product/${product.id}`} className="btn-view">
                            View Details
                        </a>
                    </div>
                ))}
            </div>
            {totalPages > 1 && (
                <div className="pagination-container">
                    {/* Tombol Previous */}
                    <button
                        onClick={() => changePage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="page-btn arrow"
                    >
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>

                    {/* Angka Pointer (1, 2, dst) */}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => changePage(index + 1)}
                            className={`page-btn ${currentPage === index + 1 ? "active-page" : ""}`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    {/* Tombol Next */}
                    <button
                        onClick={() => changePage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="page-btn arrow"
                    >
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            )}
        </div>
    );
}