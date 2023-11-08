const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
 email: {type : String},
 username: {type : String},
 password: {type : String},
 isAdmin : {type : Boolean, default : false} //this returns the code if an user is admin or not.
});

const User = mongoose.model("User", userSchema);
module.exports = User;
