import { useState } from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";

export default function App() {
  const [showBanner, setShowBanner] = useState(true);
  return (
    <Router>
      {showBanner && (
        <div class='promo-banner'>
          <p>Halloween Discount: Diskon 5% dengan 2 barang, diskon 10% dengan 3 atau lebih |{" "}
            <a href='#Halloween'>LIHAT PILIHAN</a>
          </p>
          <button className="close-banner-btn" onClick={() => setShowBanner(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      )}
      <header>
        <div class="logo">
          <h1>Ophelia</h1>
          <nav class="nav-links">
            <a href="/">Home</a>
            <Link to="/" class="active">Shop</Link>
            <a href="/#collections">Collections</a>
            <a href="/#articles">Articles</a>
          </nav>
          <div class="nav-icons">
            <a href="#cart"><i class="fas fa-shopping-cart"></i></a>
            <a href="#user"><i class="fas fa-user"></i></a>
          </div>
        </div>
      </header>

      {/* SISTEM PERPINDAHAN 12 HALAMAN */}
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}