import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import img2 from "../assets/image/img-2.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../redux/auth-slice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const { isLoading } = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    if (data.password !== data.repeatPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // ✅ remove repeatPassword before sending
    const { repeatPassword, ...formData } = data;

    dispatch(registerUser(formData))
      .unwrap()
      .then((res) => {
        toast.success("Signup successful! Please log in.");
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err?.message || "Signup failed!");
      });
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-md-6 d-flex flex-column justify-content-center px-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold">
              KUKU <span style={{ color: "#BA68C8" }}>JEWELS</span>
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-3">
            {/* Name */}
            <input
              type="text"
              className="form-control"
              placeholder="Full name"
              {...register("name", { required: "Full name is required" })}
            />
            {errors.name && <small className="text-danger">{errors.name.message}</small>}

            {/* Username */}
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && <small className="text-danger">{errors.username.message}</small>}

            {/* Email */}
            <input
              type="email"
              className="form-control"
              placeholder="Email Address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <small className="text-danger">{errors.email.message}</small>}

            {/* Password */}
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
            />
            {errors.password && <small className="text-danger">{errors.password.message}</small>}

            {/* Confirm Password */}
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control pe-5"
                placeholder="Repeat Password"
                {...register("repeatPassword", {
                  required: "Please repeat your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              <span
                className="position-absolute top-50 end-0 translate-middle-y pe-3"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </span>
            </div>
            {errors.repeatPassword && (
              <small className="text-danger">{errors.repeatPassword.message}</small>
            )}

            <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
              {isLoading ? "Signing up..." : "Sign up"}
            </button>

            <p className="text-center text-muted">
              Already have an account?{" "}
              <Link to="/login" className="text-decoration-none">
                Log in here
              </Link>
            </p>
          </form>
        </div>

        <div className="col-md-6 d-none d-md-block p-0">
          <img
            src={img2}
            alt="jewel"
            className="w-100 h-100"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Toast Message Container */}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
};

export default SignupForm;
