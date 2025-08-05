
const Order = require("../model/order.model");
const Product = require("../model/product.model");
const Cart = require("../model/cart.model");


exports.createOrder = async (req, res) => {
  try {
    const { userId, products, shippingInfo, totalAmount } = req.body;

    // Step 1: Check if products are passed
    if (!products || products.length === 0) {
      return res.status(400).json({ success: false, message: "Products missing" });
    }

    // Step 2: Reduce product stock
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ success: false, message: `Not enough stock for ${product.name}` });
      }

      product.stock -= item.quantity;
      await product.save();
    }

    // Step 3: Create order
    const newOrder = new Order({
      userId,
      products,
      shippingInfo,
      totalAmount,
      paymentStatus: "pending", // You can change to "paid" after payment integration
    });

    await newOrder.save();

    // Step 4: Empty user's cart
    await Cart.findOneAndDelete({ userId });

    // Step 5: Return success response
    res.status(201).json({ success: true, order: newOrder, message: "Order placed successfully" });

  } catch (error) {
    console.error("Order Save Error:", error);
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
};


exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId }).populate("products.productId");
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};


// ✅ Update product status in a specific order
exports.updateProductStatus = async (req, res) => {
  try {
    const { orderId, productId, status } = req.body;

    if (!orderId || !productId || !status) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const productToUpdate = order.products.find(
      (p) => p.productId.toString() === productId
    );

    if (!productToUpdate) {
      return res.status(404).json({ success: false, message: "Product not found in order" });
    }

    productToUpdate.status = status;

    await order.save();

    res.status(200).json({ success: true, message: "Status updated", order });
  } catch (err) {
    console.error("Status Update Error:", err);
    res.status(500).json({ success: false, message: "Failed to update status" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email") // User details (optional)
      .populate("products.productId");   // Product details

    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error("Fetch All Orders Error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};
