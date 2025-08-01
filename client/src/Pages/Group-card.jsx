import React, { useEffect, useState } from "react";
import axios from "axios";
import { Heart, ShoppingCart } from "lucide-react";
import Festive from "./Festive";
import "../Pages/group-card.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../redux/wish-list/listSlice"; // ✅ Add thunk
import toast from "react-hot-toast";

const Arrival = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        const res = await axios.get(import.meta.env.VITE_BASE_URL_PRODUCTS);
        const allProducts = res.data.products;
        const sorted = allProducts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        const latest4 = sorted.slice(0, 4);
        setProducts(latest4);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  // ✅ Handle wishlist add
  const handleAddToWishlist = (product) => {
    if (!user) {
      toast.error("Please login to add to wishlist");
      return;
    }

    dispatch(addToWishlist(product))
      .unwrap()
      .then(() => toast.success("❤️ Added to wishlist"))
      .catch(() => toast.error("Failed to add to wishlist"));
  };

  return (
    <div className="new-arrivals-section py-5">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 section-header">
          <div>
            <h2 className="fw-bold display-6 mb-2">
              New <span className="text-primary-custom">Arrivals</span>
            </h2>
            <p className="lead text-muted mb-0">
              Fresh styles just in! Discover our handpicked latest jewelry
              arrivals.
            </p>
          </div>
          <NavLink
            to="/products"
            className="btn btn-outline-primary-custom btn-lg mt-3 mt-md-0 view-all-btn"
          >
            View All Products →
          </NavLink>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary-custom" role="status">
              <span className="visually-hidden">Loading products...</span>
            </div>
            <p className="mt-3 text-muted">Fetching our latest collections...</p>
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-muted py-5">
            No new products available at the moment. Please check back later!
          </p>
        ) : (
          <div className="row g-4 justify-content-center">
            {products.map((product) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3"
                key={product._id}
              >
                <div className="card product-card shadow-lg h-100 border-0 rounded-4 overflow-hidden">
                  <div className="position-relative product-img-wrapper">
                    <NavLink to={`/details/${product._id}`}>
                      <img
                        src={product.product_images?.[0]}
                        alt={product.product_name}
                        className="card-img-top product-img"
                      />
                    </NavLink>
                    <div className="product-actions">
                      {/* ✅ Heart Click Adds to Wishlist */}
                      <button
                        className="icon-btn heart-btn"
                        aria-label="Add to wishlist"
                        onClick={() => handleAddToWishlist(product)}
                      >
                        <Heart size={20} />
                      </button>
                      <button className="icon-btn cart-btn" aria-label="Add to cart">
                        <ShoppingCart size={20} />
                      </button>
                    </div>
                    <span className="badge new-arrival-badge">New</span>
                  </div>
                  <div className="card-body text-center d-flex flex-column">
                    <NavLink
                      to={`/details/${product._id}`}
                      className="product-title-link"
                    >
                      <h6 className="card-title fw-semibold mb-2 text-dark">
                        {product.product_name}
                      </h6>
                    </NavLink>
                    <p className="text-primary-custom fw-bold mb-3 product-price">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                    <div className="mt-auto">
                      <NavLink
                        className="btn btn-primary-custom w-100 d-flex align-items-center justify-content-center gap-2 view-details-btn"
                        to={`/details/${product._id}`}
                      >
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

      <Festive />
    </div>
  );
};

export default Arrival;
