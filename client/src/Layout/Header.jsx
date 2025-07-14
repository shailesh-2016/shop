import React, { useEffect, useRef, useState } from "react";
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
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  // ✅ Close dropdown on outside click
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
      {/* 🔼 Top Navbar */}
      <div className="navbar-upper">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Free shipping on all orders above ₹499
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
            >
              <Menu size={24} color="black" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    +91 83000 83000
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    kukujewel@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      {/* 🔽 Main Navbar */}
      <div className="navbar-lower shadow-sm bg-white">
        <nav className="navbar navbar-expand-lg container">
          <NavLink to="/" className="navbar-brand">
            <img src={logo} alt="Logo" height={60} width={160} />
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
          >
            <Menu size={24} color="black" />
          </button>

          <div className="collapse navbar-collapse justify-content-between" id="mainNavbar">
            {/* Navigation Links */}
            <ul className="navbar-nav gap-4 mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link text-dark" to="/home">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-dark" to="/products">All Product</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-dark" to="/category">Category</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-dark" to="/about">About Us</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-dark" to="/contact">Contact</NavLink>
              </li>
            </ul>

            {/* Right Icons */}
            <div className="d-flex align-items-center gap-3">
              {/* 🔍 Search */}
              <div className="icon-wrapper" aria-label="Search">
                <Search size={20} color="#333" />
              </div>

              {/* 🛒 Cart */}
              <div className="position-relative">
                <NavLink to="/cart" className="icon-wrapper" aria-label="Cart">
                  <ShoppingCart size={20} color="#333" />
                </NavLink>
                {cartCount > 0 && (
                  <span className="icon-badge">{cartCount}</span>
                )}
              </div>

              {/* ❤️ Wishlist */}
              <div className="position-relative">
                <NavLink to="/wish" className="icon-wrapper" aria-label="Wishlist">
                  <Heart size={20} color="#333" />
                </NavLink>
                {wishlistCount > 0 && (
                  <span className="icon-badge">{wishlistCount}</span>
                )}
              </div>

              {/* 👤 User */}
              <div className="dropdown position-relative" ref={dropdownRef}>
                <div
                  className="icon-wrapper"
                  onClick={toggleDropdown}
                  aria-label="User"
                >
                  <User size={20} color="#333" />
                </div>

                {showDropdown && (
                  <ul
                    className="dropdown-menu dropdown-menu-end show mt-2"
                    style={{ position: "absolute", right: 0, zIndex: 999 }}
                  >
                    {!isAuthenticated ? (
                      <>
                        <li><NavLink className="dropdown-item" to="/login">Login</NavLink></li>
                        <li><NavLink className="dropdown-item" to="/signup">Signup</NavLink></li>
                      </>
                    ) : (
                      <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
