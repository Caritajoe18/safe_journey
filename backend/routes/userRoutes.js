const express = require ("express");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const userRouter = express.Router();

//=============
//  USER ROUTES
// ==============
//Check and returns if a user already exists.
userRouter.post("/register", async (req,res) => {
    const existingEmail = await User.findOne({email : req.body.email}) //e.g anizobaadaobi@gmail.com
    if(existingEmail) {
        res.send({error  : "This email is already in use"});
        return;
    };
    //This create a new User
    const newUser = new User ({
        email : req.body.email,
        username : req.body.username,
        password : bcrypt.hashSync(req.body.password, 10)
    })
    //This save the user
    const user = await newUser.save();
    if (user){
        res.send({success : "User saved successfully"})
    }else {
        res.send({error : "Error saving new User"})
    }

})

userRouter.post("/login",  async (req, res) =>{
    //Check if the Email exists and return if it does not
    const existingUser = await User.findOne ({email: req.body.email});
    //Check if the password supplied matches with an existing user's password
    if (!existingUser) {
        res.send({ error : "There's no user with this email"});
        return;
    }
    //Check if the password supplied matches with the existing user's password
    if (!bcrypt.compareSync(req.body.password, existingUser.password)) {
        res.send({error : "The Password is incorrect"});
        return;
    }    
//Send a success message and the user information
res.send({ success : "Login Successful", user : existingUser});


})


module.exports = userRouter;