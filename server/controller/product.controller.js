const Product = require("../model/product.model");

// ✅ CREATE PRODUCT with multiple image upload (from Cloudinary)
exports.createProduct = async (req, res) => {
  try {
    const {
      product_name,
      product_description,
      price,
      discount_price,
      material,
      size,
      quantity,
      category,
    } = req.body;

    // Cloudinary URLs from multer-storage-cloudinary
    const product_images = req.files?.map((file) => file.path); // Array of image URLs

    if (!product_images || product_images.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No images uploaded" });
    }

    const product = new Product({
      product_name,
      product_description,
      price,
      discount_price,
      material,
      size: size ? size.split(",") : [], // split if sent as comma string
      quantity,
      category,
      product_images,
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "✅ Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({
      success: false,
      message: "❌ Failed to create product",
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

    // If new images uploaded
    if (req.files && req.files.length > 0) {
      updatedData.product_images = req.files.map((file) => file.path);
    }

    if (updatedData.size && typeof updatedData.size === "string") {
      updatedData.size = updatedData.size.split(",");
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "✅ Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Update product error:", error);
    res
      .status(500)
      .json({ success: false, message: "❌ Failed to update product" });
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
