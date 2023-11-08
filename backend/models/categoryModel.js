const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    title: {type : String},
    product: {type : Array},
 })

 const Category = mongoose.model("Category", categorySchema);
 module.exports = Category;