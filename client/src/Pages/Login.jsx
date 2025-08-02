import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import img2 from "../assets/image/img-2.jpg";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, googleLoginUser } from "../redux/auth-slice";
import toast from "react-hot-toast";
import { auth, provider } from "../helper/firebase";
import { signInWithPopup } from "firebase/auth";
import "./login.css";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoading && isAuthenticated) navigate("/home");
  }, [isAuthenticated, isLoading, navigate]);

  const onSubmit = (data) => {
    
   dispatch(loginUser(data))
  .unwrap()
  .then((res) => {
    if (res?.success) {
      toast.success("✅ Login successful");
      navigate("/home");
    } else {
      toast.error(res?.message || "❌ Invalid credentials");
    }
  })
  .catch((err) => toast.error(err?.message || "❌ Login failed"));

  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      dispatch(googleLoginUser({ name: user.displayName, email: user.email, avatar: user.photoURL }))
        .unwrap()
        .then((res) => {
          if (res?.success) {
            toast.success("✅ Google login successful");
            navigate("/home");
          } else {
            toast.error(res?.message || "❌ Google login failed");
          }
        })
        .catch((err) => toast.error(err?.message || "❌ Google login failed"));
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        toast.info("Google login cancelled by user.");
      } else {
        toast.error("Google login failed. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="row g-0 h-100">
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center login-form-section p-4 p-md-5">
          <div className="login-content-wrapper text-center w-100">
            <div className="mb-4">
              <h1 className="brand-logo fw-bold mb-0">KUKU <span className="brand-highlight">JEWELS</span></h1>
              <p className="tagline text-muted">Unlock exclusive collections.</p>
            </div>

            <h3 className="form-title mb-4">Welcome Back!</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="login-form d-flex flex-column gap-3 mx-auto">
              <div className="form-group">
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Email Address"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" },
                  })}
                />
                {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
              </div>

              <div className="form-group password-field position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  placeholder="Password"
                  {...register("password", { required: "Password is required" })}
                />
                <span
                  className="password-toggle position-absolute top-50 end-0 translate-middle-y pe-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </span>
                {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
              </div>

              <div className="text-end mb-3">
                <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
              </div>

              <button type="submit" className="btn btn-primary-custom w-100 mb-3">Log In
              </button>

              <div className="or-separator my-3"><span>OR</span></div>

              <button
                type="button"
                className="btn btn-outline-secondary-custom google-btn w-100 d-flex align-items-center justify-content-center"
                onClick={handleGoogleLogin}
              >
                <img src="https://img.icons8.com/color/20/000000/google-logo.png" alt="Google" className="me-2" />
                Continue with Google
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary-custom facebook-btn w-100 d-flex align-items-center justify-content-center"
                disabled
              >
                <img src="https://img.icons8.com/color/20/000000/facebook-new.png" alt="Facebook" className="me-2" />
                Continue with Facebook
              </button>

              <div className="mt-4 text-center">
                <small className="no-account-text">
                  Don't have an account? <Link to="/signup" className="signup-link">Sign up here</Link>
                </small>
              </div>
            </form>
          </div>
        </div>

        <div className="col-md-6 d-none d-md-block p-0 login-image-section">
          <img src={img2} alt="KUKU JEWELS" className="w-100 h-100 object-fit-cover" />
        </div>
      </div>
    </div>
  );
}
