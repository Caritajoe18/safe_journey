const mongoose = require("mongoose");


const reviewSchema = new mongoose.Schema({
    text: {type : String},
    user: {type : mongoose.Types.ObjectId, ref: "User"},
    product: {type : String},

 }, {timestamps : true});

 const Review = mongoose.model("Review", reviewSchema);
 module.exports = Review;