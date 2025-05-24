const express = require("express");
const { getFillteredProducts, getProductDetails } = require("../../controllers/shop/products-controller");

const router = express.Router();

router.get("/get", getFillteredProducts);
router.get("/get/:id", getProductDetails);

module.exports = router;