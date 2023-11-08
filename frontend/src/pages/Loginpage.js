import { useState } from "react";
import validator from "validator";
//import axios from "axios";
import http from "../http";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export default function Loginpage() {

 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [error, setError] = useState("");
 const navigate = useNavigate();

 async function submitHandler(e){
  e.preventDefault();
    // check for valid user email
    if(!validator.isEmail(email)) {
      setError("email format is invalid")
      return;
    }
    // send the form information to the backend server
    const {data} = await http.post("/users/login", { email, password });
    if(data.error) {
      setError(data.error);
      return;
    }

    if(data.success) {
      Swal.fire("Done", data.user.username + ", welcome", "success");
      localStorage.setItem("userInfo", JSON.stringify(data.user));
      navigate("/");
      window.location.reload();
    }

 
 }

  return <>
    <h1 className="text-center text-white m-5">Login</h1>
    <form onSubmit={submitHandler} action="" style={{maxWidth : "450px", margin : "auto"}} className="form">
      {error &&  <div className="alert alert-danger p-2">{error}</div>}
      <input  onChange={e => setEmail(e.target.value)} value={email} type="text" className="form-control mb-3" placeholder="Email"/>
      <input   onChange={e => setPassword(e.target.value)} value={password}type="password" className="form-control mb-3" placeholder="Password"/>
      <button className="btn btn-info w-100">Login</button>
    </form>

    <p className="text-center text-white m-5">No account yet? <Link className="text-primary" to="/register">Sign up</Link></p>      

  </>
}