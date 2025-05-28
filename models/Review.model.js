const mongoose = require('mongoose');

const ProductReviewSchema = mongoose.Schema({
    productId : String,
    userId : String,
    username : String,
    reviewMessage : String,
    reviewValue : Number,
}, {timestamps : true});

module.exports = mongoose.model("ProductReview", ProductReviewSchema);