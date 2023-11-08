
import { useState } from "react";
import validator from "validator";
import Swal from "sweetalert2";
import { Link, useNavigate }  from "react-router-dom";
import http from "../http";
//import axios from "axios";

export default function Registerpage(props){
 const [email, setEmail] = useState("");
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");
 const [error, setError] = useState("");
 const navigate = useNavigate();

async function submitHandler(e){
  e.preventDefault();
  // ==== Frontend form Validation
  // check for valid email
  if (!validator.isEmail(email)) {
    setError ("Email format is invalid");
    return;
  }
  // check for conventional username
  if(!validator.isAlphanumeric(username)) {
    setError("Username should contain only alphabets and numbers")
    return;
  }

  // check for password length
  if(password.length < 4) {
    setError("Password must be 4 characters long")
    return;
  }
  // check for password match
  if(password !== confirmPassword){
    setError("This password do not match")
    return;
  }

  // setError("")
  // alert("Registeration Sucessful")
  //=== Note: Backend validation checks the database for existing users======

  // send the form's information to the backend server
  const {data} = await http.post("/users/register", {email, username, password});
  if(data.error){
    setError(data.error)
  };
  if(data.success){
    Swal.fire("Done" , username + ". Welcome to the SwiftRide's store" , "success");
    navigate("/login");
  }

};

  return <>
  <h1 className="text-center text-white m-5">Register</h1>
  <form onSubmit={submitHandler} action="" style={{maxWidth : "450px", margin : "auto"}} className="form">
    {error &&  <div className="alert alert-danger p-2">{error}</div>}
    <input onChange={e => setEmail(e.target.value)} value={email} type="email" className="form-control mb-3" placeholder="Email"/>
    <input onChange={e => setUsername(e.target.value)} value={username} type="text" className="form-control mb-3" placeholder="Username"/>
    <input  onChange={e => setPassword(e.target.value)} value={password}type="password" className="form-control mb-3" placeholder="Password"/>
    <input  onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword}type="password" className="form-control mb-3" placeholder="Confirm password"/>
    <button className="btn btn-info w-100">Register</button>
  </form>
  <p className="text-center text-white m-5">Have an account? <Link className="text-primary" to="/login">Login</Link></p>      

  </>
}