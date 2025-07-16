
// ✅ FRONTEND (LoginPage.jsx)
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import img2 from "../assets/image/img-2.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { googleLoginUser, loginUser } from "../redux/auth-slice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

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
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    dispatch(loginUser(data))
      .then((res) => {
        if (res?.payload?.success) {
          toast.success("Login successful ✅");
        } else {
          toast.error(res?.payload?.message || "Login failed");
        }
      })
      .catch(() => toast.error("Something went wrong"));
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
    ).then((res) => {
      if (res?.payload?.success) {
        toast.success("Google login successful ✅");
      } else {
        toast.error("Google login failed ❌");
      }
    });
  } catch (error) {
    console.error("Google login error:", error);
    toast.error("Google login failed ❌");
  }
};

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <div className="d-flex min-vh-100">
      <div className="col-md-6 d-flex flex-column justify-content-center align-items-center bg-white p-4">
        <h2 className="fw-bold text-center mb-4">
          KUKU <span style={{ color: "#BA68C8" }}>JEWELS</span>
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-75">
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email Address"
              className="form-control"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <small className="text-danger">{errors.email.message}</small>}
          </div>

          <div className="mb-3 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="form-control pe-5"
              {...register("password", { required: "Password is required" })}
            />
            <span
              className="position-absolute end-0 top-50 translate-middle-y pe-3"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </span>
            {errors.password && <small className="text-danger">{errors.password.message}</small>}
          </div>

          <div className="mb-3 text-end">
            <a href="#" className="text-decoration-none">
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">
            Log In
          </button>

          <div className="text-center mb-3">OR</div>

          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary w-50"
              onClick={handleGoogleLogin}
            >
              Continue with Google
            </button>
            <button className="btn btn-outline-secondary w-50" disabled>
              Facebook
            </button>
          </div>

          <div className="mt-4 text-center">
            <small>
              Can't log in? <a href="/signup">Sign up an account</a>
            </small>
          </div>
        </form>
      </div>

      <div className="col-md-6 d-none d-md-block p-0">
        <img src={img2} alt="jewel" className="w-100 h-100" style={{ objectFit: "cover" }} />
      </div>

      {/* <ToastContainer position="top-right" autoClose={3000} theme="colored" /> */}
    </div>
  );
}
