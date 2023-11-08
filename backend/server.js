const express = require("express");
const mongoose = require("mongoose");// used to connect the backend to the MongoDB external database 
const cors = require("cors"); //Cross Origin Resourse Sharing(cors) is used for interaction between the frontend and backend
const User = require("./models/userModel");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const orderRouter = require("./routes/orderRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const reviewRouter = require("./routes/reviewRoutes")

const app = express(); //Used for initializing the node-express app

app.use(cors()); //allows for interacting entirely between the backend and frontend
app.use (express.json()); //allows for the information from the frontend to be extracted to the backend

//get, post,put/change/edit,delete

app.get("/", (request,response) =>{
    response.send("This is the new node server");
});

///Routes Connection
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/categorys", categoryRouter);
app.use("/api/reviews", reviewRouter)


//Create a database connection
mongoose.connect("mongodb+srv://podb:decadev@cluster0.edawvld.mongodb.net/?retryWrites=true&w=majority")
.then(response => console.log("mongoDB connected"))
.catch(err => console.log (err));

//create a listener to detect to run the server 
app.listen(5000, () =>{
    console.log("Listening on port 5000");
});