const paypal = require("../../helpers/paypal");
const Order = require("../../models/Order.model");
const Product = require("../../models/Product.model"); // Added missing import
const Cart = require("../../models/Cart.model"); // Added missing import

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      paymentMethod,
      totalAmount,
      cartId,
    } = req.body;

    // Validate cart items and stock first
    for (const item of cartItems) {
      const product = await Product.findById(item.productId);
      if (!product || product.totalStock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for product ${item.title}`,
        });
      }
    }

    // Create PayPal order
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [{
        amount: {
          currency_code: "USD",
          value: totalAmount.toFixed(2),
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: totalAmount.toFixed(2)
            }
          }
        },
        items: cartItems.map(item => ({
          name: item.title,
          sku: item.productId,
          unit_amount: {
            currency_code: "USD",
            value: item.price.toFixed(2)
          },
          quantity: item.quantity
        }))
      }],
      application_context: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel",
        shipping_preference: "NO_SHIPPING"
      }
    });

    const response = await paypal.client().execute(request);


    const approvalUrl = response.result.links.find(link => link.rel === 'approve')?.href;
    

    // Create order in database with "pending" status
    const newOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus: "pending",
      paymentMethod,
      paymentStatus: "pending",
      totalAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paypalOrderId: response.result.id, // Store PayPal order ID
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      approvalUrl,
      orderId: newOrder._id,
      paypalOrderId: response.result.id
    });

  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Error creating order",
      error: error.message
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { orderId, paypalOrderId } = req.body;

    // Capture PayPal payment
    const request = new paypal.orders.OrdersCaptureRequest(paypalOrderId);
    request.requestBody({});

    const captureResponse = await paypal.client().execute(request);
    
    if (captureResponse.result.status !== "COMPLETED") {
      return res.status(400).json({
        success: false,
        message: "Payment not completed"
      });
    }

    // Update order in database
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        orderStatus: "confirmed",
        paymentStatus: "paid",
        orderUpdateDate: new Date(),
        paymentId: captureResponse.result.id,
        payerId: captureResponse.result.payer.payer_id
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    // Update product stock
    for (const item of order.cartItems) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { totalStock: -item.quantity } },
        { new: true }
      );
    }

    // Delete cart
    if (order.cartId) {
      await Cart.findByIdAndDelete(order.cartId);
    }

    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order
    });

  } catch (error) {
    console.error("Error capturing payment:", error);
    res.status(500).json({
      success: false,
      message: "Error capturing payment",
      error: error.message
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const {userId} = req.params;
    const orders = await Order.find({userId});

    if(!orders.length) {
      return res.status(404).json({
        success : false,
        message : 'No Order Found'
      });
    }

    res.status(200).json({
      success : true,
      data : orders
    });
    
  } catch (error) {
    console.error("Error ", error);
    res.status(500).json({
      success: false,
      message: "Some Error Occured",
      error: error.message
    });
  }
}

const getOrderDetails = async (req, res) => {
  try {
    const {id} = req.params;
    const order = await Order.findById(id);

    if(!order) {
      return res.status(404).json({
        success : false,
        message : 'No Order Found'
      });
    }

    res.status(200).json({
      success : true,
      data : order
    });
    
  } catch (error) {
    console.error("Error ", error);
    res.status(500).json({
      success: false,
      message: "Some Error Occured",
      error: error.message
    });
  }
}



module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails
};