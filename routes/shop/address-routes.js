
const express = require('express');

const router = express.Router();

const { addAddress, fetchAllAddress, updateAddress, deleteAddress} = require("../../controllers/shop/address-controller");

router.post("/add", addAddress);
router.get("/get/:userId", fetchAllAddress);
router.put("/update/:userId/:addressId", updateAddress);
router.delete("/:userId/:addressId", deleteAddress);

module.exports = router;