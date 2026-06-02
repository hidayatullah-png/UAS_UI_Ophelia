import { useState } from "react";
import { Link } from "react-router-dom";

export default function Checkout({ cartItems, totalHarga, setCartItems }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        paymentMethod: "cod"
    });
    const [isOrdered, setIsOrdered] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cartItems.length === 0) return alert("Your cart is empty!");

        setIsOrdered(true);
        setCartItems([]); // Mengosongkan state keranjang
        localStorage.removeItem("ophelia_cart"); // 🛠️ Menghapus data keranjang di storage agar tidak muncul lagi setelah checkout sukses
    };

    if (isOrdered) {
        return (
            <div className="checkout-success-wrapper">
                <i className="fa-solid fa-circle-check success-icon"></i>
                <h2>Order Placed Successfully!</h2>
                <p>Thank you for shopping with Ophelia. Your gothic attire will be processed shortly.</p>
                <Link to="/" className="btn-success-back">
                    Back to Homepage
                </Link>
            </div>
        );
    }

    return (
        <div className="checkout-page-wrapper">
            <h1 className="checkout-main-title">Checkout</h1>

            <div className={`checkout-grid-layout ${cartItems.length === 0 ? "empty-layout" : ""}`}>

                {/* KOLOM KIRI: FORM DATA CUSTOMER */}
                <form onSubmit={handleSubmit} className="checkout-shipping-form">
                    <h3>Shipping & Customer Information</h3>

                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" name="name" required value={formData.name} onChange={handleChange} />
                    </div>

                    <div className="form-row-twin">
                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" name="email" required value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Full Delivery Address</label>
                        <textarea name="address" required rows="4" value={formData.address} onChange={handleChange}></textarea>
                    </div>

                    <div className="form-group">
                        <label>Payment Method</label>
                        <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                            <option value="cod">Cash On Delivery (COD)</option>
                            <option value="transfer">Bank Transfer (Manual Verification)</option>
                        </select>
                    </div>

                    <button type="submit" className="btn-submit-order">
                        Place Order Now (${totalHarga.toFixed(2)})
                    </button>
                </form>

                {/* KOLOM KANAN: RINGKASAN BELANJA */}
                {cartItems.length > 0 && (
                    <div className="checkout-summary-sidebar">
                        <h3>Order Summary</h3>
                        <div className="checkout-summary-items-list">
                            {cartItems.map((item) => (
                                <div key={`${item.id}-${item.size}`} className="checkout-summary-item-row">
                                    <img src={item.image} alt={item.name} />
                                    <div className="summary-item-info">
                                        <h4>{item.name}</h4>
                                        <p>Qty: {item.qty} | Size: {item.size}</p>
                                    </div>
                                    <strong className="summary-item-subtotal">${(item.price * item.qty).toFixed(2)}</strong>
                                </div>
                            ))}
                        </div>
                        <div className="checkout-total-bill-row">
                            <span>Total To Pay:</span>
                            <span className="final-price-num">${totalHarga.toFixed(2)}</span>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}