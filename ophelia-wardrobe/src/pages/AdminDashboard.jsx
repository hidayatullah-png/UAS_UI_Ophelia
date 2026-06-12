import { useState, useEffect } from "react";

export default function AdminDashboard({ transactionHistory }) {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    const [activeMenu, setActiveMenu] = useState("dashboard");

    // --- DATA SIMULASI ---
    const [products, setProducts] = useState([]);
    const [articles, setArticles] = useState([]);

    const [users, setUsers] = useState([
        { id: 1, name: "Hidayatullah Sukma Dewi", email: "sukmadewi@gmail.com", role: "Super Admin" },
        { id: 2, name: "Lady Midnight", email: "midnight@ophelia.com", role: "Author" },
        { id: 3, name: "GothLover99", email: "goth99@yahoo.com", role: "Customer" },
        { id: 4, name: "Ophelia Editorial", email: "raven@ophelia.com", role: "Author" },
        { id: 5, name: "Vampira Styles", email: "darkfashionista@gmail.com", role: "Author" }
    ]);

    useEffect(() => {
        // 🛠️ PERBAIKAN 1: Path fetch produk di-hardcode ke repository
        fetch('/UAS_UI_Ophelia/data/product.json')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error("Gagal memuat data produk:", error));

        // 🛠️ PERBAIKAN 2: Path fetch artikel di-hardcode ke repository
        fetch('/UAS_UI_Ophelia/data/article.json')
            .then(response => response.json())
            .then(data => setArticles(data))
            .catch(error => console.error("Gagal memuat data artikel:", error));
    }, []);

    // POP-UP PRODUK
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [productForm, setProductForm] = useState({
        id: null,
        name: "",
        category: "",
        price: "",
        stock: ""
    });

    // POP-UP ARTIKEL
    const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
    const [articleForm, setArticleForm] = useState({
        id: null,
        title: "",
        author: "",
        category: ""
    });

    const totalRevenue = transactionHistory.reduce((sum, order) => sum + order.totalBill, 0);
    const totalOrdersCount = transactionHistory.length;
    const totalItemsSold = transactionHistory.reduce((sum, order) => {
        return sum + order.items.reduce((itemSum, item) => itemSum + item.qty, 0);
    }, 0);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (username === "admin" && password === "ophelia123") {
            setIsLoggedIn(true);
            setLoginError("");
        } else {
            setLoginError("Kredensial salah! Akses ditolak.");
        }
    };

    // =========================================================================
    // FUNGSI HANDLER MODAL (Berada di luar kondisi pengecekan login)
    // =========================================================================
    const handleOpenCreateProduct = () => {
        setProductForm({ id: null, name: "", category: "", price: "", stock: "" });
        setIsProductModalOpen(true);
    };

    const handleOpenEditProduct = (product) => {
        setProductForm(product);
        setIsProductModalOpen(true);
    };

    const handleSaveProduct = (e) => {
        e.preventDefault();
        if (productForm.id) {
            setProducts(products.map(p => p.id === productForm.id ? { ...productForm, price: Number(productForm.price), stock: Number(productForm.stock) } : p));
        } else {
            const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
            setProducts([...products, { ...productForm, id: newId, price: Number(productForm.price), stock: Number(productForm.stock) }]);
        }
        setIsProductModalOpen(false);
    };

    // --- HANDLER POP-UP ARTIKEL ---
    const handleOpenCreateArticle = () => {
        setArticleForm({ id: null, title: "", author: "", category: "" });
        setIsArticleModalOpen(true);
    };

    const handleOpenEditArticle = (article) => {
        setArticleForm(article);
        setIsArticleModalOpen(true);
    };

    const handleSaveArticle = (e) => {
        e.preventDefault();
        if (articleForm.id) {
            setArticles(articles.map(a => a.id === articleForm.id ? articleForm : a));
        } else {
            const newId = articles.length > 0 ? Math.max(...articles.map(a => a.id)) + 1 : 1;
            setArticles([...articles, { ...articleForm, id: newId }]);
        }
        setIsArticleModalOpen(false);
    };
    // =========================================================================

    if (!isLoggedIn) {
        return (
            <div className="admin-login-page-wrapper">
                <div className="admin-login-card">
                    <div className="login-card-header">
                        <i className="fa-solid fa-user-lock login-gate-icon"></i>
                        <h2>Ophelia Terminal</h2>
                        <p>Please sign in to access the management panel.</p>
                    </div>
                    <form onSubmit={handleLoginSubmit} className="admin-login-form">
                        {loginError && <div className="login-error-alert"><i className="fa-solid fa-triangle-exclamation"></i> {loginError}</div>}
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" required placeholder="Username..." value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="btn-admin-login">Authorize Entrance</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="ref-admin-dashboard">
            <div className="ref-admin-layout">

                <aside className="ref-admin-sidebar">
                    <div className="ref-sidebar-brand">
                        <h3>Dashboard Admin</h3>
                    </div>

                    <div className="ref-admin-profile-summary">
                        <div className="ref-avatar-circle">HD</div>
                        <div className="ref-profile-info">
                            <h4>Sukma Dewi</h4>
                            <span>Super Admin</span>
                        </div>
                    </div>

                    <nav className="ref-sidebar-menu">
                        <button className={activeMenu === "dashboard" ? "ref-menu-btn active" : "ref-menu-btn"} onClick={() => setActiveMenu("dashboard")}>
                            <i className="fa-solid fa-chart-pie"></i> Dashboard <i className="fa-solid fa-house ref-menu-end-icon"></i>
                        </button>
                        <button className={activeMenu === "products" ? "ref-menu-btn active" : "ref-menu-btn"} onClick={() => setActiveMenu("products")}>
                            <i className="fa-solid fa-shirt"></i> Kelola Produk <i className="fa-solid fa-users ref-menu-end-icon"></i>
                        </button>
                        <button className={activeMenu === "articles" ? "ref-menu-btn active" : "ref-menu-btn"} onClick={() => setActiveMenu("articles")}>
                            <i className="fa-solid fa-newspaper"></i> Kelola Artikel <i className="fa-solid fa-layer-group ref-menu-end-icon"></i>
                        </button>
                        <button className={activeMenu === "users" ? "ref-menu-btn active" : "ref-menu-btn"} onClick={() => setActiveMenu("users")}>
                            <i className="fa-solid fa-users"></i> Kelola User <i className="fa-solid fa-laptop ref-menu-end-icon"></i>
                        </button>
                        <button className={activeMenu === "transactions" ? "ref-menu-btn active" : "ref-menu-btn"} onClick={() => setActiveMenu("transactions")}>
                            <i className="fa-solid fa-receipt"></i> Kelola Transaksi <i className="fa-solid fa-calendar-days ref-menu-end-icon"></i>
                        </button>

                        <button className="ref-menu-btn ref-btn-logout" onClick={() => setIsLoggedIn(false)} style={{ marginTop: "auto", color: "#e53e3e" }}>
                            <i className="fa-solid fa-right-from-bracket"></i> Exit Session
                        </button>
                    </nav>
                </aside>

                <main className="ref-admin-main">

                    <div className="ref-top-navbar">
                        <div className="ref-search-bar-zone">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input type="text" placeholder="Search Project..." />
                        </div>
                        <div className="ref-top-right-profile">
                            <div className="ref-top-avatar">HD</div>
                            <span className="ref-top-name">Sukma Dewi</span>
                            <div className="ref-top-icons">
                                <i className="fa-regular fa-bell"></i>
                                <i className="fa-regular fa-envelope"></i>
                                <i className="fa-solid fa-bars"></i>
                            </div>
                        </div>
                    </div>

                    <div className="ref-content-body">
                        <h2 className="ref-page-heading-title">Dashboard</h2>

                        {/* ================= TAB 1: DASHBOARD OVERVIEW ================= */}
                        {activeMenu === "dashboard" && (
                            <div className="ref-tab-fade">

                                <div className="ref-stats-cards-grid">
                                    <div className="ref-gradient-card card-purple-grad">
                                        <span className="ref-card-meta-icon"><i className="fa-solid fa-wallet"></i></span>
                                        <span className="ref-card-label">Total Revenue</span>
                                        <h3>${totalRevenue.toFixed(2)}</h3>
                                        <p>Increased by 50%</p>
                                    </div>
                                    <div className="ref-gradient-card card-blue-grad">
                                        <span className="ref-card-meta-icon"><i className="fa-solid fa-box-open"></i></span>
                                        <span className="ref-card-label">Orders Received</span>
                                        <h3>{totalOrdersCount} Orders</h3>
                                        <p>Increased by 50%</p>
                                    </div>
                                    <div className="ref-gradient-card card-orange-grad">
                                        <span className="ref-card-meta-icon"><i className="fa-solid fa-shirt"></i></span>
                                        <span className="ref-card-label">Products Sold</span>
                                        <h3>{totalItemsSold} Items</h3>
                                        <p>Increased by 30%</p>
                                    </div>
                                </div>

                                <div className="ref-white-table-card">
                                    <div className="ref-table-action-header" style={{ marginBottom: "15px" }}>
                                        <h3 style={{ margin: 0 }}>Standard Data Table Overview</h3>
                                    </div>

                                    <table className="ref-data-table">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Usertype</th>
                                                <th>Joined</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.slice(0, 3).map((u, index) => {
                                                const dummyDates = ["10th June, 2024", "8th June, 2026", "2nd June, 2026"];
                                                return (
                                                    <tr key={u.id}>
                                                        <td><strong>{u.name}</strong></td>
                                                        <td>{u.email}</td>
                                                        <td>{u.role}</td>
                                                        <td>{dummyDates[index]}</td>
                                                        <td><span className="ref-status-badge badge-pending">Active</span></td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* ================= TAB 2: KELOLA PRODUK ================= */}
                        {activeMenu === "products" && (
                            <div className="ref-white-table-card ref-tab-fade">
                                <div className="ref-table-action-header">
                                    <h3>Manajemen Inventaris Produk</h3>
                                    <button className="ref-btn-add" onClick={handleOpenCreateProduct}>
                                        <i className="fa-plus fa-solid"></i> Tambah Produk
                                    </button>
                                </div>
                                <table className="ref-data-table">
                                    <thead>
                                        <tr><th>ID</th><th>Nama Produk</th><th>Kategori</th><th>Harga</th><th>Stok</th><th>Aksi</th></tr>
                                    </thead>
                                    <tbody>
                                        {products.map((p) => (
                                            <tr key={p.id}>
                                                <td>{p.id}</td>
                                                <td><strong>{p.name}</strong></td>
                                                <td>{p.category}</td>
                                                <td style={{ color: "var(--focus-blue)", fontWeight: "700" }}>${Number(p.price).toFixed(2)}</td>
                                                <td><span className="ref-status-badge badge-pending">{p.stock} Pcs</span></td>
                                                <td>
                                                    <button className="ref-edit-link" onClick={() => handleOpenEditProduct(p)}><i className="fa-solid fa-pen"></i></button>
                                                    <button className="ref-delete-link" onClick={() => setProducts(products.filter(i => i.id !== p.id))}><i className="fa-solid fa-trash-can"></i></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* ================= TAB 3: KELOLA ARTIKEL ================= */}
                        {activeMenu === "articles" && (
                            <div className="ref-white-table-card ref-tab-fade">
                                <div className="ref-table-action-header">
                                    <h3>Manajemen Jurnal & Artikel</h3>
                                    <button className="ref-btn-add" onClick={handleOpenCreateArticle}>
                                        <i className="fa-plus fa-solid"></i> Tulis Artikel
                                    </button>
                                </div>
                                <table className="ref-data-table">
                                    <thead>
                                        <tr><th>ID</th><th>Judul Artikel</th><th>Penulis</th><th>Kategori</th><th>Aksi</th></tr>
                                    </thead>
                                    <tbody>
                                        {articles.map((a) => (
                                            <tr key={a.id}>
                                                <td>{a.id}</td>
                                                <td><strong>{a.title}</strong></td>
                                                <td>{a.author}</td>
                                                <td><span className="ref-status-badge badge-gray">{a.category}</span></td>
                                                <td>
                                                    <button className="ref-edit-link" onClick={() => handleOpenEditArticle(a)}><i className="fa-solid fa-pen"></i></button>
                                                    <button className="ref-delete-link" onClick={() => setArticles(articles.filter(i => i.id !== a.id))}><i className="fa-solid fa-trash-can"></i></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* ================= TAB 4: KELOLA USER ================= */}
                        {activeMenu === "users" && (
                            <div className="ref-white-table-card ref-tab-fade">
                                <div className="ref-table-action-header">
                                    <h3>Hak Akses Akun Pengguna</h3>
                                    <button className="ref-btn-add" onClick={() => alert("Simulasi Tambah User")}><i className="fa-solid fa-user-plus"></i> Daftarkan User</button>
                                </div>
                                <table className="ref-data-table">
                                    <thead>
                                        <tr><th>ID</th><th>Nama Lengkap</th><th>Email</th><th>Role</th><th>Aksi</th></tr>
                                    </thead>
                                    <tbody>
                                        {users.map((u) => (
                                            <tr key={u.id}>
                                                <td>{u.id}</td>
                                                <td><strong>{u.name}</strong></td>
                                                <td>{u.email}</td>
                                                <td><span className={`ref-status-badge ${u.role === 'Super Admin' ? 'badge-purple' : 'badge-gray'}`}>{u.role}</span></td>
                                                <td>
                                                    <button className="ref-edit-link" onClick={() => alert(`Ubah Akses ${u.name}`)}><i className="fa-solid fa-user-gear"></i></button>
                                                    <button className="ref-delete-link" onClick={() => setUsers(users.filter(i => i.id !== u.id))}><i className="fa-solid fa-user-minus"></i></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* ================= TAB 5: KELOLA TRANSAKSI ================= */}
                        {activeMenu === "transactions" && (
                            <div className="ref-white-table-card ref-tab-fade">
                                <h3>Incoming Orders & Transaction Logs</h3>
                                {transactionHistory.length === 0 ? (
                                    <div className="ref-empty-log"><i className="fa-solid fa-folder-open"></i><p>Belum ada rekaman log transaksi.</p></div>
                                ) : (
                                    <table className="ref-data-table">
                                        <thead>
                                            <tr><th>Invoice ID</th><th>Tanggal</th><th>Nama Customer</th><th>Pakaian (Size)</th><th>Metode</th><th>Total</th></tr>
                                        </thead>
                                        <tbody>
                                            {transactionHistory.map((order) => (
                                                <tr key={order.orderId}>
                                                    <td style={{ color: "#3ea2c7" }}><strong>{order.orderId}</strong></td>
                                                    <td>{order.date}</td>
                                                    <td>{order.customerName}</td>
                                                    <td>
                                                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                                            {order.items.map((item, idx) => (
                                                                <span key={idx} style={{ fontSize: "13px" }}>{item.name} ({item.size}) <strong style={{ color: "#3ea2c7" }}>x{item.qty}</strong></span>
                                                            ))}
                                                        </div>
                                                    </td>
                                                    <td><span className="ref-status-badge badge-gray">{order.paymentMethod}</span></td>
                                                    <td><strong>${order.totalBill.toFixed(2)}</strong></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        )}

                    </div>

                    {/* ================= MODAL POP-UP PRODUK ================= */}
                    {isProductModalOpen && (
                        <div className="ref-modal-overlay" onClick={() => setIsProductModalOpen(false)}>
                            <div className="ref-modal-content" onClick={(e) => e.stopPropagation()}>
                                <div className="ref-modal-header">
                                    <h3>{productForm.id ? "Update Data Produk" : "Tambah Produk Baru"}</h3>
                                    <button className="ref-close-modal" onClick={() => setIsProductModalOpen(false)}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>

                                <form onSubmit={handleSaveProduct} className="ref-modal-form">
                                    <div className="ref-form-group">
                                        <label>Nama Pakaian</label>
                                        <input type="text" required value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} placeholder="Cth: Gothic Lace Dress" />
                                    </div>
                                    <div className="ref-form-group">
                                        <label>Kategori Fashion</label>
                                        <select required value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}>
                                            <option value="">-- Pilih Kategori --</option>
                                            <option value="Gothic Gown">Gothic Gown</option>
                                            <option value="Ouji Style">Ouji Style</option>
                                            <option value="Lolita Style">Lolita Style</option>
                                            <option value="Accessories">Accessories</option>
                                        </select>
                                    </div>
                                    <div className="ref-form-grid-2">
                                        <div className="ref-form-group">
                                            <label>Harga (USD)</label>
                                            <input type="number" step="0.01" required value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} placeholder="0.00" />
                                        </div>
                                        <div className="ref-form-group">
                                            <label>Stok Gudang</label>
                                            <input type="number" required value={productForm.stock} onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })} placeholder="0" />
                                        </div>
                                        <div className="ref-form-upload">
                                            <label>Gambar Produk</label>
                                            <input type="file" accept="image/*" onChange={(e) => setProductForm({ ...productForm, image: e.target.files })} />
                                            <label>Pdf Upload</label>
                                            <input type="file" accept=".pdf" onChange={(e) => setProductForm({ ...productForm, pdf: e.target.files })} />
                                        </div>
                                    </div>

                                    <div className="ref-modal-footer">
                                        <button type="button" className="ref-btn-cancel" onClick={() => setIsProductModalOpen(false)}>Batal</button>
                                        <button type="submit" className="ref-btn-save">{productForm.id ? "Simpan Perubahan" : "Simpan Produk"}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* ================= MODAL POP-UP ARTIKEL ================= */}
                    {isArticleModalOpen && (
                        <div className="ref-modal-overlay" onClick={() => setIsArticleModalOpen(false)}>
                            <div className="ref-modal-content" onClick={(e) => e.stopPropagation()}>
                                <div className="ref-modal-header">
                                    <h3>{articleForm.id ? "Update Artikel" : "Tulis Artikel Baru"}</h3>
                                    <button className="ref-close-modal" onClick={() => setIsArticleModalOpen(false)}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>

                                <form onSubmit={handleSaveArticle} className="ref-modal-form">
                                    <div className="ref-form-group">
                                        <label>Judul Artikel</label>
                                        <input type="text" required value={articleForm.title} onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })} placeholder="Cth: Dystopian Dreams the art of Marcin..." />
                                    </div>

                                    <div className="ref-form-grid-2">
                                        <div className="ref-form-group">
                                            <label>Nama Penulis</label>
                                            <input type="text" required value={articleForm.author} onChange={(e) => setArticleForm({ ...articleForm, author: e.target.value })} placeholder="Ophelia Editorial" />
                                        </div>
                                        <div className="ref-form-group">
                                            <label>Kategori</label>
                                            <select required value={articleForm.category} onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}>
                                                <option value="">-- Pilih Kategori --</option>
                                                <option value="Styling">Styling</option>
                                                <option value="Wardrobe">Wardrobe</option>
                                                <option value="Accessories">Accessories</option>
                                                <option value="Art & Culture">Art & Culture</option>
                                            </select>
                                        </div>
                                        <div className="ref-form-upload">
                                            <label>Gambar Artikel</label>
                                            <input type="file" accept="image/*" onChange={(e) => setArticleForm({ ...articleForm, image: e.target.files })} />
                                            <label>Pdf Upload</label>
                                            <input type="file" accept=".pdf" onChange={(e) => setArticleForm({ ...articleForm, pdf: e.target.files })} />
                                        </div>
                                    </div>

                                    <div className="ref-modal-footer">
                                        <button type="button" className="ref-btn-cancel" onClick={() => setIsArticleModalOpen(false)}>Batal</button>
                                        <button type="submit" className="ref-btn-save">{articleForm.id ? "Simpan Perubahan" : "Terbitkan Artikel"}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}