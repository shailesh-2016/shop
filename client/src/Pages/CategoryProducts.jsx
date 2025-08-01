import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom"; // NavLink import kiya
import axios from "axios";
import { Heart, ShoppingCart } from "lucide-react"; // Icons import kiye
import "../Pages/product.css"; // Ensure this CSS file is used

const CategoryProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("Loading Category...");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlistActive, setWishlistActive] = useState({}); // Wishlist state

  // Function to toggle wishlist status
  const toggleWishlist = (productId) => {
    setWishlistActive(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL_PRODUCTS}/category/${id}`
        );

        setProducts(res.data);

        if (res.data.length > 0) {
          setCategoryName(res.data[0].categoryName || res.data[0].category?.name || "Category Products");
        } else {
          setCategoryName(`Category: ${id}`);
        }
      } catch (err) {
        console.error("Error fetching category products:", err);
        setError("Failed to load products. Please try again later.");
        setProducts([]);
        setCategoryName("Error Loading Category");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [id]);

  return (
    <div className="category-products-section py-5"> {/* Added section class */}
      <div className="container">
        {/* Section Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 section-header">
          <div>
            <h2 className="fw-bold display-6 mb-2">{categoryName}</h2>
            <p className="lead text-muted mb-0">
              Explore our exquisite collection of {categoryName} products.
            </p>
          </div>
          {/* Optional: Agar aap category page par 'View All' button chahte hain */}
          {/* <NavLink to="/products" className="btn btn-outline-primary-custom btn-lg mt-3 mt-md-0 view-all-btn">
            View All Products &rarr;
          </NavLink> */}
        </div>

        {/* Product Cards Grid */}
        <div className="row g-4 justify-content-center">
          {loading ? (
            <div className="col-12 text-center py-5">
              <div className="spinner-border text-primary-custom" role="status">
                <span className="visually-hidden">Loading products...</span>
              </div>
              <p className="mt-3 text-muted">Fetching {categoryName} items...</p>
            </div>
          ) : error ? (
            <div className="col-12 text-center text-danger py-5">
              <p>{error}</p>
            </div>
          ) : products.length === 0 ? (
            <p className="col-12 text-center text-muted py-5 no-products-message">
              No products found in this category. Please check back later!
            </p>
          ) : (
            products.map((product) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product._id}>
                <div className="card product-card h-100"> {/* Replaced card-hover-group with product-card */}
                  <div className="position-relative product-img-wrapper">
                    <NavLink to={`/details/${product._id}`}>
                      <img
                        src={product.product_images?.[0]}
                        alt={product.product_name}
                        className="card-img-top product-img" // Added product-img class
                      />
                    </NavLink>
                    <div className="product-actions">
                      {/* Wishlist Button - using icon-btn and Heart lucide icon */}
                      <button
                        className={`icon-btn heart-btn ${wishlistActive[product._id] ? 'active' : ''}`}
                        aria-label="Add to wishlist"
                        onClick={() => toggleWishlist(product._id)}
                      >
                        <Heart size={20} />
                      </button>
                      {/* Cart Icon (optional, if you want add-to-cart on hover) */}
                      {/* <button className="icon-btn cart-btn" aria-label="Add to cart">
                        <ShoppingCart size={20} />
                      </button> */}
                    </div>
                    {/* Optional: New Tag (if applicable for some category products) */}
                    {/* <span className="badge new-arrival-badge">New</span> */}
                  </div>
                  <div className="card-body d-flex flex-column">
                    <NavLink to={`/details/${product._id}`} className="product-title-link">
                      <h6 className="card-title fw-semibold">{product.product_name}</h6>
                    </NavLink>
                    {/* Product Material (optional, can be added if needed) */}
                    {product.material && <p className="product-material">{product.material}</p>}

                    {/* Price Display with discount logic */}
                    {product.discount_price ? (
                      <p className="product-price">
                        ₹{product.discount_price.toLocaleString('en-IN')}
                        <span className="text-muted text-decoration-line-through">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                      </p>
                    ) : (
                      <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
                    )}

                    {/* View Details Button */}
                    <div className="mt-auto">
                      <NavLink
                        className="btn view-details-btn"
                        to={`/details/${product._id}`}
                      >
                        <ShoppingCart size={18} />
                        View Details
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;