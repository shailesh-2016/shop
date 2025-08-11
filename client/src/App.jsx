import React, { useEffect, useState, Suspense, lazy } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import ScrollToTop from "./components/Scroll";
import Loader from "./components/Loader";
import { Toaster } from "react-hot-toast";

// ✅ Lazy Load Pages
const ProductPage = lazy(() => import("./Pages/AllProducts"));
const CategoryGrid = lazy(() => import("./Pages/AllCategories"));
const AboutUs = lazy(() => import("./Pages/About"));
const Home = lazy(() => import("./Pages/Home"));
const ContactUs = lazy(() => import("./Pages/Contact"));
const SignupForm = lazy(() => import("./Pages/Signup"));
const LoginPage = lazy(() => import("./Pages/Login"));
const ProductDetails = lazy(() => import("./Pages/ProductDetails"));
const CartPage = lazy(() => import("./Pages/Cart"));
const Wishlist = lazy(() => import("./Pages/WishList"));
const CategoryProducts = lazy(() => import("./Pages/CategoryProducts"));
const CheckoutPage = lazy(() => import("./components/Checkout"));
const OrderSuccessPage = lazy(() => import("./components/OrderPage"));

const AppContent = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/signup" || location.pathname === "/login";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />

      {loading && <Loader />}
      {!hideHeaderFooter && <Header />}

      {/* ✅ Suspense to handle lazy loading fallback */}
      <Suspense fallback={<Loader />}>
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
          <Route path="/my-order" element={<OrderSuccessPage />} />
        </Routes>
      </Suspense>

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
