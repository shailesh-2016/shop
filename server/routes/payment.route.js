const express = require("express");
const router = express.Router();
const {
  checkout,
  savePayment,
} = require("../controller/payment.controller");

router.post("/checkout", checkout);       // 🧾 Order banane wala route
router.post("/verify", savePayment); // 💳 Payment hone ke baad save

module.exports = router;
