import React, { useEffect, useState } from "react";
import "../Layout/header.css";
import { Camera, Heart, Search, ShoppingCart, User } from "lucide-react";
import logo from "../assets/image/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/auth-slice";

const Header = () => {

const [showDropdown, setShowDropdown] = useState(false);
const dispatch=useDispatch()
const user = useSelector((state)=>state.auth)
// console.log(user)
 function handleLogout() {
    dispatch(logoutUser());
  }



const toggleDropdown = () => setShowDropdown(!showDropdown);
const closeDropdown = () => setShowDropdown(false);



  return (
    <>
      <div className="navbar-upper">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Free shipping on all orders above $499
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    +91 83000 83000
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    kukujewel@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <div className="navbar-lower shadow-sm bg-white">
  <div className="container d-flex align-items-center justify-content-between">
    <NavLink to="/" className="navbar-brand">
      <img src={logo} alt="Logo" height={60}  width={160}/>
    </NavLink>

    <ul className="nav gap-4">
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

    <div className="d-flex align-items-center gap-3 position-relative">
      <button className="btn btn-light p-2 rounded-circle">
        <Search size={18} color="#9d4be0" />
      </button>
      <button className="btn btn-light p-2 rounded-circle">
        <ShoppingCart size={18} color="#9d4be0" />
      </button>
      <button className="btn btn-light p-2 rounded-circle">
        <Heart size={18} color="#9d4be0" />
      </button>

      <div className="dropdown">
        <button
          className="btn btn-light p-2 rounded-circle"
          onClick={toggleDropdown}
        >
          <User size={18} color="#9d4be0" />
        </button>

        {showDropdown && (
          <ul
            className="dropdown-menu dropdown-menu-end show mt-2"
            style={{ position: "absolute", right: 0, zIndex: 999 }}
            onMouseLeave={closeDropdown}
          >
            {!user.isAuthenticated ? (
              <>
                <li>
                  <NavLink className="dropdown-item" to="/login">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/signup">
                    Signup
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default Header;
