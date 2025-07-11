import React from "react";
import Header from "./Layout/Header";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./Layout/Footer";
import ProductPage from "./Pages/AllProducts";
import CategoryGrid from "./Pages/AllCategories";
import AboutUs from "./Pages/About";
import Home from "./Pages/Home";
import ContactUs from "./Pages/Contact";
import SignupForm from "./Pages/Signup";
import LoginPage from "./Pages/Login";

const AppContent = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/signup" || location.pathname === "/login";

  return (
    <>
      {!hideHeaderFooter && <Header />}
      
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/category" element={<CategoryGrid />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>

      {!hideHeaderFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
