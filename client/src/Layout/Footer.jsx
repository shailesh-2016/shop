import React from "react";
import { Instagram, Facebook, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-purple text-white pt-5" style={{ backgroundColor: "#a44fff" }}>
      <div className="container text-center mb-5">
        <h4 className="fw-bold">Subscribe to Our Newsletter</h4>
        <p>Stay updated with our latest collections, exclusive offers, and jewelry care tips</p>

        <div className="d-flex justify-content-center">
          <input
            type="email"
            placeholder="Your email address"
            className="form-control w-50 rounded-start"
          />
          <button className="btn btn-light rounded-end px-4">Subscribe</button>
        </div>
      </div>

      <div className="container py-5 border-top border-white">
        <div className="row text-center text-md-start">
          <div className="col-md-3 mb-4">
            <h3 className="fw-bold">KUKU</h3>
            <p>Crafting timeless gold jewelry pieces that celebrate life’s precious moments.</p>
            <div className="d-flex gap-3 justify-content-center justify-content-md-start">
              <Instagram size={20} />
              <MessageCircle size={20} />
              <Facebook size={20} />
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li>Home</li>
              <li>About</li>
              <li>All Product</li>
              <li>Categories</li>
              <li>Contact</li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">Customer Service</h6>
            <ul className="list-unstyled">
              <li>Track Order</li>
              <li>Return & Exchange</li>
              <li>Shipping Policy</li>
              <li>FAQs</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">Contact Us</h6>
            <p>123 Jewelry Lane, Gold District<br />New York, NY 10001</p>
            <p>Email: info@kukujewels.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
        </div>
      </div>

      <div className="text-center py-3 border-top border-white small">
        © 2025 KUKU JEWELS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
