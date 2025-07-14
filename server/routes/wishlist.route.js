const express = require("express");
const router = express.Router();
const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controller/wishlist.controller");

// POST
router.post("/", addToWishlist);

// GET
router.get("/", getWishlist);

// DELETE
router.delete("/:id", removeFromWishlist);

module.exports = router;
