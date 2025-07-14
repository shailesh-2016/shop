const Cart = require("../model/cart.model");

// ✅ Add to Cart
exports.addToCart = async (req, res) => {
  const { userId, productId, size, material, quantity } = req.body;

  try {
    // Check if item with same user, product, size, and material exists
    let cartItem = await Cart.findOne({
      userId,
      productId,
      size,
      material,
    });

    if (cartItem) {
      // If exists, update quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // Else, create new
      cartItem = await Cart.create({
        userId,
        productId,
        size,
        material,
        quantity,
      });
    }

    res.status(201).json({
      success: true,
      message: "Item added to cart successfully",
      cartItem,
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
    const cartItems = await Cart.find({ userId }).populate("productId");

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
