const razorpay = require("../../helpers/razorpay"); // Add this line
const Order = require("../../models/Order.model");
const Product = require("../../models/Product.model");
const Cart = require("../../models/Cart.model");
const crypto = require('crypto');


const createRazorpayOrder = async (req, res) => {
  console.log("reach")
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      cartId,
    } = req.body;

    // First create order in your database
    const newlyCreatedOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
    });

    await newlyCreatedOrder.save();

    // Create Razorpay order
    const options = {
      amount: totalAmount * 100, // amount in smallest currency unit (paise for INR)
      currency: "INR",
      receipt: `order_${newlyCreatedOrder._id}`,
      payment_capture: 1 // auto capture payment
    };

    const razorpayOrder = await razorpay.orders.create(options);
    res.status(201).json({
      success: true,
      order: newlyCreatedOrder,
      razorpayOrderId: razorpayOrder.id,
      key: process.env.RAZORPAY_KEY_ID
    });
    
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, orderId } = req.body;
    // console.log(razorpay_payment_id,razorpay_order_id,razorpay_signature,orderId, "orderId")
    // Verify the payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    
    const expectedSignature = crypto
      .createHmac('sha256', "Hv5vxDo3eOE7MqgCrrS4I8dN")
      .update(body)
      .digest('hex');

    const isSignatureValid = expectedSignature === razorpay_signature;

    if (!isSignatureValid) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed - Invalid signature"
      });
    }

    // Update order in your database
    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Only update if payment hasn't been processed yet
    if (order.paymentStatus !== "paid") {
      order.paymentStatus = "paid";
      order.orderStatus = "confirmed";
      order.paymentId = razorpay_payment_id;

      // Update product stock
      for (let item of order.cartItems) {
        let product = await Product.findById(item.productId);

        if (!product) {
          return res.status(404).json({
            success: false,
            message: `Product not found: ${item.title}`,
          });
        }

        if (product.totalStock < item.quantity) {
          return res.status(400).json({
            success: false,
            message: `Not enough stock for product: ${product.title}`,
          });
        }

        product.totalStock -= item.quantity;
        await product.save();
      }

      // Delete cart
      if (order.cartId) {
        await Cart.findByIdAndDelete(order.cartId);
      }

      await order.save();
    }

    res.status(200).json({
      success: true,
      message: "Payment verified and order confirmed",
      data: order,
    });
  } catch (e) {
    console.error('Razorpay verification error:', e);
    res.status(500).json({
      success: false,
      message: "Error verifying payment",
      error: e.message
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = {
  createRazorpayOrder,
  verifyRazorpayPayment,
  getOrderDetails,
  getAllOrdersByUser
};