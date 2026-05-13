import { useState, useEffect } from "react";

export default function Catalog() {
    const [products, setProducts] = useState([]);

    const [currentPage, setCurrentPage] = useState(1); // Halaman aktif saat ini
    const productsPerPage = 6; // Batasan jumlah produk per halaman

    useEffect(() => {
        fetch("/data/product.json")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Gagal memuat produk:", err));
    }, []);

    // 2. LOGIKA MATEMATIKA PAGINATION
    const indexOfLastProduct = currentPage * productsPerPage; 
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage; 

    // Potong data produk asli, ambil hanya 9 data sesuai halaman saat ini
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Hitung total halaman yang dibutuhkan
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Fungsi untuk berpindah halaman
    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Efek estetik: Otomatis scroll kembali ke atas katalog setelah klik ganti halaman
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="new-arrivals">
            <h2>Ophelia's Dynamic Catalog</h2>

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

            {/* 3. TOMBOL POINTER HALAMAN (Hanya muncul jika total halaman lebih dari 1) */}
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