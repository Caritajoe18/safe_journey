import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../http";

export default function OrderDetailsPage() {
  const [product, setProduct] = useState("");
  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems]= useState(true);
  const [error, setError] = useState(null);
  const {id} = useParams();
  

  async function getOrder(id){
    const {data} = await http.get(`/orders/${id}`);
    if (data.error){
      setError(data.error);
      setOrderItems(false);
      return;
    }
    setOrder(data);
    setOrderItems(false);
    
  }
  
  useEffect(() =>{
    getOrder();
  },[id]);


  return <> <div style={{fontSize: "1.6rem", marginLeft: "1rem", color:"white"}}>Loading . . .</div> : 
  error ? <div className="alert alert-danger">{error}</div> : 
  <div className="order-details">
      <div className="order-details-info">
          <div className="order-details-items">
              <h2>Order Items</h2>
              <table className="table w-100">
              {orderItems.map(item => {
          return  <tr>
            <td><img style={{ height: "5rem", width: "5rem" }} src={product.image} alt="" /></td>
            <td>{product.title}</td>
            <td>{product.qty.toLocaleString()} x ${product.price.toLocaleString()} = ${(product.qty * product.price).toLocaleString()}</td>
            </tr>
              })}
                  
  

                  <tr><td></td> <td></td>  <td>Total = 6000000</td></tr>
              </table>
          </div>
          <div className="order-details-delivery-info">
              <h2>Delivery Information</h2>
            <table className="table w-100">
              <tr> <td>Full Name : John Wills</td> </tr>
              <tr> <td>Email : john@gmail.com</td></tr>
              <tr><td>Username : demonking</td> </tr>
              <tr><td>Address : aba</td></tr>
              <tr><td>City : Awka</td></tr>
              <tr><td>Phone Number : 8</td></tr>
            </table>
          </div>
      </div>
      <div className="order-details-actions">
        <form action="" className="form">
          <h4>Total Price : 6,000,000</h4>
          <h4>Status : Pending</h4>
          
             <label htmlFor="">Change Status</label>
          <select name="" className="form-control" id="">
              <option value="Pending">Pending</option>
              <option value="Enroute">Enroute</option>
              <option value="Delivered">Delivered</option>
          </select>
         
         
        </form>
      </div>
  </div>
  </>
}