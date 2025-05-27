const AddressModel = require("../../models/Address.model");

const addAddress = async (req, res) => {
  try {
    const { notes, phone, pincode, city, userId, address } = req.body;

    if (!userId || !notes || !phone || !pincode || !city || !address) {
      res.status(400).json({
        success: false,
        message: "Invalid data Provided",
      });
    }

    const newlyCreatedAddress = new AddressModel({
      userId,
      address,
      pincode,
      phone,
      notes,
      city,
    });

    await newlyCreatedAddress.save();
    res.status(200).json({
      success: true,
      data: newlyCreatedAddress,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error While Adding Address",
    });
  }
};
const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({
        success: false,
        message: "User ID Required",
      });
    }

    const AddressList = await AddressModel.find({ userId });
    res.status(200).json({
      success: true,
      data: AddressList,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error While Adding Address",
    });
  }
};

const updateAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and address id is required!",
      });
    }

    const address = await AddressModel.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formData,
      { new: true }
    );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      res.status(400).json({
        success: false,
        message: "User ID & addressId is Required",
      });
    }

    const address = await AddressModel.findOneAndDelete({
      _id: addressId,
      userId,
    });

    if (!address) {
      res.status(404).json({
        success: false,
        message: "address not found",
      });
    }

    res.status(200).json({
      success: true,
      message:  "address deleted successfully." ,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error While Adding Address",
    });
  }
};

module.exports = { addAddress, fetchAllAddress, updateAddress, deleteAddress };