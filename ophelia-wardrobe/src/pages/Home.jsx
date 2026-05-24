import { Link } from "react-router-dom";
//import Articles from "../components/Articles";

export default function Home() {
    return (
        <main>
            <section className="hero">
                <div className="hero-section">
                    <h1>Embrace & Explore The Elegance Of The Night</h1>
                    <p>Premium Gothic & Lolita Attire for Alternative Culture.</p>
                    <Link to="/Shop" className="btn-cta">Shop Now</Link>
                </div>
            </section>

            <section className="new-arrivals">
                <h2>New Arrivals</h2>
                <div className="product-grid">
                    <div className="product-card">
                        <img src="assets/dress1.png" alt="Gothic Dress 1" />
                        <h5>Midnight Elegance Dress</h5>
                        <p>$249.99</p>
                        <Link to="/product/1" className="btn-view">View Details</Link>
                    </div>

                    <div className="product-card">
                        <img src="assets/dress2.png" alt="Gothic Dress 2" />
                        <h5>Gothic Victorian Gown</h5>
                        <p>$199.00</p>
                        <Link to="/product/2" className="btn-view">View Details</Link>
                    </div>

                    <div className="product-card">
                        <img src="assets/dress3.png" alt="Gothic Dress 3" />
                        <h5>Modern Ouji-Style Suit</h5>
                        <p>$159.00</p>
                        <Link to="/product/3" className="btn-view">View Details</Link>
                    </div>

                    <div className="product-card">
                        <img src="assets/dress4.png" alt="Gothic Dress 4" />
                        <h5>Bloodied Lolita Dress</h5>
                        <p>$120.00</p>
                        <Link to="/product/4" className="btn-view">View Details</Link>
                    </div>
                </div>
            </section>

            <section className="ads-banner">
                <div className="ads-content">
                    <h2>October SALE — LIMITED TIME OFFER up to 50%</h2>
                    <p>Don't miss out on our biggest sale of the year!</p>
                    <a href="#bigsale" className="btn-cta">Shop now</a>
                </div>
            </section>

            <section className="collections" id="collections">
                <h2>Featured Collections</h2>
                <div className="collection-grid">
                    <div className="collection-card big-card">
                        <img src="assets/collection1.png" alt="Collection 1" />
                        <h3>Gothic Gown Collection</h3>
                        <a href="#collection1" className="btn-view">Explore Collection</a>
                    </div>
                    <div className="collection-card">
                        <img src="assets/collection2.png" alt="Collection 2" />
                        <h3>Ouji Style Collection</h3>
                        <a href="#collection2" className="btn-view">Explore Collection</a>
                    </div>
                    <div className="collection-card">
                        <img src="assets/collection3.png" alt="Collection 3" />
                        <h3>Lolita Style Collection</h3>
                        <a href="#collection3" className="btn-view">Explore Collection</a>
                    </div>
                    <div className="collection-card">
                        <img src="assets/collection4.png" alt="Collection 4" />
                        <h3>Seasonal Collection</h3>
                        <a href="#collection4" className="btn-view">Explore Collection</a>
                    </div>
                    <div className="collection-card">
                        <img src="assets/collection5.png" alt="Collection 5" />
                        <h3>Custom Design Collection</h3>
                        <a href="#collection5" className="btn-view">Explore Collection</a>
                    </div>
                </div>
            </section>

            <section className="articles" id="articles">
                <h2>Latest Articles</h2>
                <div className="article-grid">
                    <div className="article-card">
                        <img src="assets/article1.png" alt="Article 1" />
                        <h4>How to Style Gothic Dresses for Everyday Wear</h4>
                        <a href="#article1" className="btn-read">Read More</a>
                    </div>
                    <div className="article-card">
                        <img src="assets/article2.png" alt="Article 2" />
                        <h4>5 Essentials for a Dark Minimalist Wardrobe</h4>
                        <a href="#article2" className="btn-read">Read More</a>
                    </div>
                    <div className="article-card">
                        <img src="assets/article3.png" alt="Article 3" />
                        <h4>Top 10 Must-Have Accessories for Gothic Outfits</h4>
                        <a href="#article3" className="btn-read">Read More</a>
                    </div>
                </div>
            </section>
            <footer>
                <footer>
                    <div className="footer-links">
                        <Link to="/">Home</Link>
                        <Link to="/Shop">Shop</Link>
                        <a href="#collections">Collections</a>
                        <Link to="/articles">Articles</Link>
                        <a href="#contact">Contact Us</a>
                    </div>
                    <p>&copy; 2023 Ophelia Wardrobe. All rights reserved.</p>
                </footer>
            </footer>
        </main>
    );
}