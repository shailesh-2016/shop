// ✅ FRONTEND (LoginPage.jsx)
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import img2 from "../assets/image/img-2.jpg"; // Your background image
import { useNavigate, Link } from "react-router-dom"; // Import Link for proper navigation
import { useDispatch, useSelector } from "react-redux";
import { googleLoginUser, loginUser } from "../redux/auth-slice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css"
// ✅ Firebase
import { auth, provider } from "../helper/firebase";
import { signInWithPopup } from "firebase/auth";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const { isAuthenticated, isLoading, error } = useSelector((state) => state.auth); // Added error from Redux state

  // Handle Redux error for global toast
  useEffect(() => {
    if (error) {
      toast.error(error); // Display Redux error
    }
  }, [error]);

  const onSubmit = (data) => {
    dispatch(loginUser(data))
      .unwrap() // Use unwrap to handle fulfilled/rejected promises correctly
      .then((res) => {
        // Redux state will handle `isAuthenticated` update,
        // and the `useEffect` below will navigate.
        // We can still show a success toast immediately.
        toast.success("Login successful ✅");
      })
      .catch((err) => {
        // Error handling is largely done by `useEffect` listening to `state.auth.error`
        // But if you want a more specific toast for login failure from this `.catch`,
        // you can put it here, just be careful not to duplicate toasts.
        // toast.error(err?.message || "Login failed!");
        console.error("Login component error:", err); // Log for debugging
      });
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      dispatch(
        googleLoginUser({
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        })
      )
        .unwrap()
        .then((res) => {
          if (res?.success) { // Assuming success property is returned by your backend
            toast.success("Google login successful ✅");
          } else {
            // This toast might be redundant if Redux state error is also handled globally
            toast.error(res?.message || "Google login failed ❌");
          }
        })
        .catch((err) => {
          console.error("Google login dispatch error:", err);
          // This toast might be redundant if Redux state error is also handled globally
          toast.error(err?.message || "Google login failed ❌");
        });
    } catch (error) {
      console.error("Firebase Google login popup error:", error);
      toast.error("Google login failed. Please try again.");
    }
  };

  // Redirect after successful login
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/home"); // Redirect to home page
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <div className="login-container"> {/* Main container for styling */}
      <div className="row g-0 h-100"> {/* g-0 to remove gutter */}
        {/* Left Section: Login Form */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center login-form-section p-4 p-md-5">
          <div className="login-content-wrapper text-center w-100">
            <div className="mb-4">
              <h1 className="brand-logo fw-bold mb-0">
                KUKU <span className="brand-highlight">JEWELS</span>
              </h1>
              <p className="tagline text-muted">Unlock exclusive collections.</p>
            </div>

            <h3 className="form-title mb-4">Welcome Back!</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="login-form d-flex flex-column gap-3 mx-auto">
              {/* Email */}
              <div className="form-group">
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Email Address"
                  aria-label="Email Address"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, // More robust email regex
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
              </div>

              {/* Password */}
              <div className="form-group password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control pe-5 ${errors.password ? "is-invalid" : ""}`}
                  placeholder="Password"
                  aria-label="Password"
                  {...register("password", { required: "Password is required" })}
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </span>
                {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
              </div>

              <div className="text-end mb-3">
                <Link to="/forgot-password" className="forgot-password-link"> {/* Use Link component */}
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" className="btn btn-primary-custom w-100 mb-3" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Logging In...
                  </>
                ) : (
                  "Log In"
                )}
              </button>

              <div className="or-separator my-3">
                <span>OR</span>
              </div>

              <div className="social-login-buttons d-flex flex-column gap-3"> {/* Changed to flex-column for better stacking on mobile */}
                <button
                  type="button"
                  className="btn btn-outline-secondary-custom google-btn w-100 d-flex align-items-center justify-content-center"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                >
                  <img src="https://img.icons8.com/color/20/000000/google-logo.png" alt="Google logo" className="me-2" />
                  Continue with Google
                </button>
                <button
                  className="btn btn-outline-secondary-custom facebook-btn w-100 d-flex align-items-center justify-content-center"
                  disabled
                >
                  <img src="https://img.icons8.com/color/20/000000/facebook-new.png" alt="Facebook logo" className="me-2" />
                  Continue with Facebook
                </button>
              </div>

              <div className="mt-4 text-center">
                <small className="no-account-text">
                  Don't have an account?{" "}
                  <Link to="/signup" className="signup-link"> {/* Use Link component */}
                    Sign up here
                  </Link>
                </small>
              </div>
            </form>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="col-md-6 d-none d-md-block p-0 login-image-section">
          <img src={img2} alt="Beautiful KUKU JEWELS" className="w-100 h-100 object-fit-cover" />
        </div>
      </div>

      {/* Toast Message Container */}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
}