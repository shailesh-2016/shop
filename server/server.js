const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const authRoute = require("./routes/auth.route");
const categoryRoute = require("./routes/category.route");
const products = require("./routes/product.route");
const cart = require("./routes/cart.route");
const db = require("./config/db");
db();
const PORT = process.env.PORT || 3000;

///use

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://ecommerce-client-0jz9.onrender.com",
  "https://ecommerce-admin-1492.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // required when sending cookies/auth headers
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/category", categoryRoute);
app.use("/api/products", products);
app.use("/api/cart", cart);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`));
