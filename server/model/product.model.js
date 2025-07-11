// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  product_description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount_price: {
    type: Number,
  },
  product_images: {
    type: [String], // Multiple image URLs
    required: true,
  },
  material: {
    type: String, // Example: 18K Gold, 22K Gold
    required: true,
  },
  size: {
    type: [String], // Example: ["XS", "S", "M", "L", "XL"]
  },
  quantity: {
    type: Number,
    default: 1,
  },

  // 👇 Category Reference
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },

  // Extras
  reviews: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
