const mongoose = require("mongoose");
const user = require("./userModel");


const productSchema = new mongoose.Schema({
    title: {type : String},
    price: {type : Number},
    numInStock: {type : Number},
    image: {type : String},
    images: {type: Array},
    category : {type : Object,  ref : "Category"},
    description: {type : String},
    ratings: {type : Number}

 })

 const Product = mongoose.model("Product", productSchema);
 module.exports = Product;