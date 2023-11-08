import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "../../node_modules/react-router-dom/dist/index";
import http from "../http";

export default function CheckoutPage() {
    let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [city, setCity] = useState("");
    const navigate = useNavigate();

    async function submitHandler(e) {
        e.preventDefault();
        if (!fullName || !address || !phoneNumber || !city) {
            Swal.fire("Error", "Please Fill All Fields", "error");
            return;
        }
        localStorage.setItem("deliveryInfo", JSON.stringify({ fullName, address, phoneNumber, city }));
       const {data} = await http.post("/orders", {deliveryInfo : {fullName, address, city, phoneNumber}, orderItems : cartItems, user : userInfo._id })
        if(data.error){
            Swal.fire("Error", data.error , "error");
            return;
        }
        if(data.success){
            Swal.fire("Done", "Your Order Has Been Successfully Submitted", "success");
            //Empty the cart
            localStorage.setItem("cartItems" , "[]");
            navigate("/order-history");
        }
    }

    useEffect(()=>{
    !userInfo && navigate("/login");
    cartItems.length === 0 && navigate("/");
    },[]);

    return <>
        <div className="checkout pt-5">
            <div className="checkout-items">
                <h3>Cart Items</h3>
                <table>
                    {cartItems.map(item => {
                        return  <tr>
                        <td><img style={{ height: "5rem", width: "5rem" }} src={item.image} alt="" /></td>
                        <td>{item.title}</td>
                        <td>{item.qty.toLocaleString()} X {item.price.toLocaleString()} = {(item.qty * item.price).toLocaleString()}</td>
                    </tr>
                    })}
                   
                 <tr><td></td> <td></td>  <td>Total = {(cartItems.reduce((a,c) => a + c.qty * c.price, 0)).toLocaleString()}</td></tr>  
                </table>
            </div>
            <div className="checkout-delivery-info">
                <h3 className="text-center text-white mb-2">Delivery Details</h3>
                <form onSubmit={submitHandler} action="" style={{ maxWidth: "750px", margin: "auto" }} className="form">
                    <input onChange={e => setFullName(e.target.value)} value={fullName} type="text" className="py-2 form-control mb-3" placeholder="Full Name" />
                    <input onChange={e => setAddress(e.target.value)} value={address} type="text" className="py-2 form-control mb-3" placeholder="Address" />
                    <input onChange={e => setCity(e.target.value)} value={city} type="text" className="py-2 form-control mb-3" placeholder="City" />
                    <input onChange={e => setPhoneNumber(e.target.value)} value={phoneNumber} type="text" className="py-2 form-control mb-3" placeholder="Phone Number" />
                    <button className="btn btn-info w-100">Submit</button>
                </form>
            </div>
        </div>

    </>
}