const express = require("express");
const router = express.Router();

const { addFeatureImage, getFeatureImage } = require("../../controllers/common/features-controller");
 
router.get("/get", getFeatureImage);
router.post("/add", addFeatureImage);

module.exports = router;