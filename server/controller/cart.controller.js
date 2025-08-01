const Cart = require("../model/cart.model");
const Product = require("../model/product.model");

// ✅ Add to Cart
exports.addToCart = async (req, res) => {
  const { userId, productId, size, material, quantity } = req.body;

  try {
    // ✅ Validate product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    let cartItem = await Cart.findOne({ userId, productId, size, material });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        userId,
        productId,
        size,
        material,
        quantity,
      });
    }

    const populatedCartItem = await Cart.findById(cartItem._id)
      .populate("productId", "product_name product_images price discount_price");

    res.status(201).json({
      success: true,
      message: "Item added to cart successfully",
      cartItem: populatedCartItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add item to cart",
      error: error.message,
    });
  }
};

// ✅ Get Cart Items by User ID
exports.getCartItems = async (req, res) => {
  const { userId } = req.params;

  try {
    const cartItems = await Cart.find({ userId })
      .populate("productId", "product_name product_images price discount_price");

    res.json({
      success: true,
      cartItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart items",
      error: error.message,
    });
  }
};

// ✅ Remove Cart Item by Cart ID
exports.removeFromCart = async (req, res) => {
  const { cartItemId } = req.params;
  try {
    await Cart.findByIdAndDelete(cartItemId);
    res.json({ success: true, cartItemId });
  } catch (error) {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
};
