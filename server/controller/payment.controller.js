// controllers/payment.controller.js
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../model/payment.model");

// ✅ 1. Create Razorpay Order
exports.checkout = async (req, res) => {
 console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
console.log("RAZORPAY_SECRET:", process.env.RAZORPAY_SECRET);

  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100, // ₹500 => 50000 paise
      currency: "INR",
    };

    const order = await instance.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Checkout Error:", error);
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
};

// ✅ 2. Verify Signature + Save Payment to DB
exports.savePayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    userId,
    amount,
  } = req.body;

  try {
    // 🔐 Signature Verification
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Signature mismatch" });
    }

    // ✅ Save to DB
    const payment = new Payment({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      amount,
    });

    await payment.save();

    res.status(200).json({ success: true, payment });
  } catch (error) {
    console.error("Payment Save Error:", error);
    res.status(500).json({ success: false, message: "Payment verification failed" });
  }
};
