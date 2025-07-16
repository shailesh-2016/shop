import React, { useEffect, useState } from "react";
import axios from "axios";
import { Heart, ShoppingCart } from "lucide-react";
import Festive from "./Festive";
import "../Pages/group-card.css";
import { NavLink } from "react-router-dom";

const Arrival = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/products");
        const allProducts = res.data.products;
        const sorted = allProducts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        const latest4 = sorted.slice(0, 4);
        setProducts(latest4);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <div className="py-5">
      <div className="bg-light-gray py-4">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 className="fw-bold">New Arrivals</h4>
              <p className="text-muted mb-0">
                Fresh styles just in! Shop the latest arrivals now.
              </p>
            </div>
            <button className="btn btn-sm btn-light">View All ▾</button>
          </div>

          <div className="row g-4">
            {products.map((product, index) => (
              <div className="col-6 col-md-3" key={index}>
                <div className="card product-card shadow-sm h-100">
                  <div className="position-relative">
                    <img
                      src={product.product_images?.[0]}
                      alt={product.product_name}
                      className="card-img-top product-img"
                    />
                    <div className="position-absolute top-0 end-0 m-2">
                      <Heart
                        size={20}
                        color="white"
                        className="bg-dark bg-opacity-50 p-1 rounded-circle"
                      />
                    </div>
                  </div>
                  <div className="card-body text-center d-flex flex-column justify-content-between">
                    <h6 className="card-title mb-2">{product.product_name}</h6>
                    <p className="text-muted fw-semibold mb-3">
                      ₹{product.price}
                    </p>
                    <div className="add-to-cart-wrapper">
                      <NavLink className="btn btn-cart text-white w-100 d-flex align-items-center justify-content-center gap-2 " to={`/details/${product._id}`}>
                        <ShoppingCart size={18} />
                        View Details
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Festive />
    </div>
  );
};

export default Arrival;
