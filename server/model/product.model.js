const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
    materials: {
      type: [String],
      required: true,
    },
    sizes: {
      type: [String],
      default: ["S", "M", "L"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 1,
    },
    warranty: {
      type: String,
      default: "2-year warranty on all products",
    },
    shippingInfo: {
      type: String,
      default: "Free shipping on orders over $499",
    },
    returnPolicy: {
      type: String,
      default: "30-day return policy",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
