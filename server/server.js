require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoute = require("./routes/auth.route");
const categoryRoute = require("./routes/category.route");
const products = require("./routes/product.route");
const cart = require("./routes/cart.route");
const wishlist = require("./routes/wishlist.route");
const bannerRoute = require("./routes/banner.route");
const paymentRoute = require("./routes/payment.route");
const orderRoute = require("./routes/order.route");

const db = require("./config/db");
db();

const app = express();
const PORT = process.env.PORT || 3000;

app.set("trust proxy", 1); // ✅ Needed for secure cookies on Render

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://ecommerce-frontend-0qy2.onrender.com",
  "https://ecommerce-admin-1492.onrender.com",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "cache-control", // ✅ add this line
      "X-Requested-With",
    ],
  })
);

// ✅ Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/auth", authRoute);
app.use("/api/category", categoryRoute);
app.use("/api/products", products);
app.use("/api/cart", cart);
app.use("/api/wishlist", wishlist);
app.use("/api/banner", bannerRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/order", orderRoute);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => console.log(`🚀 Server running on PORT ${PORT}!`));
