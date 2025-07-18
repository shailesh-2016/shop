import React from "react";
import img5 from "../assets/image/img-5.jpg"; // Placeholder image
import { Heart, ShoppingCart } from "lucide-react";
import Testimonials from "./Testimonial"; // Assuming this is your Testimonials component
import { Link } from "react-router-dom"; // Import Link for navigation
import "../Pages/bestSeller.css"; // Custom CSS for this section

// ✅ Dummy product data for demonstration.
// In a real application, this would come from an API.
const productsData = [
  {
    id: "prod1",
    title: "Enchanted Infinity Ring",
    price: "₹1,299.00",
    image: img5,
    link: "/details/prod1"
  },
  {
    id: "prod2",
    title: "Elegant Diamond Studs",
    price: "₹2,500.00",
    image: img5, // Use different images in a real scenario
    link: "/details/prod2"
  },
  {
    id: "prod3",
    title: "Royal Emerald Pendant",
    price: "₹3,800.00",
    image: img5,
    link: "/details/prod3"
  },
  {
    id: "prod4",
    title: "Classic Gold Bracelet",
    price: "₹1,850.00",
    image: img5,
    link: "/details/prod4"
  },
];

const BestSellers = () => {
  return (
    <div className="container-fluid best-sellers-section py-5"> {/* Added container-fluid for full width, then padding */}
      <div className="section-header d-flex justify-content-between align-items-center mb-4 px-3 px-md-0">
        <div>
          <h2 className="fw-bold display-5 mb-1">
            Our <span className="text-primary-custom">Best Sellers</span>
          </h2>
          <p className="text-muted section-description mb-0">
            Trending now! Shop our most-loved exquisite pieces today.
          </p>
        </div>
        <Link to="/products" className="btn btn-outline-primary-custom view-all-btn"> {/* Use Link */}
          View All <span className="ms-1">→</span> {/* Better arrow icon */}
        </Link>
      </div>

      <div className="row g-4 justify-content-center"> {/* Added justify-content-center for better alignment on smaller screens */}
        {productsData.map((product) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex" key={product.id}> {/* Adjusted grid columns for better responsiveness */}
            <div className="product-card card h-100 border-0 rounded-3 shadow-sm overflow-hidden">
              <Link to={product.link} className="product-image-link">
                <div className="image-wrapper">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="card-img-top product-img"
                  />
                </div>
              </Link>

              {/* Wishlist Button Overlay */}
              <button className="wishlist-overlay-btn" aria-label="Add to wishlist">
                <Heart size={20} color="#fff" fill="#fff" /> {/* Filled heart for prominence */}
              </button>

              {/* Add to Cart Button Overlay */}
              <div className="add-to-cart-overlay-btn">
                <button className="btn btn-primary-custom w-100 d-flex align-items-center justify-content-center gap-2">
                  <ShoppingCart size={18} />
                  ADD TO CART
                </button>
              </div>

              <div className="card-body text-center d-flex flex-column justify-content-between">
                <Link to={product.link} className="product-title-link">
                  <h6 className="card-title fw-semibold text-dark mb-2">{product.title}</h6>
                </Link>
                <p className="product-price fw-bold mb-0">
                  {product.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Testimonials /> {/* Testimonials section */}
    </div>
  );
};

export default BestSellers;