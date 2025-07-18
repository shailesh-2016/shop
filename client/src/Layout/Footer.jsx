import React from "react";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { NavLink } from "react-router-dom";
import './footer.css';

const Footer = () => {
  return (
    <footer className="kuku-footer text-white pt-5" style={{ backgroundColor: "#9D4BE0" }}> {/* Changed to #9D4BE0 */}
      {/* Newsletter Section */}
      <div className="container text-center mb-5 newsletter-section">
        <h4 className="fw-bold mb-3">Subscribe to Our Newsletter</h4>
        <p className="text-opacity-75 mb-4">Stay updated with our latest collections, exclusive offers, and jewelry care tips.</p>

        <div className="d-flex justify-content-center newsletter-form-group">
          <input
            type="email"
            placeholder="Your email address"
            className="form-control newsletter-input rounded-start-pill rounded-end-0"
            aria-label="Your email address"
          />
          <button className="btn btn-light newsletter-btn rounded-end-pill rounded-start-0 px-4">Subscribe</button>
        </div>
      </div>

      {/* Main Footer Links and Info */}
      <div className="container py-5 main-footer-content">
        <div className="row text-center text-md-start">
          {/* KUKU Info & Socials */}
          <div className="col-md-3 mb-4 mb-md-0">
            <h3 className="fw-bold mb-3 kuku-logo-text">KUKU</h3>
            <p className="text-opacity-75 mb-4">
              Crafting timeless gold jewelry pieces that celebrate life’s precious moments.
            </p>
            <div className="d-flex gap-3 justify-content-center justify-content-md-start social-icons">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram size={24} className="social-icon" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook size={24} className="social-icon" />
              </a>
              <a href="https://wa.me/YOUR_PHONE_NUMBER" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Chat">
                <MessageCircle size={24} className="social-icon" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 mb-4 mb-md-0">
            <h6 className="fw-bold mb-3 text-uppercase">Quick Links</h6>
            <ul className="list-unstyled footer-links">
              <li><NavLink to="/" className="footer-link">Home</NavLink></li>
              <li><NavLink to="/about" className="footer-link">About Us</NavLink></li>
              <li><NavLink to="/products" className="footer-link">All Products</NavLink></li>
              <li><NavLink to="/category" className="footer-link">Categories</NavLink></li>
              <li><NavLink to="/contact" className="footer-link">Contact Us</NavLink></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-md-3 mb-4 mb-md-0">
            <h6 className="fw-bold mb-3 text-uppercase">Customer Service</h6>
            <ul className="list-unstyled footer-links">
              <li><NavLink to="/track-order" className="footer-link">Track Order</NavLink></li>
              <li><NavLink to="/returns" className="footer-link">Return & Exchange</NavLink></li>
              <li><NavLink to="/shipping" className="footer-link">Shipping Policy</NavLink></li>
              <li><NavLink to="/faq" className="footer-link">FAQs</NavLink></li>
              <li><NavLink to="/privacy" className="footer-link">Privacy Policy</NavLink></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-3 text-uppercase">Contact Us</h6>
            <p className="mb-2 text-opacity-75">
              123 Jewelry Lane, Gold District<br />Ahmedabad, Gujarat, India 380009
            </p>
            <p className="mb-2">Email: <a href="mailto:info@kukujewels.com" className="footer-link">info@kukujewels.com</a></p>
            <p className="mb-0">Phone: <a href="tel:+918300083000" className="footer-link">+91 83000 83000</a></p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center py-3 copyright-section small">
        © 2025 KUKU JEWELS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;