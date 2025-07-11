import React from "react";
import img5 from "../assets/image/img-5.jpg";
import { Heart, ShoppingCart } from "lucide-react";
import Testimonials from "./Testimonial";
import "../Pages/group-card.css";


const products = new Array(4).fill({
  title: "Gold Infinity Ring",
  price: "$1,299.00",
  image: img5,
});

const BestSellers = () => {
  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold">Best Sellers</h4>
          <p className="text-muted mb-0">
            Trending now! Shop our most-loved best sellers today.
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
                  src={product.image}
                  alt={product.title}
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
                <h6 className="card-title mb-1">{product.title}</h6>
                <p className="text-muted fw-semibold mb-0">{product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Testimonials />
    </div>

  );
};

export default BestSellers;
