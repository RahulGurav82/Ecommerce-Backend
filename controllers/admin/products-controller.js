const ProductModel = require("../../models/Product.model");
const { ImageUploadUtils } = require("../../helpers/cloudinary");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await ImageUploadUtils(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error Occured while upload image",
    });
  }
};

// add products
const addProducts = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const newProduct = new ProductModel({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "error while add product",
    });
  }
};
// fetch all products
const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await ProductModel.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "error while add product",
    });
  }
};

// edit a product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    let findProduct = await ProductModel.findById(id);
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price || findProduct.price;
    findProduct.salePrice = salePrice === '' ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;

    findProduct.save();

    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "error while add product",
    });
  }
};

// delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const findProduct = await ProductModel.findByIdAndDelete(id);
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      data: "Product delete successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "error while add product",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProducts,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
