// ✅ FIXED AND FINAL: product.model.js and addReview controller logic

const mongoose = require("mongoose");

// ✅ Review Schema - Properly define rating as Number
const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ✅ Product Schema
const productSchema = new mongoose.Schema(
  {
    product_name: String,
    product_description: String,
    product_images: [String],
    price: Number,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    reviews: [reviewSchema],
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
