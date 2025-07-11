import React, { useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import img5 from "../assets/image/img-5.jpg";
import "../Pages/product.css";

const ProductPage = () => {
  const [filters, setFilters] = useState({
    categories: [],
    minPrice: "",
    maxPrice: "",
    materials: [],
  });

  const allProducts = Array(6).fill({
    name: "Gold Infinity Ring",
    price: 1299,
    image: img5,
  });

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

  return (
    <div className="container-fluid py-4">
      <h4 className="fw-bold ps-3">All Products</h4>
      <p className="ps-3 text-muted">Home / All Products</p>

      <div className="row">
        <div className="col-md-3">
          <div className="p-3 border rounded">
            <h6 className="fw-bold">Categories</h6>
            {["Rings", "Earrings", "Necklaces", "Bracelets", "Bangles", "Pendants"].map((cat) => (
              <div className="form-check" key={cat}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={cat}
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
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
              />
              <input
                type="number"
                placeholder="₹2000"
                className="form-control"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
              />
            </div>
            <button className="btn btn-primary mt-2 w-100">Apply</button>

            <h6 className="fw-bold mt-4">Material</h6>
            {["18K Gold", "22K Gold", "Rose Gold", "White Gold"].map((mat) => (
              <div className="form-check" key={mat}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={mat}
                  onChange={() => handleCheckboxChange("materials", mat)}
                />
                <label className="form-check-label" htmlFor={mat}>
                  {mat}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-9">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {allProducts.map((product, index) => (
              <div className="col" key={index}>
                <div className="card border h-100 card-hover-group">
                  <div className="position-relative">
                    <img src={product.image} className="card-img-top" alt={product.name} />

                    <button className="btn btn-light rounded-circle shadow-sm hover-buttons">
                      <Heart size={18} />
                    </button>

                    <button className="btn btn-primary w-100 hover-cart-btn d-flex align-items-center justify-content-center gap-2">
                      <ShoppingCart size={16} /> Add to Cart
                    </button>
                  </div>

                  <div className="card-body text-center">
                    <h6 className="card-title">{product.name}</h6>
                    <p className="card-text text-primary fw-semibold">₹{product.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
