const express = require ("express");
const Product = require("../models/productModel");
const productRouter = express.Router();
const {isValidObjectId} = require("mongoose");

//POST A PRODUCT
productRouter.post("/", async(req, res) => {

    //Create a new product
    const newProduct = new Product(req.body);
    const product = await newProduct.save();
    if (product){
        res.send ({success: "Product saved Successfully"})
    }else {
        res.send ({error : "Error saving product."})
    }
});

//Get All products
productRouter.get ("/", async  (req, res) => {
    const products = await Product.find();
    res.send(products);
})

//GET A SINGLE PRODUCT ROUTE
productRouter.get("/:id", async(req, res) =>{
    const id = req.params.id;
    if (!isValidObjectId(id)) {
        res.send ({error: "The ID of the product is invalid"});
        return;
    }
    
    const product = await Product.findById(id);
    if (!product){ 
        res.send ({error : "The product was not found"});
        return;
    }
    res.send(product);

});

//DELETE A SINGLE PRODUCT
productRouter.delete("/:id", async(req, res)=>{
    const id = req.params.id;
    if (!isValidObjectId(id)) {
        res.send ({error: "The ID of the product is invalid"});
        return;
    }
    const deleteProduct = await Product.findByIdAndDelete(id);

    if (deleteProduct) {
        res.send({success : "Product Deleted Successfully"})
    }else {
        res.send({success : "Error Deleting Product"})
    }
})

//UPDATE A SINGLE PRODUCT 
productRouter.put("/:id", async(req, res)=>{
    const id = req.params.id;
    if (!isValidObjectId(id)) {
        res.send ({error: "The ID of the product is invalid"});
        return;
    }
    //Get the product you wish to update
    const product = await Product.findById(id);

    //Check if the product exists
    if (!product){
        res.send ({error : "The product was not found"});
        return;
    }
    //Update the Product information
    product.title = req.body.title || product.title;
    product.price = req.body.price || product.price;
    product.image = req.body.image || product.image;
    product.category = req.body.category || product.category;
    product.description = req.body.description || product.description;

    //Save new product information
    const updatedProduct = await product.save ();
    if (updatedProduct){
        res.send({success : "Product updated Successfully"})
    }else {
        res.send({error : "Error updating product."})
    }

})




module.exports = productRouter;