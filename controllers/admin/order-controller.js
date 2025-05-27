const OrderModel = require("../../models/Order.model");

const getAllOrdersOfAllUsers = async (req, res) => {
  try {
    const orders = await OrderModel.find({});

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

const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const {id} = req.params;
    const order = await OrderModel.findById(id);

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

const updateOrderStatus = async (req, res) => {
  try {
    const {id} = req.params;
    const {orderStatus} = req.body;
    const order = await OrderModel.findById(id);

    if(!order) {
      return res.status(404).json({
        success : false,
        message : 'No Order Found'
      });
    }

    await OrderModel.findByIDAndUpdate(id, {orderStatus});

    res.status(200).json({
      success : true,
      message : "Order Status Update Successfull."
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

module.exports = {getAllOrdersOfAllUsers, getOrderDetailsForAdmin, updateOrderStatus}