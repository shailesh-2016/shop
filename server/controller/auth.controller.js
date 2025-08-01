const User = require("../model/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const isProduction = process.env.NODE_ENV === "production";

// ✅ Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      email: user.email,
      username: user.username,
      name: user.name,
    },
    process.env.SECRET,
    { expiresIn: "7d" }
  );
};

// ✅ Cookie Options
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // ✅ false for localhost
  sameSite: "None", // ✅ required for cross-domain
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
};




// ✅ Register
exports.register = async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists!" });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    await User.create({ name, username, email, password: hashPassword });

    res.status(201).json({ success: true, message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Incorrect password" });

    const token = generateToken(user);

    // ✅ Set cookie
    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: { id: user._id, email: user.email, username: user.username, role: user.role },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Logout
exports.logoutUser = (req, res) => {
  res.clearCookie("token", { ...cookieOptions, maxAge: 0 }).json({
    success: true,
    message: "Logged out successfully!"
  });
};

// ✅ Middleware
exports.authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// ✅ Google Login
exports.googleLogin = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ name, email, avatar, password: "" });
    }

    const token = generateToken(user);
    res.cookie("token", token, cookieOptions);

    const userData = user.toObject();
    delete userData.password;

    res.status(200).json({
      success: true,
      message: "Google login successful",
      user: userData
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Google login failed" });
  }
};
