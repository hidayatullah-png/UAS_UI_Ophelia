import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Catalog() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState({ type: "All", value: "All" });

    useEffect(() => {
        fetch("/data/product.json")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Gagal memuat produk:", err));
    }, []);

    const filteredProducts = products.filter(product => {
        if (activeFilter.type === "All") return true;
        if (activeFilter.type === "NewArrival") return product.isNewArrival === true;
        if (activeFilter.type === "Category") return product.category === activeFilter.value;
        if (activeFilter.type === "Collection") return product.itemType === activeFilter.value;
        return true;
    });

    //  LOGIKA MATEMATIKA PAGINATION
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Fungsi untuk berpindah halaman
    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const applyFilter = (filterType, filterValue) => {
        setActiveFilter({ type: filterType, value: filterValue });
        setCurrentPage(1);
        setIsSidebarOpen(false); // Otomatis menutup sidebar setelah filter dipilih di HP (opsional)
    };

    return (
        <div className="new-arrivals" style={{ position: "relative" }}>
            <div
                className={`catalog-sidebar-overlay ${isSidebarOpen ? "show" : ""}`}
                onClick={() => setIsSidebarOpen(false)}
            ></div>

            {/* Kotak Sidebar Utama */}
            <aside className={`catalog-sidebar ${isSidebarOpen ? "open" : ""}`}>

                {/* BAGIAN ATAS: Tombol Close & Tabs Gender */}
                <div className="sidebar-header-premium">
                    <button className="close-sidebar-btn" onClick={() => setIsSidebarOpen(false)}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                {/* BAGIAN ISI: Grid Konten 2 Kolom Berdampingan */}
                <div className="sidebar-columns-container">

                    {/* === KOLOM 1 (KIRI) === */}
                    <div className="sidebar-column-lane">
                        <div className="sidebar-section-link">
                            <h3 className="section-title-bold" onClick={() => applyFilter("NewArrival", "All")}>
                                New Arrivals
                            </h3>
                        </div>

                        <div className="sidebar-section-link">
                            <h4 className="section-title-heading">Koleksi</h4>
                            <ul>
                                <li className={activeFilter.value === "Dress" ? "active" : ""} onClick={() => applyFilter("Collection", "Dress")}>Gaun / Dress</li>
                                <li className={activeFilter.value === "Gown" ? "active" : ""} onClick={() => applyFilter("Collection", "Gown")}>Gown Klasik</li>
                                <li className={activeFilter.value === "Suit" ? "active" : ""} onClick={() => applyFilter("Collection", "Suit")}>Suit / Setelan</li>
                                <li className={activeFilter.value === "Waistcoat" ? "active" : ""} onClick={() => applyFilter("Collection", "Waistcoat")}>Waistcoat</li>
                                <li className={activeFilter.value === "Corset" ? "active" : ""} onClick={() => applyFilter("Collection", "Corset")}>Korset & Aksesoris</li>
                            </ul>
                        </div>
                    </div>

                    <div className="sidebar-column-lane">
                        <div className="sidebar-section-link">
                            <h4 className="section-title-heading">Kategori</h4>
                            <ul>
                                <li className={activeFilter.value === "Lolita" ? "active" : ""} onClick={() => applyFilter("Category", "Lolita")}>Lolita Style</li>
                                <li className={activeFilter.value === "Ouji" ? "active" : ""} onClick={() => applyFilter("Category", "Ouji")}>Ouji Style</li>
                                <li className={activeFilter.value === "Gothic Dress" ? "active" : ""} onClick={() => applyFilter("Category", "Gothic Dress")}>Gothic Dress</li>
                                <li className={activeFilter.value === "Gothic Suit" ? "active" : ""} onClick={() => applyFilter("Category", "Gothic Suit")}>Gothic Suit</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </aside>

            <div className="category-burger-btn">
                <button className="burger-btn" onClick={() => setIsSidebarOpen(true)}>
                    <i className="fa fa-bars" aria-hidden="true"></i>
                </button>
                <h3>Ophelia's Dynamic Catalog</h3>
                <button className="filter-btn">
                    Filter
                </button>
            </div>
            <p className="new-arrivals-text">
                {activeFilter.type === "All" ? "All Products" :
                    activeFilter.type === "NewArrival" ? "New Arrivals" :
                        `${activeFilter.value} Collection`}
            </p>
            <div className="product-grid">
                {currentProducts.map((product) => (
                    <div className="product-card" key={product.id}>
                        <img src={product.image} alt={product.name} />
                        <h5 title={product.name}>
                            {product.name.length > 30
                                ? product.name.substring(0, 27) + "..."
                                : product.name}
                        </h5>
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