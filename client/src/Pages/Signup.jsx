import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import img2 from "../assets/image/img-2.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../redux/auth-slice";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { isLoading, isAuthenticated } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

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
            <input
              type="text"
              className="form-control"
              placeholder="Full name"
              {...register("name", { required: "Full name is required" })}
            />
            {errors.name && <small className="text-danger">{errors.name.message}</small>}

            <input
              type="text"
              className="form-control"
              placeholder="Username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && <small className="text-danger">{errors.username.message}</small>}

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

            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <small className="text-danger">{errors.password.message}</small>}

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

            <button type="submit" className="btn btn-primary w-100" >
              Sign up
            </button>

            <p className="text-center text-muted">
              Can't Sign up? <a href="/login">Log in an account</a>
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
    </div>
  );
};

export default SignupForm;
