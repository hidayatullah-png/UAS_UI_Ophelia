import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Catalog() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

    // ====================================================================
    // 🛠️ 1. STATE MULTI-SELECT BARU (MENGGANTIKAN activeFilter LAMA)
    // ====================================================================
    const [selectedCollections, setSelectedCollections] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [showNewArrivalsOnly, setShowNewArrivalsOnly] = useState(false);

    useEffect(() => {
        fetch("/data/product.json")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Gagal memuat produk:", err));
    }, []);

    // ====================================================================
    // 🛠️ 2. LOGIKA FILTER MULTIPLE PICK (BISA BANYAK SEKALIGUS)
    // ====================================================================
    const filteredProducts = products.filter(product => {
        // A. Filter Harga (Harus di bawah harga maksimal)
        if (product.price > maxPrice) return false;

        // B. Filter New Arrival
        if (showNewArrivalsOnly && !product.isNewArrival) return false;

        // C. Filter Koleksi (Jika array kosong, berarti tampilkan semua. Jika tidak, cek apakah cocok)
        if (selectedCollections.length > 0 && !selectedCollections.includes(product.itemType)) return false;

        // D. Filter Kategori
        if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false;

        // E. Filter Warna (Pastikan ada data "color" di JSON kamu nanti)
        if (selectedColors.length > 0 && !selectedColors.includes(product.color)) return false;

        return true; // Jika lolos semua hadangan di atas, produk ditampilkan
    });

    // LOGIKA PAGINATION
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // ====================================================================
    // 🛠️ 3. FUNGSI UNTUK TOGGLE CHECKBOX MULTIPLE PICK
    // ====================================================================
    const toggleFilter = (array, setArray, item) => {
        if (array.includes(item)) {
            // Jika sudah ada, hapus dari array (Uncheck)
            setArray(array.filter(i => i !== item));
        } else {
            // Jika belum ada, tambahkan ke array (Check)
            setArray([...array, item]);
        }
        setCurrentPage(1);
    };

    // Fungsi khusus Sidebar Kiri (Langsung reset dan pilih 1 secara instan)
    const applySingleFilterLeft = (type, value) => {
        resetFilters(); // Bersihkan semua filter dulu
        if (type === "NewArrival") setShowNewArrivalsOnly(true);
        if (type === "Collection") setSelectedCollections([value]);
        if (type === "Category") setSelectedCategories([value]);
        setIsLeftSidebarOpen(false);
    };

    const resetFilters = () => {
        setSelectedCollections([]);
        setSelectedCategories([]);
        setSelectedColors([]);
        setMaxPrice(350);
        setShowNewArrivalsOnly(false);
        setCurrentPage(1);
        setIsRightSidebarOpen(false);
    };

    return (
        <div className="new-arrivals" style={{ position: "relative" }}>
            <div
                className={`catalog-sidebar-overlay ${isLeftSidebarOpen || isRightSidebarOpen ? "show" : ""}`}
                onClick={() => { setIsLeftSidebarOpen(false); setIsRightSidebarOpen(false); }}
            ></div>

            {/* =========================================================
                SIDEBAR KIRI (Klik Langsung Ganti Halaman)
                ========================================================= */}
            <aside className={`catalog-sidebar ${isLeftSidebarOpen ? "open" : ""}`}>
                <div className="sidebar-header-premium">
                    <button className="close-sidebar-btn" onClick={() => setIsLeftSidebarOpen(false)}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="sidebar-columns-container">
                    <div className="sidebar-column-lane">
                        <div className="sidebar-section-link">
                            <h3 className="section-title-bold" onClick={() => applySingleFilterLeft("NewArrival", "All")}>
                                New Arrivals
                            </h3>
                            <h3 className="section-title-bold" onClick={() => applySingleFilterLeft("POISON", "POISON")}>
                                POISON
                            </h3>
                        </div>
                        <div className="sidebar-section-link">
                            <h4 className="section-title-heading">Koleksi</h4>
                            <ul>
                                <li className={selectedCollections.includes("Dress") ? "active" : ""} onClick={() => applySingleFilterLeft("Collection", "Dress")}>Dress</li>
                                <li className={selectedCollections.includes("Gown") ? "active" : ""} onClick={() => applySingleFilterLeft("Collection", "Gown")}>Gown</li>
                                <li className={selectedCollections.includes("Suit") ? "active" : ""} onClick={() => applySingleFilterLeft("Collection", "Suit")}>Suit</li>
                                <li className={selectedCollections.includes("Waistcoat") ? "active" : ""} onClick={() => applySingleFilterLeft("Collection", "Waistcoat")}>Waistcoat</li>
                                <li className={selectedCollections.includes("Corset") ? "active" : ""} onClick={() => applySingleFilterLeft("Collection", "Corset")}>Korset</li>
                            </ul>
                        </div>
                    </div>
                    <div className="sidebar-column-lane">
                        <div className="sidebar-section-link">
                            <h4 className="section-title-heading">Kategori</h4>
                            <ul>
                                <li className={selectedCategories.includes("Lolita") ? "active" : ""} onClick={() => applySingleFilterLeft("Category", "Lolita")}>Lolita Style</li>
                                <li className={selectedCategories.includes("Ouji") ? "active" : ""} onClick={() => applySingleFilterLeft("Category", "Ouji")}>Ouji Style</li>
                                <li className={selectedCategories.includes("Dress") ? "active" : ""} onClick={() => applySingleFilterLeft("Category", "Dress")}>Dress</li>
                                <li className={selectedCategories.includes("Gown") ? "active" : ""} onClick={() => applySingleFilterLeft("Category", "Gown")}>Gown</li>
                                <li className={selectedCategories.includes("Suit") ? "active" : ""} onClick={() => applySingleFilterLeft("Category", "Suit")}>Suit</li>
                                <li className={selectedCategories.includes("Waistcoat") ? "active" : ""} onClick={() => applySingleFilterLeft("Category", "Waistcoat")}>Waistcoat</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </aside>

            {/* =========================================================
                SIDEBAR KANAN (Multi-Select Pull&Bear Style)
                ========================================================= */}
            <aside className={`pull-filter-sidebar ${isRightSidebarOpen ? "open" : ""}`}>
                <div className="pull-sidebar-header">
                    <h4>Filter</h4>
                    <button className="pull-close-btn" onClick={() => setIsRightSidebarOpen(false)}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <div className="pull-sidebar-body">

                    {/* FILTER 1: HARGA (SLIDER) */}
                    <div className="pull-filter-group">
                        <div className="pull-group-head">
                            <span>Harga</span>
                            <span className="price-range-display">$0 - ${maxPrice}</span>
                        </div>
                        <div className="pull-price-slider-container">
                            <input
                                type="range"
                                min="0" max="350" step="10"
                                value={maxPrice}
                                onChange={(e) => { setMaxPrice(Number(e.target.value)); setCurrentPage(1); }}
                                className="pull-price-slider"
                            />
                        </div>
                    </div>

                    {/* FILTER 2: WARNA (SWATCHES KOTAK) */}
                    <div className="pull-filter-group">
                        <div className="pull-group-head">
                            <span>Warna</span>
                        </div>
                        <div className="pull-group-content color-swatches-container">
                            {/* Tombol Warna (Kamu bisa sesuaikan nama warnanya dengan yang ada di JSON nanti) */}
                            <button className={`color-swatch black ${selectedColors.includes("Black") ? "active" : ""}`} onClick={() => toggleFilter(selectedColors, setSelectedColors, "Black")} title="Black"></button>
                            <button className={`color-swatch white ${selectedColors.includes("White") ? "active" : ""}`} onClick={() => toggleFilter(selectedColors, setSelectedColors, "White")} title="White"></button>
                            <button className={`color-swatch red ${selectedColors.includes("Red") ? "active" : ""}`} onClick={() => toggleFilter(selectedColors, setSelectedColors, "Red")} title="Red"></button>
                            <button className={`color-swatch DarkChocolate ${selectedColors.includes("Dark Chocolate") ? "active" : ""}`} onClick={() => toggleFilter(selectedColors, setSelectedColors, "Dark Chocolate")} title="Dark Chocolate"></button>
                        </div>
                    </div>

                    {/* FILTER 3: KOLEKSI (CHECKBOX CHIP) */}
                    <div className="pull-filter-group">
                        <div className="pull-group-head"><span>Koleksi Utama</span></div>
                        <div className="pull-group-content">
                            <span className={showNewArrivalsOnly ? "filter-chip active" : "filter-chip"} onClick={() => { setShowNewArrivalsOnly(!showNewArrivalsOnly); setCurrentPage(1); }}> New Arrivals</span>
                            <span className={selectedCollections.includes("Dress") ? "filter-chip active" : "filter-chip"} onClick={() => toggleFilter(selectedCollections, setSelectedCollections, "Dress")}>Dress</span>
                            <span className={selectedCollections.includes("Suit") ? "filter-chip active" : "filter-chip"} onClick={() => toggleFilter(selectedCollections, setSelectedCollections, "Suit")}>Suit</span>
                            <span className={selectedCollections.includes("Waistcoat") ? "filter-chip active" : "filter-chip"} onClick={() => toggleFilter(selectedCollections, setSelectedCollections, "Waistcoat")}>Waistcoat</span>
                            <span className={selectedCollections.includes("Corset") ? "filter-chip active" : "filter-chip"} onClick={() => toggleFilter(selectedCollections, setSelectedCollections, "Corset")}>Corset</span>
                        </div>
                    </div>

                    {/* FILTER 4: KATEGORI (CHECKBOX CHIP) */}
                    <div className="pull-filter-group">
                        <div className="pull-group-head"><span>Jenis produk</span></div>
                        <div className="pull-group-content">
                            <span className={selectedCategories.includes("Lolita") ? "filter-chip active" : "filter-chip"} onClick={() => toggleFilter(selectedCategories, setSelectedCategories, "Lolita")}>Lolita Style</span>
                            <span className={selectedCategories.includes("Ouji") ? "filter-chip active" : "filter-chip"} onClick={() => toggleFilter(selectedCategories, setSelectedCategories, "Ouji")}>Ouji Style</span>
                            <span className={selectedCategories.includes("Gothic Dress") ? "filter-chip active" : "filter-chip"} onClick={() => toggleFilter(selectedCategories, setSelectedCategories, "Gothic Dress")}>Gothic Dress</span>
                            <span className={selectedCategories.includes("Gothic Suit") ? "filter-chip active" : "filter-chip"} onClick={() => toggleFilter(selectedCategories, setSelectedCategories, "Gothic Suit")}>Gothic Suit</span>
                        </div>
                    </div>

                </div>

                <div className="pull-sidebar-footer">
                    <button className="btn-pull-apply" onClick={() => setIsRightSidebarOpen(false)}>
                        Lihat {filteredProducts.length} barang
                    </button>
                    <button className="btn-pull-reset" onClick={resetFilters}>
                        Atur ulang filter
                    </button>
                </div>
            </aside>

            {/* ================= HEADER MENU ================= */}
            <div className="category-burger-btn">
                <button className="burger-btn" onClick={() => setIsLeftSidebarOpen(true)}>
                    <i className="fa fa-bars" aria-hidden="true"></i>
                </button>
                <h3>Ophelia's Dynamic Catalog</h3>
                <button className="filter-btn" onClick={() => setIsRightSidebarOpen(true)}>
                    Filter
                </button>
            </div>

            <p className="new-arrivals-text" style={{ textAlign: "center", marginBottom: "30px", marginTop: "10px" }}>
                All Product
            </p>

            {/* ================= GRID PRODUK ================= */}
            <div className="product-grid">
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <div className={`product-card ${product.stock === 0 ? "out-of-stock-card" : ""}`} key={product.id}>
                            {product.stock === 0 && <span className="sold-out-badge">SOLD OUT</span>}
                            <img src={product.image} alt={product.name} />
                            <h5 title={product.name}>
                                {product.name.length > 30 ? product.name.substring(0, 27) + "..." : product.name}
                            </h5>
                            <p>${product.price.toFixed(2)}</p>
                            {product.stock === 0 ? (
                                <button className="btn-view disabled-btn" disable>SOLD OUT</button>
                            ) : (
                                <Link to={`/product/${product.id}`} className="btn-view">
                                    View Details
                                </Link>
                            )}
                        </div>
                    ))
                ) : (
                    <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "80px 20px", color: "#888" }}>
                        <i className="fa-solid fa-ghost" style={{ fontSize: "40px", marginBottom: "15px" }}></i>
                        <p>Oops Product not found.</p>
                    </div>
                )}
            </div>

            {/* ================= PAGINATION ================= */}
            {totalPages > 1 && (
                <div className="pagination-container">
                    <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1} className="page-btn arrow">
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button key={index + 1} onClick={() => changePage(index + 1)} className={`page-btn ${currentPage === index + 1 ? "active-page" : ""}`}>
                            {index + 1}
                        </button>
                    ))}
                    <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages} className="page-btn arrow">
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            )}
        </div>
    );
}