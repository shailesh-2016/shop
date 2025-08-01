import React, { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import ProductPage from "./Pages/AllProducts";
import CategoryGrid from "./Pages/AllCategories";
import AboutUs from "./Pages/About";
import Home from "./Pages/Home";
import ContactUs from "./Pages/Contact";
import SignupForm from "./Pages/Signup";
import LoginPage from "./Pages/Login";
import ProductDetails from "./Pages/ProductDetails";
import CartPage from "./Pages/Cart";
import Wishlist from "./Pages/WishList";
import CategoryProducts from "./Pages/CategoryProducts";
import ScrollToTop from "./components/Scroll";
import Loader from "./components/Loader";
import CheckoutPage from "./components/Checkout";
import OrderSuccessPage from "./components/OrderPage";
import { Toaster } from "react-hot-toast";

const AppContent = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/signup" || location.pathname === "/login";

  const [loading, setLoading] = useState(true);

  // 🔄 Loader on first load or route change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 700); // Adjust as needed
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />

      {loading && <Loader />}
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
        <Route path="/details/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wish" element={<Wishlist />} />
        <Route path="/categorypr/:id" element={<CategoryProducts />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        {/* <Route path="/payment" element={<PaymentPage />} /> */}
        <Route path="/my-order" element={<OrderSuccessPage />} />



      </Routes>

      {!hideHeaderFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <>
      <Router>
        <AppContent />
      </Router>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
