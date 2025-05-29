const express = require("express");
const router = express.Router();

const {createRazorpayOrder, verifyRazorpayPayment, getAllOrdersByUser, getOrderDetails} = require('../../controllers/shop/order-controller');

// Razorpay order creation
router.post('/razorpay', createRazorpayOrder);
// Razorpay payment verification
router.post('/verify-razorpay', verifyRazorpayPayment);

router.get("/list/:userId", getAllOrdersByUser);
router.get("/details/:id", getOrderDetails);

module.exports = router;