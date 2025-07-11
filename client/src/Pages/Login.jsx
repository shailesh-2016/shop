import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import img2 from "../assets/image/img-2.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/auth-slice";

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
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <div className="d-flex min-vh-100">
      {/* Left - Form Section */}
      <div className="col-md-6 d-flex flex-column justify-content-center align-items-center bg-white p-4">
        <div className="text-center mb-4">
          <h2 className="fw-bold">
            KUKU <span style={{ color: "#BA68C8" }}>JEWELS</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-75">
          {/* Email Field */}
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email Address"
              className="form-control"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <small className="text-danger">{errors.email.message}</small>
            )}
          </div>

          {/* Password Field */}
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
            {errors.password && (
              <small className="text-danger">{errors.password.message}</small>
            )}
          </div>

          {/* Forgot Password */}
          <div className="mb-3 text-end">
            <a href="#" className="text-decoration-none">
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 mb-3"
            style={{ backgroundColor: "#9b51e0", border: "none" }}
            
          >
           Log In
          </button>

          <div className="text-center mb-3">OR</div>

          {/* Social Logins */}
          <div className="d-flex gap-2">
            <button type="button" className="btn btn-outline-secondary w-50">
              Google
            </button>
            <button type="button" className="btn btn-outline-secondary w-50">
              Facebook
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-4 text-center">
            <small>
              Can't log in?{" "}
              <a href="/signup" className="text-decoration-none">
                Sign up an account
              </a>
            </small>
          </div>
        </form>
      </div>

      {/* Right - Image Section */}
      <div className="col-md-6 d-none d-md-block p-0">
        <img
          src={img2}
          alt="jewel"
          className="w-100 h-100"
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
}
