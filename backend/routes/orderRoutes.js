const express = require("express");
const { isValidObjectId } = require("mongoose");
const Order = require("../models/orderModel");


const orderRouter = express.Router();


orderRouter.post("/", async (req, res) => {
  let orderItems = req.body.orderItems;
  let totalPrice = orderItems.reduce((a, c) => a + c.price * c.qty, 0);

  //CREATING A NEW ORDER ON MONGODB
  const newOrder = new Order({
    user: req.body.user,
    orderItems: req.body.orderItems,
    deliveryInfo: req.body.deliveryInfo,
    totalPrice: totalPrice
  });

  const order = await newOrder.save();
  if (order) {
    res.send({ success: "Order saved Successfully" });
  } else {
    res.send({ error: "Error Saving Order" });
  }
});

//FINDING ALL ORDERS AND POPULATING THE ADMIN-ORDER-PAGE
orderRouter.get("/", async (req, res) => {
  const orders = await Order.find().populate("user");
  res.send(orders);
})
//DELETING A NEW ORDER FROM THE ADMIN-ORDER-PAGE
orderRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const deleteOrder = await Order.findByIdAndDelete(id);

  if (deleteOrder) {
    res.send({ success: "Order Deleted Successfully" })
  } else {
    res.send({ error: "Error Deleting Order" })
  }
})
//FINDING A SINGLE ORDER AND POPULATING INFORMATION ON THE ORDER-DETAIL-PAGE
orderRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!isValidObjectId(id)) {
    res.send({ error: "The ID of the order is invalid" });
    return;
  }
  const order = await Order.findById(id).populate("user");
  res.send(order);


});

//UPDATE A SINGLE ORDER STATUS 
orderRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  if (!isValidObjectId(id)) {
    res.send({ error: "The ID of the Order is invalid" });
    return;
  }
  //Get the Status you wish to update
  const order = await Order.findById(id);
  //Check if the product exists
  if (!order) {
    res.send({ error: "The Order was not found" });
    return;
  }
  order.status = req.body.status || order.status;

  const updatedOrder = await order.save();
  if (updatedOrder) {
    res.send({ success: "Order updated Successfully" });

  } else {
    res.send({ error: "Error updating Order." })
  }
});
//UPDATING THE ORDER HISTORY PAGE
orderRouter.get("/order-history/:id", async(req, res) => {
  const id = req.params.id;
  const orders = await Order.find({user : id}).populate("user");
  console.log(orders)
  res.send(orders);
})



module.exports = orderRouter;