// models/Wishlist.js
const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  product_name: String,
  price: Number,
  product_images: [String],
  material: String,
  category: {
    cat_name: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
