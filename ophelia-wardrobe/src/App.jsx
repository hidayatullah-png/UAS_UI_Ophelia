import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Catalog from "./pages/Catalog";

// Halaman placeholder sementara untuk detail produk
function ProductDetailPlaceholder() {
  return <div style={{ padding: "50px", textAlign: "center" }}><h2>Laman Detail Produk (Coming Soon)</h2></div>;
}

export default function App() {
  return (
    <Router>
      {/* NAVBAR REUSABLE DI REACT */}
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
        <Route path="/product/:id" element={<ProductDetailPlaceholder />} />
      </Routes>
    </Router>
  );
}