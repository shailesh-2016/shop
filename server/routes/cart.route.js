// routes/cartRoutes.js
const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCartItems,
  removeFromCart,
} = require("../controller/cart.controller");

router.post("/", addToCart);
router.get("/:userId", getCartItems);
router.delete("/:cartItemId", removeFromCart); // ✅ simpler

module.exports = router;
