const Product = require("../model/product.model");

// ✅ CREATE PRODUCT with multiple image upload (from Cloudinary)
// controllers/product.controller.js

exports.createOrder = async (req, res) => {
  try {
    const { cartItems, totalAmount, shippingInfo } = req.body;
    const userId = req.user._id;

    // 1. Reduce product quantity
    for (let item of cartItems) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.product_name}` });
      }

      product.quantity -= item.quantity;
      await product.save();
    }

    // 2. Create new order
    const newOrder = new Order({
      userId,
      items: cartItems,
      totalAmount,
      shippingInfo,
    });

    await newOrder.save();

    // 3. Remove purchased items from user's cart
    await Cart.deleteMany({ userId });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (err) {
    console.error("Create Order Error:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Fetch products error:", error);
    res
      .status(500)
      .json({ success: false, message: "❌ Failed to fetch products" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "❌ Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Single product error:", error);
    res
      .status(500)
      .json({ success: false, message: "❌ Failed to get product" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedData = { ...req.body };

    // ✅ Parse sizeStock if it's a string
    if (updatedData.sizeStock && typeof updatedData.sizeStock === 'string') {
      updatedData.sizeStock = JSON.parse(updatedData.sizeStock);
    }

    // ✅ Handle image updates
    if (req.files && req.files.length > 0) {
      updatedData.product_images = req.files.map((file) => file.path);
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      message: '✅ Product updated successfully',
      product,
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ success: false, message: '❌ Failed to update product' });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "✅ Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    res
      .status(500)
      .json({ success: false, message: "❌ Failed to delete product" });
  }
};

exports.addReview = async (req, res) => {
  try {
    const { userId, name, rating, comment } = req.body;
    const productId = req.params.id;

    console.log("Review Data:", { userId, name, rating, comment });
    console.log("TYPE of rating:", typeof rating);

    // ✅ Validate input
    if (!userId || !name || rating === undefined || !comment) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // 🔁 Force convert to number safely
    const parsedRating = parseFloat(rating);

    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be a number between 1 and 5",
      });
    }

    // ✅ Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // ✅ Add review
    const newReview = {
      userId,
      name,
      rating: parsedRating,
      comment,
      createdAt: new Date(),
    };

    if (!Array.isArray(product.reviews)) product.reviews = [];

    product.reviews.push(newReview);

    // ✅ Update product rating
    const total = product.reviews.reduce((acc, cur) => acc + cur.rating, 0);
    product.rating = parseFloat((total / product.reviews.length).toFixed(1));

    await product.save();

    res.status(200).json({
      success: true,
      message: "✅ Review added successfully",
      reviews: product.reviews,
    });
  } catch (err) {
    console.error("❌ Review Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};




// ✅ Get all reviews of a product
exports.getReviews = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select("reviews");
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, reviews: product.reviews });
  } catch (error) {
    console.error("Get reviews error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch reviews" });
  }
};

exports.getProductsByCategoryId = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.id });
    res.status(200).json(products);
  } catch (err) {
    console.error("Fetch category products error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};







