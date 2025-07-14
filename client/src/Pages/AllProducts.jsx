// src/Pages/ProductPage.jsx
import React, { useState, useEffect } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import axios from "axios";
import "../Pages/product.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../redux/wish-list/listSlice";
import { toast } from "react-toastify";

const ProductPage = () => {
  const [filters, setFilters] = useState({
    categories: [],
    minPrice: "",
    maxPrice: "",
    materials: [],
  });

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  // ✅ Load products & wishlist
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/products");
        setProducts(res.data.products || []);
        setFilteredProducts(res.data.products || []);
      } catch (err) {
        console.error("❌ Failed to fetch products:", err);
      }
    };
    fetchProducts();
    dispatch(getWishlist());
  }, [dispatch]);

  const applyFilters = () => {
    let filtered = [...products];

    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) =>
        filters.categories.includes(p.category?.cat_name)
      );
    }

    if (filters.materials.length > 0) {
      filtered = filtered.filter((p) =>
        filters.materials.includes(p.material)
      );
    }

    if (filters.minPrice !== "") {
      filtered = filtered.filter(
        (p) => Number(p.price) >= Number(filters.minPrice)
      );
    }

    if (filters.maxPrice !== "") {
      filtered = filtered.filter(
        (p) => Number(p.price) <= Number(filters.maxPrice)
      );
    }

    setFilteredProducts(filtered);
  };

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

  // ✅ Wishlist logic
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
    toast.error("Something went wrong!");
  }
};


  return (
    <div className="container-fluid py-4">
      <h4 className="fw-bold ps-3">All Products</h4>
      <p className="ps-3 text-muted">Home / All Products</p>

      <div className="row">
        {/* Sidebar Filters */}
        <div className="col-md-3">
          <div className="p-3 border rounded">
            <h6 className="fw-bold">Categories</h6>
            {["Rings", "Earrings", "Necklaces", "Bracelets", "Bangles", "Pendants"].map((cat) => (
              <div className="form-check" key={cat}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={cat}
                  checked={filters.categories.includes(cat)}
                  onChange={() => handleCheckboxChange("categories", cat)}
                />
                <label className="form-check-label" htmlFor={cat}>
                  {cat}
                </label>
              </div>
            ))}

            <h6 className="fw-bold mt-4">Price Range</h6>
            <div className="d-flex gap-2">
              <input
                type="number"
                placeholder="₹0"
                className="form-control"
                value={filters.minPrice}
                onChange={(e) =>
                  setFilters({ ...filters, minPrice: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="₹2000"
                className="form-control"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters({ ...filters, maxPrice: e.target.value })
                }
              />
            </div>
            <button
              className="btn btn-primary mt-2 w-100"
              onClick={applyFilters}
            >
              Apply
            </button>

            <h6 className="fw-bold mt-4">Material</h6>
            {["18K Gold", "22K Gold", "Rose Gold", "White Gold"].map((mat) => (
              <div className="form-check" key={mat}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={mat}
                  checked={filters.materials.includes(mat)}
                  onChange={() => handleCheckboxChange("materials", mat)}
                />
                <label className="form-check-label" htmlFor={mat}>
                  {mat}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Product Cards */}
        <div className="col-md-9">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            {filteredProducts.map((product, index) => (
              <div className="col d-flex" key={index}>
                <div className="card border w-100 card-hover-group">
                  <div className="position-relative">
                    <img
                      src={product.product_images?.[0]}
                      className="card-img-top"
                      alt={product.product_name}
                    />

                    {/* ❤️ Wishlist Button */}
                    <button
                      className={`wishlist-btn ${
                        isInWishlist(product._id) ? "active" : ""
                      }`}
                      onClick={() => toggleWishlist(product)}
                      aria-label="Add to wishlist"
                    >
                      <Heart
                        size={18}
                        color={isInWishlist(product._id) ? "#e63946" : "#333"}
                        fill={isInWishlist(product._id) ? "#e63946" : "none"}
                      />
                    </button>

                    <Link
                      to={`/details/${product._id}`}
                      className="btn btn-primary w-100 hover-cart-btn d-flex align-items-center justify-content-center gap-2"
                    >
                      <ShoppingCart size={16} /> View Details
                    </Link>
                  </div>

                  <div className="card-body text-center">
                    <h6 className="card-title">{product.product_name}</h6>
                    <p className="card-text text-primary fw-semibold">
                      ₹{Number(product.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {filteredProducts.length === 0 && (
              <p className="text-center">No products found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
