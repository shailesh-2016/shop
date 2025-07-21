import React, { useEffect, useRef, useState } from "react";
// Header.css ko import karna na bhulein!
import "../Layout/header.css";
import { Heart, Menu, Search, ShoppingCart, User } from "lucide-react";
import logo from "../assets/image/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/auth-slice";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);

  const cartCount = cartItems?.length || 0;
  const wishlistCount = wishlistItems?.length || 0;

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
    setShowDropdown(false); // Dropdown close karein logout ke baad
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* --- Announcement Bar (Top Navbar) --- */}
      <div className="announcement-bar py-2 text-center bg-dark text-white d-none d-md-block">
        {" "}
        {/* d-none d-md-block for mobile hide */}
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <p className="mb-0 mx-auto">
            <small>Free shipping on all orders above ₹499</small>
          </p>
          <div className="d-flex gap-3">
            <a
              href="tel:+918300083000"
              className="text-white text-decoration-none d-flex align-items-center"
            >
              <i className="bi bi-telephone-fill me-1"></i>{" "}
              <small>+91 83000 83000</small>
            </a>
            <a
              href="mailto:kukujewel@gmail.com"
              className="text-white text-decoration-none d-flex align-items-center"
            >
              <i className="bi bi-envelope-fill me-1"></i>{" "}
              <small>kukujewel@gmail.com</small>
            </a>
          </div>
        </div>
      </div>

      {/* --- Main Navbar (Logo, Nav Links, Icons) --- */}
      <header className="main-header shadow-sm bg-white">
        <nav className="navbar navbar-expand-lg navbar-light container">
          <NavLink to="/" className="navbar-brand">
            <img src={logo} alt="Kuku Jewel Logo" className="header-logo" />
          </NavLink>

          {/* Toggler for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <Menu size={24} color="#333" /> {/* Darker icon color */}
          </button>

          <div className="collapse navbar-collapse" id="mainNavbar">
            {/* Navigation Links */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 main-nav-links">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>{" "}
                {/* Changed to "/" for home */}
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  All Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/category">
                  Categories
                </NavLink>{" "}
                {/* Changed to Categories */}
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact Us
                </NavLink>{" "}
                {/* Changed to Contact Us */}
              </li>
            </ul>

            {/* Right Icons */}
            <div className="d-flex align-items-center gap-3 header-icons-group">
              {/* Search Icon */}
              <div className="icon-wrapper clickable-icon" aria-label="Search">
                <Search size={20} color="#555" /> {/* Softer icon color */}
              </div>

              {/* Cart Icon */}
              <div className="position-relative">
                <NavLink
                  to="/cart"
                  className="icon-wrapper clickable-icon"
                  aria-label="Shopping Cart"
                >
                  <ShoppingCart size={20} color="#555" />
                </NavLink>
                {cartCount > 0 && (
                  <span className="icon-badge badge bg-danger rounded-pill">
                    {cartCount}
                  </span>
                )}
              </div>

              {/* Wishlist Icon */}
              <div className="position-relative">
                <NavLink
                  to="/wish"
                  className="icon-wrapper clickable-icon"
                  aria-label="Wishlist"
                >
                  <Heart size={20} color="#555" />
                </NavLink>
                {wishlistCount > 0 && (
                  <span className="icon-badge badge bg-danger rounded-pill">
                    {wishlistCount}
                  </span>
                )}
              </div>

              {/* User Icon & Dropdown */}
              <div className="dropdown position-relative" ref={dropdownRef}>
                <div
                  className="icon-wrapper clickable-icon"
                  onClick={toggleDropdown}
                  aria-label="User Account"
                  role="button" // Indicates it's interactive
                  aria-haspopup="true"
                  aria-expanded={showDropdown}
                >
                  <User size={20} color="#555" />
                </div>

                {showDropdown && (
                  <ul
                    className="dropdown-menu dropdown-menu-end show fade-in-up" // Added fade-in-up class
                    style={{ position: "absolute", right: 0, zIndex: 1000 }} // Increased zIndex
                  >
                    {!isAuthenticated ? (
                      <>
                        <li>
                          <NavLink
                            className="dropdown-item"
                            to="/login"
                            onClick={() => setShowDropdown(false)}
                          >
                            Login
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            className="dropdown-item"
                            to="/signup"
                            onClick={() => setShowDropdown(false)}
                          >
                            Signup
                          </NavLink>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <NavLink
                            className="dropdown-item"
                            to="/profile"
                            onClick={() => setShowDropdown(false)}
                          >
                            My Profile
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            className="dropdown-item"
                            to="/my-order"
                            onClick={() => setShowDropdown(false)}
                          >
                            My Orders
                          </NavLink>
                        </li>{" "}
                        {/* My Orders Link Add Kiya Hai */}
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </li>
                      </>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;