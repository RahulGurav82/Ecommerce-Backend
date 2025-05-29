const Feature = require("../../models/Features.model");

const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    const featuresImages = new Feature({
      image,
    });

    await featuresImages.save();

    res.status(200).json({
      success: true,
      data: featuresImages,
    });
  } catch (error) {
    console.error("Error ", error);
    res.status(500).json({
      success: false,
      message: "Some Error Occured",
      error: error.message,
    });
  }
};
const getFeatureImage = async (req, res) => {
  try {
    const images = await Feature.find({});
    // console.log(images)
    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (error) {
    console.error("Error ", error);
    res.status(500).json({
      success: false,
      message: "Some Error Occured",
      error: error.message,
    });
  }
};

module.exports = { addFeatureImage, getFeatureImage };
