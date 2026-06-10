import { useState } from "react";
import { Link } from "react-router-dom";

export default function Profile({ transactionHistory }) {
    const [customerUser, setCustomerUser] = useState(() => {
        const savedUser = localStorage.getItem("ophelia_customer");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleCustomerLogin = (e) => {
        e.preventDefault();
        if (email && password.length >= 6) {
            const profileData = {
                name: "Hidayatullah Sukma Dewi",
                email: email,
                joinedDate: "October 2025"
            };
            setCustomerUser(profileData);
            localStorage.setItem("ophelia_customer", JSON.stringify(profileData));
            setErrorMsg("");
        } else {
            setErrorMsg("Password must be at least 6 characters long.");
        }
    };

    const handleCustomerLogout = () => {
        setCustomerUser(null);
        localStorage.removeItem("ophelia_customer");
    };

    // ================= TAMPILAN 1: FORM LOGIN =================
    if (!customerUser) {
        return (
            <div className="customer-login-page">
                <div className="login-container">
                    <div className="login-header-text">
                        <h1>Welcome to Ophelia</h1>
                        <p>Sign in to access your dark wardrobe collection, track orders, and unlock exclusive subcultural rewards.</p>
                    </div>

                    <div className="login-form-card">
                        <form onSubmit={handleCustomerLogin} className="customer-form-element">
                            {errorMsg && (
                                <div className="alert-msg error-style">
                                    <i className="fa-solid fa-circle-exclamation"></i> {errorMsg}
                                </div>
                            )}

                            <div className="input-field-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter your email..."
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="input-field-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="forgot-pwd-link-zone">
                                <Link to="/forgot-password">Forgot your password?</Link>
                            </div>

                            <button type="submit" className="btn-customer-signin">
                                Sign In
                            </button>
                        </form>

                        <div className="register-redirect-footer">
                            <p>New to Ophelia? <Link to="/register">Create an account</Link></p>
                        </div>
                    </div>
                    <div className="admin-gateway-link-zone">
                        <p>Are you a team member? <Link to="/admin">Access Staff Terminal</Link></p>
                    </div>

                </div>
            </div>
        );
    }

    // ================= TAMPILAN 2: PROFILE & HISTORY =================
    return (
        <div className="customer-profile-page-wrapper">

            {/* Header Info Akun */}
            <div className="profile-dashboard-header">
                <div className="profile-header-info">
                    <h1 className="profile-main-title">My Account</h1>
                    <p className="profile-member-since">
                        Gothic Culture Member since {customerUser.joinedDate}
                    </p>
                </div>
                <button className="btn-customer-logout" onClick={handleCustomerLogout}>
                    Sign Out
                </button>
            </div>

            {/* Grid: Sidebar + Konten */}
            <div className="profile-grid-layout">

                {/* Sidebar Info Customer */}
                <div className="profile-sidebar-card">
                    <h3 className="profile-sidebar-title">Customer Details</h3>
                    <p className="profile-customer-name">{customerUser.name}</p>
                    <p className="profile-customer-email">{customerUser.email}</p>
                    <span className="profile-vip-badge">VIP Member</span>
                </div>

                {/* Riwayat Pesanan */}
                <div className="profile-history-section">
                    <h3 className="profile-history-title">Order History</h3>

                    {transactionHistory.length === 0 ? (
                        <p className="profile-empty-orders">
                            You haven't placed any orders yet. Once you make a purchase, your invoice history will be listed here.
                        </p>
                    ) : (
                        <div className="profile-orders-list">
                            {transactionHistory.map((order) => (
                                <div key={order.orderId} className="profile-order-card">

                                    {/* Order Meta */}
                                    <div className="order-card-meta">
                                        <span className="order-meta-id">
                                            Order ID: <strong>{order.orderId}</strong>
                                        </span>
                                        <span className="order-meta-date">Date: {order.date}</span>
                                    </div>

                                    {/* Item List */}
                                    <div className="order-items-list">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="order-item-row">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="order-item-img"
                                                />
                                                <div className="order-item-info">
                                                    <h4 className="order-item-name">{item.name}</h4>
                                                    <span className="order-item-meta">
                                                        Size: {item.size} | Qty: {item.qty}
                                                    </span>
                                                </div>
                                                <span className="order-item-subtotal">
                                                    ${(item.price * item.qty).toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Total */}
                                    <div className="order-card-total">
                                        <span>Total Payment ({order.paymentMethod}):</span>
                                        <span>${order.totalBill.toFixed(2)}</span>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}