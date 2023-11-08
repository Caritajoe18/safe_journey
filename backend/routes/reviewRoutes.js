const express = require("express");
const { isValidObjectId } = require("mongoose");
const Review = require("../models/reviewModel");

const reviewRouter = express.Router();

reviewRouter.post("/", async (req, res) => {
    console.log("Hit")
    const newReview = new Review(req.body);
    const review = await newReview.save();
    if (review) {
        res.send({ success: "Review Added Successfully" })
    } else {
        res.send({ error: "Error adding review" })
    }
});



reviewRouter.get("/:productId", async (req, res) => {
    const productId = req.params.productId;
    if(!isValidObjectId(productId)){
        res.send({error : "The ID of the product is invalid"});
        return;
       }
  const reviews = await Review.find({product : req.params.productId}).populate("user");
  
  console.log(reviews)
  res.send(reviews);
  

});

reviewRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    if(!isValidObjectId(id)){
        res.send({error : "The ID of the review is invalid"});
        return;
       }
    const deletedReview = await Review.findByIdAndDelete(id);
    if(deletedReview){
        res.send({success : "Review Deleted"})
    }else{
        res.send({error : "Error deleting review"})
    }
}
)








module.exports = reviewRouter;
