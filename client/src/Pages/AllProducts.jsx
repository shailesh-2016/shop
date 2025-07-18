import React, { useState, useEffect, useCallback } from "react"; // Added useCallback
import { ShoppingCart, Heart, Filter, X } from "lucide-react"; // Added Filter and X icons
import axios from "axios";
import "./AllProducts.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../redux/wish-list/listSlice";
import { toast } from "react-toastify";

const shuffleArray = (array) => {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};

const ProductPage = () => {
  const [filters, setFilters] = useState({
    categories: [],
    minPrice: "",
    maxPrice: "",
    materials: [],
  });
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for products
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for mobile sidebar

  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  // Fetch products & wishlist
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:8000/api/products");
        const shuffled = shuffleArray(res.data.products || []);
        setProducts(shuffled);
        setFilteredProducts(shuffled); // Initialize filtered products
      } catch (err) {
        console.error("❌ Failed to fetch products:", err);
        toast.error("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
    dispatch(getWishlist()); // Fetch wishlist on component mount
  }, [dispatch]);

  // Apply filters logic (memoized with useCallback)
  const applyFilters = useCallback(() => {
    let currentFiltered = [...products];

    if (filters.categories.length > 0) {
      currentFiltered = currentFiltered.filter((p) =>
        filters.categories.includes(p.category?.cat_name)
      );
    }

    if (filters.materials.length > 0) {
      currentFiltered = currentFiltered.filter((p) =>
        filters.materials.includes(p.material)
      );
    }

    if (filters.minPrice !== "") {
      currentFiltered = currentFiltered.filter(
        (p) => Number(p.price) >= Number(filters.minPrice)
      );
    }

    if (filters.maxPrice !== "") {
      currentFiltered = currentFiltered.filter(
        (p) => Number(p.price) <= Number(filters.maxPrice)
      );
    }

    setFilteredProducts(currentFiltered);
  }, [products, filters]); // Dependencies for useCallback

  // Re-apply filters whenever filters state changes
  useEffect(() => {
    applyFilters();
  }, [filters, applyFilters]); // Dependency on applyFilters

  const handleCheckboxChange = (type, value) => {
    setFilters((prev) => {
      const isChecked = prev[type].includes(value);
      return {
        ...prev,
        [type]: isChecked
          ? prev[type].filter((item) => item !== value)
          : [...prev[type], value],
      };
    });
  };

  const handlePriceInputChange = (e, type) => {
    setFilters({ ...filters, [type]: e.target.value });
  };

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      minPrice: "",
      maxPrice: "",
      materials: [],
    });
    // filteredProducts will automatically update via useEffect
    toast.info("All filters cleared!");
  };

  // Wishlist logic
  const isInWishlist = (id) => {
    return wishlistItems.some((item) => item._id === id);
  };

  const toggleWishlist = async (product) => {
    try {
      if (isInWishlist(product._id)) {
        toast.info("Removed from wishlist");
        await dispatch(removeFromWishlist(product._id)).unwrap();
      } else {
        toast.success("Added to wishlist");
        await dispatch(addToWishlist(product)).unwrap();
      }
    } catch (err) {
      toast.error("Something went wrong with wishlist!");
    }
  };

  return (
    <div className="product-page-wrapper container-fluid py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 px-3 px-md-0">
        <div>
          <h2 className="fw-bold display-5 mb-1">
            Our <span className="text-primary-custom">Collection</span>
          </h2>
          <p className="text-muted product-breadcrumb">
            <Link to="/" className="text-muted text-decoration-none hover-primary-custom">Home</Link> / All Products
          </p>
        </div>
        {/* Mobile Filter Button */}
        <button
          className="btn btn-outline-primary-custom d-md-none filter-toggle-btn"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Filter size={18} className="me-2" />
          Filters
        </button>
      </div>

      <div className="row g-4">
        {/* Sidebar Filters - Conditionally visible on mobile */}
        <div className={`col-md-3 product-sidebar ${isSidebarOpen ? "open" : ""}`}>
          <div className="sidebar-header d-flex justify-content-between align-items-center d-md-none p-3 border-bottom">
            <h5 className="mb-0 fw-bold">Filters</h5>
            <button className="btn-close" onClick={() => setIsSidebarOpen(false)}></button>
          </div>
          <div className="p-4 bg-white rounded-3 shadow-sm filter-card">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">Apply Filters</h5>
              <button
                className="btn btn-sm btn-outline-danger-custom clear-filters-btn"
                onClick={clearAllFilters}
              >
                <X size={16} /> Clear All
              </button>
            </div>

            <div className="filter-group mb-4 pb-3 border-bottom">
              <h6 className="fw-bold mb-3 text-primary-custom-dark">Categories</h6>
              {["Rings", "Earrings", "Necklaces", "Bracelets", "Bangles", "Pendants"].map((cat) => (
                <div className="form-check custom-checkbox mb-2" key={cat}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`cat-${cat}`}
                    checked={filters.categories.includes(cat)}
                    onChange={() => handleCheckboxChange("categories", cat)}
                  />
                  <label className="form-check-label" htmlFor={`cat-${cat}`}>
                    {cat}
                  </label>
                </div>
              ))}
            </div>

            <div className="filter-group mb-4 pb-3 border-bottom">
              <h6 className="fw-bold mb-3 text-primary-custom-dark">Price Range</h6>
              <div className="d-flex gap-2 mb-2">
                <input
                  type="number"
                  placeholder="Min Price (₹)"
                  className="form-control filter-input"
                  value={filters.minPrice}
                  onChange={(e) => handlePriceInputChange(e, "minPrice")}
                />
                <input
                  type="number"
                  placeholder="Max Price (₹)"
                  className="form-control filter-input"
                  value={filters.maxPrice}
                  onChange={(e) => handlePriceInputChange(e, "maxPrice")}
                />
              </div>
            </div>

            <div className="filter-group mb-0">
              <h6 className="fw-bold mb-3 text-primary-custom-dark">Material</h6>
              {["18K Gold", "22K Gold", "Rose Gold", "White Gold"].map((mat) => (
                <div className="form-check custom-checkbox mb-2" key={mat}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`mat-${mat}`}
                    checked={filters.materials.includes(mat)}
                    onChange={() => handleCheckboxChange("materials", mat)}
                  />
                  <label className="form-check-label" htmlFor={`mat-${mat}`}>
                    {mat}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Cards */}
        <div className="col-md-9 product-grid-container">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary-custom" role="status">
                <span className="visually-hidden">Loading products...</span>
              </div>
              <p className="mt-3 text-muted">Fetching our beautiful jewelry collection...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="alert alert-info text-center py-4 my-5" role="alert">
              <h5 className="alert-heading">No Products Found!</h5>
              <p className="mb-0">
                Looks like your current filters don't match any products. Try adjusting them.
              </p>
              <button className="btn btn-link text-primary-custom mt-2" onClick={clearAllFilters}>
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4"> {/* Adjusted grid columns */}
              {filteredProducts.map((product) => (
                <div className="col d-flex" key={product._id}> {/* Use product._id for key */}
                  <div className="card product-card h-100 border-0 rounded-3 shadow-sm overflow-hidden">
                    <Link to={`/details/${product._id}`} className="product-image-link">
                      <div className="product-image-wrapper">
                        <img
                          src={product.product_images?.[0]}
                          className="card-img-top product-img"
                          alt={product.product_name}
                        />
                      </div>
                    </Link>

                    {/* ❤️ Wishlist Button */}
                    <button
                      className={`wishlist-btn ${
                        isInWishlist(product._id) ? "active" : ""
                      }`}
                      onClick={() => toggleWishlist(product)}
                      aria-label={isInWishlist(product._id) ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <Heart
                        size={20} // Slightly larger icon
                        color={isInWishlist(product._id) ? "#e63946" : "#777"} // Darker gray when not active
                        fill={isInWishlist(product._id) ? "#e63946" : "none"}
                      />
                    </button>

                    <div className="card-body text-center d-flex flex-column justify-content-between">
                      <Link to={`/details/${product._id}`} className="product-title-link">
                        <h6 className="card-title fw-semibold text-dark mb-2">{product.product_name}</h6>
                      </Link>
                      <p className="card-text product-price fw-bold mb-3">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </p>

                      <Link
                        to={`/details/${product._id}`}
                        className="btn btn-primary-custom w-100 d-flex align-items-center justify-content-center gap-2 view-details-btn mt-auto" // mt-auto to push button to bottom
                      >
                        <ShoppingCart size={18} /> View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;