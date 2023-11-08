const express = require ("express");
const Category = require("../models/categoryModel");
const categoryRouter = express.Router();
const {isValidObjectId} = require("mongoose");

//POST A CATEGORY
categoryRouter.post("/", async(req, res) => {

    //Create a new Category
    const newCategory = new Category(req.body);
    const category = await newCategory.save();
    if (category){
        res.send ({success: "New Category added Successfully"})
    }else {
        res.send ({error : "Error saving Category."})
    }
});

//Get All Categories
categoryRouter.get ("/", async  (req, res) => {
    const categorys = await Category.find();
    res.send(categorys);
})

//GET A SINGLE CATEGORY ROUTE
categoryRouter.get("/:id/products", async(req, res) =>{
    const id = req.params.id;
    if (!isValidObjectId(id)) {
        res.send ({error: "The ID of the category is invalid"});
        return;
    }
    
    const category = await Category.findById(id);
    if (!category){ 
        res.send ({error : "The category was not found"});
        return;
    }
    res.send(category);

});


//DELETE A SINGLE Category
categoryRouter.delete("/:id", async(req, res)=>{
    const id = req.params.id;
    if (!isValidObjectId(id)) {
        res.send ({error: "This category is invalid"});
        return;
    }
    const deleteCategory = await Category.findByIdAndDelete(id);

    if (deleteCategory) {
        res.send({success : "Category Deleted Successfully"})
    }else {
        res.send({success : "Error Deleting Product Category"})
    }
})
//UPDATE A SINGLE CATEGORY 
categoryRouter.put("/:id", async(req, res)=>{
    const id = req.params.id;
    if (!isValidObjectId(id)) {
        res.send ({error: "The ID of the category is invalid"});
        return;
    }
    //Get the category you wish to update
    const category = await Category.findById(id);
    //Check if the product exists
    if (!category){
        res.send ({error : "The category was not found"});
        return;
    }
    //Update the Category information
    product.category = req.body.categorys || product.category;

    //Save new category information
    const updatedCategory = await category.save ();
    if (updatedCategory){
        res.send({success : "Category updated Successfully"})
    }else {
        res.send({error : "Error updating Category."})
    }

})




module.exports = categoryRouter;