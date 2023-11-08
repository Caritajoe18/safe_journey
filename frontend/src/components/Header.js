import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Calculator.css";


export default function Header() {
  const [userInfo, setUserInfo] = useState(null);
  const [text, setText] = useState("")
  const [show, setShow]= useState(false)
  const navigate = useNavigate();

  useEffect(()=>{
    setUserInfo(JSON.parse(localStorage.getItem("userInfo")))
    return ()=> {
      setUserInfo(null);
    }
  },[]);

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search/${text}`);

  }


  function closeSidebar() {
    setShow(false)

  }

  function logoutHandler(){
    localStorage.removeItem("userInfo")
  }
  return <>
  <nav className="navbar navbar-expand-lg navbar-dark ">
    <div className="container-fluid">
      <div>
        <span onClick= {() =>setShow(true)} style= {{cursor : "pointer"}}
        className="fa fa-bars fs-3 text-white m-2 me-3"></span>
      <a className="navbar-brand" href="/">SwiftRides</a>
      </div>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarScroll">
        <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" >
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/">Home</a>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cart">Cart </Link>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
             {userInfo ? userInfo.username : <i className="fa fa-user"></i> }
            </a>
            {!userInfo &&  <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown" >
              <li><Link className="dropdown-item" to="/login">Login</Link></li>
              <li><Link className="dropdown-item" to="/register">Register</Link></li>
            </ul> }

            {userInfo &&   <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown" >
       {userInfo && userInfo.isAdmin && <li><Link className="dropdown-item" to="/admin-products">Admin Products</Link></li> }    
       {userInfo && userInfo.isAdmin && <li><Link className="dropdown-item" to="/admin-orders">Admin Orders</Link></li> }  
              <li><Link className="dropdown-item" to="/category-page">Product Category</Link></li>
              <li><Link className="dropdown-item" to="/order-history">Order History</Link></li>      
              <li><hr className="dropdown-divider"/></li>
              <li><a onClick={logoutHandler} className="dropdown-item" href="/">Logout</a></li>
            </ul>}
           
          </li>
          
        </ul>
        <form onSubmit={submitHandler} className="d-flex">
          <input value= {text} onChange= {e => setText(e.target.value)}className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-dark" type="submit">Search</button>
        </form>
      </div>
    </div>

    {show && <Sidebar close={closeSidebar} />}
  </nav>




  </>;
}