import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../http";
import Swal from "sweetalert2";

export default function OrderDetailsPage() {
  
  const [order, setOrder] = useState("");
  const [loadingOrder, setLoadingOrder]= useState(true);
  const [error, setError] = useState("");
  const {id} = useParams();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  
  async function updateStatus(status) {
    const {data} = await http.put(`/orders/${id}`, {status});
    if (data.error){
      Swal.fire("Error", data.error, "error");
      return;
    }
    if(data.success){
      Swal.fire("Done", "Order Updated Successfully", "success");
      getOrder();
    }
  }
  
  async function getOrder (){
    const {data} = await http.get(`/orders/${id}`);
    console.log(data);
    if(data.error){
      setError(data.error);
      setLoadingOrder(false);
      return;
    }
    setOrder(data);
    setLoadingOrder(false);
  }
  
    useEffect (() =>{
      getOrder();
    },[])


  return <>  {loadingOrder ? <div style={{fontSize: "1.6rem", marginLeft: "1rem", color:"white"}}>Loading . . .</div> : 
  error ? <div className="alert alert-danger">{error}</div> : 
  <div className="order-details">
      <div className="order-details-info">
          <div className="order-details-items">
              <h2>Order Items</h2>
              <table className="table w-100">
                <tr>
                  <th>PRODUCT IMAGE</th> <th>PRODUCT(S)</th> <th>QUANTITY</th> <th> COST(₦)</th> <th>PRICE</th>
                </tr>
              {order.orderItems.map ((item) => {
          return  <tr>
            <td><img style={{ height: "5rem", width: "5rem" }} src={item.image} alt="" /></td>
            <td>{item.title}</td>
            <td>{item.qty.toLocaleString()}</td> 
            <td>${item.price.toLocaleString()}</td>
            <td>${(item.qty * item.price).toLocaleString()}</td>
            </tr>
              })}
                  
                  <tr><td></td> <td><b>TOTAL = {order.totalPrice}</b></td></tr>
              </table>
          </div>
          <div className="order-details-delivery-info">
              <h2>Delivery Information </h2>
            <table className="table w-100">
              <tr> <td>Full Name : {order.deliveryInfo.fullName}</td> </tr>
              <tr> <td>Email : {order.user.email}</td></tr>
              <tr><td>Username : {order.user.username}</td> </tr>
              <tr><td>Address : {order.deliveryInfo.address}</td></tr>
              <tr><td>City : {order.deliveryInfo.city}</td></tr>
              <tr><td>Phone Number : {order.deliveryInfo.phoneNumber}</td></tr>
            </table>
          </div>
      </div>
      <div className="order-details-actions">
        <form action="" className="form">
          <h4>Total Price : {order.totalPrice}</h4>
          <h4>Status : {order.status}</h4>
          {userInfo.isAdmin &&  <>
                <label htmlFor="">Change Status</label>
                <select name="" onChange={e => updateStatus(e.target.value)} className="form-control" id="">
                    <option value="Pending">Pending</option>
                    <option value="Processed">Processed</option>
                    <option value="Enroute">Enroute</option>
                    <option value="Delivered">Delivered</option>
                </select>
                </>
            }  

         
        </form>
      </div>
  </div>
}
  </>
}