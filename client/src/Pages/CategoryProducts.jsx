import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../Pages/product.css"; // Reuse product styles from ProductPage

const CategoryProducts = () => {
  const { id } = useParams(); // category ID from URL
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("Products");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategoryProducts();
  }, [id]);

  const fetchCategoryProducts = async () => {
    try {
     const res = await axios.get(
  `${import.meta.env.VITE_BASE_URL_PRODUCTS}/category/${id}`
);

      setProducts(res.data);

      if (res.data.length > 0) {
        setCategoryName(res.data[0].categoryName || "Category");
      }
    } catch (error) {
      console.error("Error fetching category products:", error);
    }
  };

  return (
    <div className="container py-5">
      <h3 className="fw-bold">{categoryName}</h3>
      <p className="text-muted">Home / {categoryName}</p>

      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 mt-3">
        {products.map((product) => (
          <div className="col d-flex" key={product._id}>
            <div className="card border w-100 card-hover-group">
              <div className="position-relative">
                <img
                  src={product.product_images[0]}
                  className="card-img-top"
                  alt={product.product_name}
                  style={{ height: "240px", objectFit: "cover" }}
                />

                {/* ❤️ Wishlist Button (currently dummy) */}
                <button
                  className="wishlist-btn"
                  aria-label="Add to wishlist"
                >
                  🤍
                </button>
              </div>

              <div className="card-body text-center">
                <h6 className="card-title fw-bold mb-1">
                  {product.product_name}
                </h6>
                <p className="text-muted mb-1">{product.material}</p>

                {/* ✅ Price Display with discount logic */}
                {product.discount_price ? (
                  <p className="text-primary fw-bold mb-1">
                    ₹{product.discount_price}
                    <span className="text-muted text-decoration-line-through ms-2 fs-6">
                      ₹{product.price}
                    </span>
                  </p>
                ) : (
                  <p className="text-primary fw-bold mb-1">₹{product.price}</p>
                )}

                {/* 🛒 View Details */}
                <button
                  className="btn btn-primary w-100 hover-cart-btn d-flex align-items-center justify-content-center gap-2"
                  style={{ marginTop: "6px" }}
                  onClick={() => navigate(`/details/${product._id}`)}
                >
                  🛒 View Details
                </button>
              </div>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <p className="text-center">No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
