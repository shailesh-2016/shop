const express = require("express");
const router = express.Router();
const { createOrder,getUserOrders,updateProductStatus,getAllOrders } = require("../controller/order.controller");

router.post("/create", createOrder);
router.get("/all", getAllOrders);
router.get("/user/:userId", getUserOrders);
router.put("/update-status", updateProductStatus);



module.exports = router;
