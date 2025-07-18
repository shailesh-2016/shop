import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react"; // Import Eye and EyeOff icons
import img2 from "../assets/image/img-2.jpg"; // Assuming this image is relevant for your signup page
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../redux/auth-slice"; // Your Redux slice for registration
import { toast, ToastContainer } from "react-toastify"; // For notifications
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS
import "./signup.css"

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset // Added reset to clear form after successful submission
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, error } = useSelector((state) => state.auth); // Accessing error state

  // Handle Redux error for global toast
  useEffect(() => {
    if (error) {
      toast.error(error); // Display Redux error
    }
  }, [error]);

  const onSubmit = (data) => {
    if (data.password !== data.repeatPassword) {
      toast.error("Passwords do not match. Please re-enter.");
      return;
    }

    // Remove repeatPassword before sending to API
    const { repeatPassword, ...formData } = data;

    dispatch(registerUser(formData))
      .unwrap()
      .then((res) => {
        toast.success("Signup successful! Please log in.");
        reset(); // Clear form fields
        navigate("/login");
      })
      .catch((err) => {
        // Error handling already done by useEffect for global error state
        // If you want specific error messages from catch, you can use:
        // toast.error(err?.message || "Signup failed!");
      });
  };

  return (
    <div className="signup-container"> {/* Main container for styling */}
      <div className="row g-0 h-100"> {/* g-0 to remove gutter */}
        {/* Left Section: Signup Form */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center signup-form-section p-4 p-md-5">
          <div className="signup-content-wrapper text-center w-100">
            <div className="mb-4">
              <h1 className="brand-logo fw-bold mb-0">
                KUKU <span className="brand-highlight">JEWELS</span>
              </h1>
              <p className="tagline text-muted">Exquisite jewelry for every occasion.</p>
            </div>

            <h3 className="form-title mb-4">Create Your Account</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="signup-form d-flex flex-column gap-3 mx-auto">
              {/* Name */}
              <div className="form-group">
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  placeholder="Full name"
                  aria-label="Full name"
                  {...register("name", { required: "Full name is required" })}
                />
                {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
              </div>

              {/* Username */}
              <div className="form-group">
                <input
                  type="text"
                  className={`form-control ${errors.username ? "is-invalid" : ""}`}
                  placeholder="Username"
                  aria-label="Username"
                  {...register("username", { required: "Username is required" })}
                />
                {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
              </div>

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
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                  })}
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

              {/* Confirm Password */}
              <div className="form-group password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control pe-5 ${errors.repeatPassword ? "is-invalid" : ""}`}
                  placeholder="Repeat Password"
                  aria-label="Repeat Password"
                  {...register("repeatPassword", {
                    required: "Please repeat your password",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </span>
                {errors.repeatPassword && (
                  <div className="invalid-feedback">{errors.repeatPassword.message}</div>
                )}
              </div>

              <button type="submit" className="btn btn-primary-custom w-100 mt-3" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Signing up...
                  </>
                ) : (
                  "Sign up"
                )}
              </button>

              <p className="text-center text-muted mt-3">
                Already have an account?{" "}
                <Link to="/login" className="login-link">
                  Log in here
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="col-md-6 d-none d-md-block p-0 signup-image-section">
          <img
            src={img2}
            alt="Beautiful KUKU JEWELS"
            className="w-100 h-100 object-fit-cover"
          />
        </div>
      </div>

      {/* Toast Message Container */}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
};

export default SignupForm;