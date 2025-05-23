const express = require("express");
const { getFillteredProducts } = require("../../controllers/shop/products-controller");


const router = express.Router();

router.get("/get", getFillteredProducts);

module.exports = router;