const Product = require("../../models/Product.model");
const Order = require("../../models/Order.model");
const ProductReview = require("../../models/Review.model");

const addProductReview = async (req, res) => {
  try {
    const { productId, userId, username, reviewMessage, reviewValue } =
      req.body;

    const order = await Order.findone({
      userId,
      "cartItems.productId": productId,
      orderStatus: "confirmed",
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You need to purchase product to review it.",
      });
    }

    const checkExistingReview = await ProductReview.findone({
      productId,
      userId,
    });

    if (checkExistingReview) {
      return res.status(400).json({
        success: false,
        message: "You Already reviewed this product!",
      });
    }

    const newReview = new ProductReview({
      productId,
      userId,
      username,
      reviewMessage,
      reviewValue,
    });

    await newReview.save();

    const reviews = await ProductReview.find({ productId });
    const totalReviewsLength = reviews.length;
    const averageReviews = reviews.reduce(
      (sum, reviewItem) => sum + reviewItem.reviewValue,
      0 / totalReviewsLength
    );

    await Product.findByIdAndUpdate(productId, { averageReviews });

    res.status(201).json({
      success: true,
      data: newReview,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const getProductReview = async (req, res) => {
  try {
    const {productId} = req.params;
    const reviews = await ProductReview.find({productId});
    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = { addProductReview, getProductReview };
