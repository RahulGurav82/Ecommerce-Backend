const express = require("express");
const { addProductReview, getProductReview } = require("../../controllers/shop/product-review-controller");

const router = express.Router();

router.get("/:productId", getProductReview);
router.post("/add", addProductReview);

module.exports = router;