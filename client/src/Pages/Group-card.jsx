import React, { useEffect, useState } from "react";
import axios from "axios";
import { Heart, ShoppingCart } from "lucide-react";
import Festive from "./Festive"; // Assuming this is another section
import "../Pages/group-card.css"; // Ensure this CSS file is used
import { NavLink } from "react-router-dom";

const Arrival = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true); // Set loading true before fetching
const res = await axios.get(import.meta.env.VITE_BASE_URL_PRODUCTS);
        const allProducts = res.data.products;
        const sorted = allProducts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        const latest4 = sorted.slice(0, 4);
        setProducts(latest4);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        // Optionally, set an error state here to show user an error message
      } finally {
        setLoading(false); // Set loading false after fetch completes (success or error)
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <div className="new-arrivals-section py-5">
      <div className="container">
        {/* Section Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 section-header">
          <div>
            <h2 className="fw-bold display-6 mb-2">New <span className="text-primary-custom">Arrivals</span></h2>
            <p className="lead text-muted mb-0">
              Fresh styles just in! Discover our handpicked latest jewelry arrivals.
            </p>
          </div>
          <NavLink to="/products" className="btn btn-outline-primary-custom btn-lg mt-3 mt-md-0 view-all-btn">
            View All Products &rarr; {/* Changed button text and added arrow */}
          </NavLink>
        </div>

        {/* Product Cards */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary-custom" role="status">
              <span className="visually-hidden">Loading products...</span>
            </div>
            <p className="mt-3 text-muted">Fetching our latest collections...</p>
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-muted py-5">No new products available at the moment. Please check back later!</p>
        ) : (
          <div className="row g-4 justify-content-center"> {/* Added justify-content-center */}
            {products.map((product) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product._id}> {/* Use product._id as key */}
                <div className="card product-card shadow-lg h-100 border-0 rounded-4 overflow-hidden"> {/* Adjusted shadow, border, rounded corners, overflow */}
                  <div className="position-relative product-img-wrapper">
                    <NavLink to={`/details/${product._id}`}> {/* Wrap image in NavLink */}
                      <img
                        src={product.product_images?.[0]}
                        alt={product.product_name}
                        className="card-img-top product-img"
                      />
                    </NavLink>
                    <div className="product-actions"> {/* Actions for hover */}
                      <button className="icon-btn heart-btn" aria-label="Add to wishlist">
                        <Heart size={20} />
                      </button>
                      <button className="icon-btn cart-btn" aria-label="Add to cart">
                        <ShoppingCart size={20} />
                      </button>
                    </div>
                    {/* Optional: New Tag */}
                    <span className="badge new-arrival-badge">New</span>
                  </div>
                  <div className="card-body text-center d-flex flex-column"> {/* Removed justify-content-between */}
                    <NavLink to={`/details/${product._id}`} className="product-title-link">
                      <h6 className="card-title fw-semibold mb-2 text-dark">{product.product_name}</h6>
                    </NavLink>
                    <p className="text-primary-custom fw-bold mb-3 product-price">
                      ₹{product.price.toLocaleString('en-IN')} {/* Format price for Indian locale */}
                    </p>
                    <div className="mt-auto"> {/* Push button to bottom */}
                      <NavLink className="btn btn-primary-custom w-100 d-flex align-items-center justify-content-center gap-2 view-details-btn" to={`/details/${product._id}`}>
                        <ShoppingCart size={18} />
                        View Details
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Festive /> {/* This component will render below New Arrivals */}
    </div>
  );
};

export default Arrival;