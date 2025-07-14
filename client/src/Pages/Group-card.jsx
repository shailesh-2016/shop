import React, { useEffect, useState } from "react";
import axios from "axios";
import { Heart, ShoppingCart } from "lucide-react";
import Festive from "./Festive";
import "../Pages/group-card.css";

const Arrival = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/products");
        const allProducts = res.data.products;

        // 👇 Logic: Sort by latest (assuming createdAt exists)
        const sorted = allProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // 👇 Get only first 4 products
        const latest4 = sorted.slice(0, 4);
        setProducts(latest4);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold">New Arrival</h4>
          <p className="text-muted mb-0">
            Fresh styles just in! Shop the latest arrivals now.
          </p>
        </div>
        <button className="btn btn-sm btn-light">View All ▾</button>
      </div>

      <div className="row g-4">
        {products.map((product, index) => (
          <div className="col-6 col-md-3" key={index}>
            <div className="product-card card border-0 shadow-sm overflow-hidden position-relative">
              <div className="image-wrapper position-relative">
                <img
                  src={product.product_images?.[0]}
                  alt={product.product_name}
                  className="card-img-top product-img"
                />
                <div className="position-absolute top-0 end-0 m-2">
                  <Heart
                    size={22}
                    color="white"
                    className="bg-dark bg-opacity-50 p-1 rounded-circle"
                  />
                </div>
                <div className="add-to-cart-btn">
                  <button className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center gap-2">
                    <ShoppingCart size={18} />
                    ADD TO CART
                  </button>
                </div>
              </div>
              <div className="card-body text-center pt-3">
                <h6 className="card-title mb-1">{product.product_name}</h6>
                <p className="text-muted fw-semibold mb-0">₹{product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Festive />
    </div>
  );
};

export default Arrival;
