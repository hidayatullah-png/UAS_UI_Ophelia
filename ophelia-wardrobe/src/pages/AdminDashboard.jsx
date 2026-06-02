import { useState } from "react";

export default function AdminDashboard({ transactionHistory }) {
    // --- STATE OTENTIKASI (LOGIN) ---
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    // --- STATE MENU INTERNAL DASHBOARD ---
    const [activeMenu, setActiveMenu] = useState("dashboard");

    // --- DATA SIMULASI UNTUK FITUR KELOLA ---
    const [products, setProducts] = useState([
        { id: 1, name: "Midnight Elegance Dress", price: 249.99, category: "Gothic Gown", stock: 12 },
        { id: 2, name: "Gothic Victorian Gown", price: 199.00, category: "Gothic Gown", stock: 8 },
        { id: 3, name: "Modern Ouji-Style Suit", price: 159.00, category: "Ouji Style", stock: 5 },
        { id: 4, name: "Bloodied Lolita Dress", price: 120.00, category: "Lolita Style", stock: 15 }
    ]);

    const [articles, setArticles] = useState([
        { id: 1, title: "How to Style Gothic Dresses for Everyday Wear", author: "Ophelia Editorial", category: "Styling" },
        { id: 2, title: "5 Essentials for a Dark Minimalist Wardrobe", author: "Lady Midnight", category: "Wardrobe" },
        { id: 3, title: "Top 10 Must-Have Accessories for Gothic Outfits", author: "Vampira Styles", category: "Accessories" }
    ]);

    const [users, setUsers] = useState([
        { id: 1, name: "Hidayatullah Sukma Dewi", email: "sukmadewi@gmail.com", role: "Super Admin" },
        { id: 2, name: "Lady Midnight", email: "midnight@ophelia.com", role: "Author" },
        { id: 3, name: "GothLover99", email: "goth99@yahoo.com", role: "Customer" }
    ]);

    // --- LOGIKA PERHITUNGAN STATISTIK ---
    const totalRevenue = transactionHistory.reduce((sum, order) => sum + order.totalBill, 0);
    const totalOrdersCount = transactionHistory.length;
    const totalItemsSold = transactionHistory.reduce((sum, order) => {
        return sum + order.items.reduce((itemSum, item) => itemSum + item.qty, 0);
    }, 0);

    // --- FUNGSI AKSI LOGIN ---
    const handleLoginSubmit = (e) => {
        e.preventDefault();

        // Validasi login khusus untuk kredensial Super Admin kamu
        if (username === "admin" && password === "ophelia123") {
            setIsLoggedIn(true);
            setLoginError("");
        } else {
            setLoginError("Kredensial salah! Akses ditolak.");
        }
    };

    // --- RENDERING 1: HALAMAN GATEWAY LOGIN ADMIN ---
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
                            <label>Username / Staff ID</label>
                            <input
                                type="text"
                                required
                                placeholder="Masukkan username admin..."
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password Secret</label>
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn-admin-login">
                            Authorize Entrance
                        </button>
                    </form>

                    <div className="login-card-footer">
                        <p>&copy; Ophelia Core Logistics Gateway.</p>
                    </div>
                </div>
            </div>
        );
    }

    // --- RENDERING 2: HALAMAN UTAMA DASHBOARD (JIKA SUDAH LOGGED IN SUKSES) ---
    return (
        <div className="admin-dashboard-page">
            <div className="admin-layout-wrapper">

                {/* SIDEBAR NAVIGASI PANEL ADMIN */}
                <aside className="admin-sidebar">
                    <div className="sidebar-brand">
                        <i className="fa-solid fa-gears text-blue"></i>
                        <span>Control Panel</span>
                    </div>
                    <nav className="sidebar-menu">
                        <button className={activeMenu === "dashboard" ? "menu-item active" : "menu-item"} onClick={() => setActiveMenu("dashboard")}>
                            <i className="fa-solid fa-chart-pie"></i> Dashboard Overview
                        </button>
                        <button className={activeMenu === "products" ? "menu-item active" : "menu-item"} onClick={() => setActiveMenu("products")}>
                            <i className="fa-solid fa-shirt"></i> Kelola Produk
                        </button>
                        <button className={activeMenu === "articles" ? "menu-item active" : "menu-item"} onClick={() => setActiveMenu("articles")}>
                            <i className="fa-solid fa-newspaper"></i> Kelola Artikel
                        </button>
                        <button className={activeMenu === "users" ? "menu-item active" : "menu-item"} onClick={() => setActiveMenu("users")}>
                            <i className="fa-solid fa-users"></i> Kelola User
                        </button>
                        <button className={activeMenu === "transactions" ? "menu-item active" : "menu-item"} onClick={() => setActiveMenu("transactions")}>
                            <i className="fa-solid fa-receipt"></i> Kelola Transaksi
                        </button>
                    </nav>

                    {/* Tombol Logout Tambahan di Sidebar */}
                    <button className="menu-item btn-logout-sidebar" onClick={() => { setIsLoggedIn(false); setUsername(""); setPassword(""); }} style={{ marginTop: "auto", color: "#e53e3e" }}>
                        <i className="fa-solid fa-right-from-bracket"></i> Exit Session
                    </button>
                </aside>

                {/* AREA KONTEN UTAMA */}
                <main className="admin-main-content">
                    <header className="admin-header">
                        <div className="admin-title-zone">
                            <h1>Ophelia Executive Management</h1>
                            <p>Sistem tata kelola inventaris, publikasi artikel, data pengguna, dan logistik penjualan.</p>
                        </div>
                        <div className="admin-badge">
                            <i className="fa-solid fa-user-shield"></i> Admin Mode
                        </div>
                    </header>

                    {/* ================= TAB 1: DASHBOARD OVERVIEW ================= */}
                    {activeMenu === "dashboard" && (
                        <div className="tab-content-fade">
                            <div className="admin-stats-grid">
                                <div className="stats-card card-blue">
                                    <div className="stats-icon"><i className="fa-solid fa-wallet"></i></div>
                                    <div className="stats-info"><span>Total Revenue</span><h3>${totalRevenue.toFixed(2)}</h3></div>
                                </div>
                                <div className="stats-card card-yellow">
                                    <div className="stats-icon"><i className="fa-solid fa-box-open"></i></div>
                                    <div className="stats-info"><span>Orders Received</span><h3>{totalOrdersCount} Orders</h3></div>
                                </div>
                                <div className="stats-card card-light-blue">
                                    <div className="stats-icon"><i className="fa-solid fa-shirt"></i></div>
                                    <div className="stats-info"><span>Products Sold</span><h3>{totalItemsSold} Items</h3></div>
                                </div>
                            </div>

                            <div className="admin-table-section">
                                <h2>Quick Overview Info</h2>
                                <p style={{ color: "#666", fontSize: "14px" }}>Pilih menu di bilah navigasi kiri untuk melakukan operasi manajemen data (Tambah, Sunting, atau Hapus data secara administratif).</p>
                            </div>
                        </div>
                    )}

                    {/* ================= TAB 2: KELOLA PRODUK ================= */}
                    {activeMenu === "products" && (
                        <div className="admin-table-section tab-content-fade">
                            <div className="section-table-header">
                                <h2>Manajemen Inventaris Produk</h2>
                                <button className="btn-admin-add" onClick={() => alert("Simulasi Tambah Produk Baru")}><i className="fa-solid fa-plus"></i> Tambah Produk</button>
                            </div>
                            <div className="table-responsive-wrapper">
                                <table className="admin-data-table">
                                    <thead>
                                        <tr><th>ID</th><th>Nama Produk</th><th>Kategori</th><th>Harga</th><th>Stok Toko</th><th>Aksi</th></tr>
                                    </thead>
                                    <tbody>
                                        {products.map((p) => (
                                            <tr key={p.id}>
                                                <td>{p.id}</td>
                                                <td><strong>{p.name}</strong></td>
                                                <td>{p.category}</td>
                                                <td className="text-blue">${p.price.toFixed(2)}</td>
                                                <td><span className="stock-indicator">{p.stock} Pcs</span></td>
                                                <td>
                                                    <button className="btn-action-edit" onClick={() => alert(`Edit ${p.name}`)}><i className="fa-solid fa-pen"></i></button>
                                                    <button className="btn-action-delete" onClick={() => setProducts(products.filter(item => item.id !== p.id))}><i className="fa-solid fa-trash-can"></i></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ================= TAB 3: KELOLA ARTIKEL ================= */}
                    {activeMenu === "articles" && (
                        <div className="admin-table-section tab-content-fade">
                            <div className="section-table-header">
                                <h2>Manajemen Publikasi Jurnal & Artikel</h2>
                                <button className="btn-admin-add" onClick={() => alert("Simulasi Tambah Artikel Baru")}><i className="fa-solid fa-plus"></i> Tulis Artikel</button>
                            </div>
                            <div className="table-responsive-wrapper">
                                <table className="admin-data-table">
                                    <thead>
                                        <tr><th>ID</th><th>Judul Publikasi</th><th>Penulis</th><th>Kategori</th><th>Aksi</th></tr>
                                    </thead>
                                    <tbody>
                                        {articles.map((a) => (
                                            <tr key={a.id}>
                                                <td>{a.id}</td>
                                                <td><strong>{a.title}</strong></td>
                                                <td><em>{a.author}</em></td>
                                                <td><span className="payment-method-badge">{a.category}</span></td>
                                                <td>
                                                    <button className="btn-action-edit" onClick={() => alert(`Edit ${a.title}`)}><i className="fa-solid fa-pen"></i></button>
                                                    <button className="btn-action-delete" onClick={() => setArticles(articles.filter(item => item.id !== a.id))}><i className="fa-solid fa-trash-can"></i></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ================= TAB 4: KELOLA USER ================= */}
                    {activeMenu === "users" && (
                        <div className="admin-table-section tab-content-fade">
                            <div className="section-table-header">
                                <h2>Hak Akses & Akun Pengguna</h2>
                                <button className="btn-admin-add" onClick={() => alert("Simulasi Tambah User Akun")}><i className="fa-solid fa-user-plus"></i> Daftarkan User</button>
                            </div>
                            <div className="table-responsive-wrapper">
                                <table className="admin-data-table">
                                    <thead>
                                        <tr><th>ID</th><th>Nama Lengkap</th><th>Email Terdaftar</th><th>Role Akses</th><th>Aksi</th></tr>
                                    </thead>
                                    <tbody>
                                        {users.map((u) => (
                                            <tr key={u.id}>
                                                <td>{u.id}</td>
                                                <td><strong>{u.name}</strong></td>
                                                <td>{u.email}</td>
                                                <td><span className={`role-badge ${u.role === 'Super Admin' ? 'role-gold' : 'role-gray'}`}>{u.role}</span></td>
                                                <td>
                                                    <button className="btn-action-edit" onClick={() => alert(`Ubah Akses ${u.name}`)}><i className="fa-solid fa-user-gear"></i></button>
                                                    <button className="btn-action-delete" onClick={() => setUsers(users.filter(item => item.id !== u.id))}><i className="fa-solid fa-user-minus"></i></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ================= TAB 5: KELOLA TRANSAKSI ================= */}
                    {activeMenu === "transactions" && (
                        <div className="admin-table-section tab-content-fade">
                            <h2>Log Transaksi & Riwayat Pemesanan Masuk</h2>
                            {transactionHistory.length === 0 ? (
                                <div className="no-orders-alert">
                                    <i className="fa-solid fa-folder-open"></i>
                                    <p>Belum ada rekaman invoice transaksi masuk dari halaman checkout.</p>
                                </div>
                            ) : (
                                <div className="table-responsive-wrapper">
                                    <table className="admin-data-table">
                                        <thead>
                                            <tr><th>Invoice ID</th><th>Tanggal</th><th>Nama Pembeli</th><th>Detail Pakaian (Size)</th><th>Metode</th><th>Total Tagihan</th></tr>
                                        </thead>
                                        <tbody>
                                            {transactionHistory.map((order) => (
                                                <tr key={order.orderId}>
                                                    <td className="order-id-td"><strong>{order.orderId}</strong></td>
                                                    <td>{order.date}</td>
                                                    <td>{order.customerName}</td>
                                                    <td>
                                                        <div className="purchased-items-cell">
                                                            {order.items.map((item, idx) => (
                                                                <span key={idx} className="item-token">
                                                                    {item.name} ({item.size}) <mark>x{item.qty}</mark>
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </td>
                                                    <td><span className="payment-method-badge">{order.paymentMethod}</span></td>
                                                    <td className="total-bill-td">${order.totalBill.toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
}