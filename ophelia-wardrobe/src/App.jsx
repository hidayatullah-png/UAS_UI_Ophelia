import { useState } from "react";
import { HashRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";

function PromoBanner({ showBanner, setShowBanner }) {
  const location = useLocation();
  const isShopPage = location.pathname === '/Shop';

  if (!showBanner || !isShopPage) return null;

  return (
    <div className="promo-banner">
      <p>Halloween Discount: 5% off with 2 items, 10% off with 3 or more |{" "}
        <a href="#Halloween">VIEW OPTIONS</a>
      </p>
      <button className="close-banner-btn" onClick={() => setShowBanner(false)}>
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
}

export default function App() {
  const [showBanner, setShowBanner] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("cart");
  //state data
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  //fungsi tambah ke tas
  const addToCart = (product, size) => {
    setCartItems((prevItems) => {
      // Cek apakah produk dengan ID dan ukuran yang sama sudah ada di keranjang
      const isExist = prevItems.find((item) => item.id === product.id && item.size === size);

      if (isExist) {
        // Jika sudah ada, cukup tambahkan quantity (qty) nya saja
        return prevItems.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      // Jika belum ada, masukkan sebagai item baru di keranjang
      return [...prevItems, { ...product, size, qty: 1 }];
    });

    setIsCartOpen(true);
  };
  //fungsi hapus item satu satu
  const removeFromCart = (id, size) => {
    setCartItems((prevItems) => prevItems.filter((item) => !(item.id === id && item.size === size)));
  };
  //fungsi wishlist
  const toggleWishlist = (product) => {
    setWishlistItems((prevWishlist) => {
      const isInWishlist = prevWishlist.some((item) => item.id === product.id);
      if (isInWishlist) {
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        const newWishlist = [...prevWishlist, product];
        setCartItems((prevCart) => prevCart.filter((Item) => Item.id !== product.id));
        return newWishlist;
      }
    });
  };

  // Hitung total kuantitas barang & total harga belanjaan secara otomatis
  const totalItemsCount = cartItems.reduce((total, item) => total + item.qty, 0);
  const totalHarga = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalSemua = cartItems.reduce((total, item) => total + item.qty, 0) + wishlistItems.length;
  return (
    <Router>
      <PromoBanner showBanner={showBanner} setShowBanner={setShowBanner} />
      <header>
        <div className="logo">
          <h4>Ophelia</h4>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/Shop" className="active">Shop</Link>
            <a href="/#collections">Collections</a>
            <Link to="/Articles">Articles</Link>
          </nav>
          <div className="nav-icons">
            <button className="header-icon-btn" onClick={() => {
              setIsCartOpen(true);
              if (cartItems.length === 0 && wishlistItems.length > 0) {
                setActiveTab("wishlist");
              } else {
                setActiveTab("cart");
              }
            }}
            >
              <i className="fas fa-shopping-cart"></i>
              {totalSemua > 0 && <span className="cart-badge">{totalSemua}</span>}
            </button>
            <a href="#user"><i className="fas fa-user"></i></a>
          </div>
        </div>
      </header>

      {/* OVERLAY & DRAWER KERANJANG BELANJA */}
      <div className={`cart-drawer-overlay ${isCartOpen ? "open" : ""}`} onClick={() => setIsCartOpen(false)}>
        <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="cart-drawer-header">
            <div className="cart-header-tabs">
              <button className={activeTab === "cart" ? "tab-active" : "tab-inactive"} onClick={() => setActiveTab("cart")}>
                Cart ({totalItemsCount})
              </button>
              <button className={activeTab === "wishlist" ? "tab-active" : "tab-inactive"} onClick={() => setActiveTab("wishlist")}>
                Wishlist ({wishlistItems.length})
              </button>
            </div>
            <button className="cart-close-btn" onClick={() => setIsCartOpen(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="cart-notice-bar">
            <p>Collect your order at the store within 4 hours. <Link to="/stores">Select Your Store</Link></p>
          </div>

          <div className="cart-drawer-body">
            {activeTab === "cart" ? (
              cartItems.length === 0 ? (
                <div className="empty-cart-message">
                  <p>Your shopping cart is empty.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div className="cart-item-row" key={`${item.id}-${item.size}`}>
                    <div className="cart-item-img">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <p className="item-price">${item.price.toFixed(2)}</p>
                      <div className="item-meta">
                        <span>{item.qty} Item</span>
                        <span>Size: {item.size}</span>
                      </div>
                      <div className="cart-item-actions">
                        <button className="item-action-btn" onClick={() => toggleWishlist(item)}>
                          <i className={wishlistItems.find((wish) => wish.id === item.id) ? "fas fa-heart active-heart" : "far fa-heart"}></i>
                        </button>
                        <button className="item-action-btn"><i className="fa-solid fa-pen"></i></button>
                        {/* 🛠️ PERBAIKAN: Menghapus item spesifik berdasarkan id dan ukuran */}
                        <button className="item-action-btn" onClick={() => removeFromCart(item.id, item.size)}>
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )
            ) : (
              wishlistItems.length === 0 ? (
                <div className="empty-cart-message"><p>Your wishlist is empty.</p></div>
              ) : (
                wishlistItems.map((item) => (
                  <div className="cart-item-row" key={item.id}>
                    <div className="cart-item-img"><img src={item.image} alt={item.name} /></div>
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <p className="item-price">${item.price.toFixed(2)}</p>
                      <div className="cart-item-actions">
                        {/* Fitur balikkan ke tas belanja */}
                        <button className="item-action-btn" onClick={() => { addToCart(item, "M"); toggleWishlist(item); }}>
                          Move to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="cart-drawer-footer">
              <div className="promo-code-trigger">
                <span>Do you have a promo code?</span>
                <i className="fa-solid fa-chevron-right"></i>
              </div>
              <div className="shipping-info-alert">
                <p><strong>Get free shipping</strong></p>
                <a href="#shipping-info">FULL INFO</a>
              </div>
              <div className="cart-total-row">
                <span>Total</span>
                <strong>${totalHarga.toFixed(2)}</strong>
              </div>
              <button className="btn-process-checkout">
                Process Order
              </button>
            </div>
          )}
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Shop" element={<Catalog addToCart={addToCart} toggleWishlist={toggleWishlist} wishlistItems={wishlistItems} />} />
        <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} toggleWishlist={toggleWishlist} wishlistItems={wishlistItems} />} />
        <Route path="/Articles" element={<Articles />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
      </Routes>
    </Router>
  );
}