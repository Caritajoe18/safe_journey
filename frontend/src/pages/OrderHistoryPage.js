import { useState } from "react";
import { useEffect } from "react"
import { Link } from "react-router-dom";
import http from "../http"

export default function OrderHistoryPage() {
    const [orders, setOrders] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const id = userInfo._id;

    async function getMyOrders() {
        const { data } = await http.get(`/orders/order-history/${id}`);
        setOrders(data);
    }

    useEffect(() => {
        getMyOrders();
    }, [])
    return <>
        {orders.length === 0 ? <h2 className="text-white">No Orders Yet</h2> :
            <table className="table">
                <h1 className="text-center text-white m-5">ORDER HISTORY</h1>
                <tr>
                    <th>SN.</th>
                    <th>Email</th> 
                    <th>Price ($)</th> 
                    <th>Status</th> 
                    {userInfo.isAdmin &&  <><th>Actions</th></>}
                    
                </tr>
                {orders.map((order, i) => {
                    return <tr>
                        <td>{i + 1}.</td>
                        <td>{order.user && order.user.email}</td>
                        <td>{order.totalPrice && order.totalPrice.toLocaleString()}</td>
                        <td>{order.status}</td>
                        {userInfo.isAdmin &&  <>
                            <td>
                            <Link to={`/order/${order._id}`}>
                                <button className="btn btn-primary me-2"><i className="fas fa-eye"></i></button>
                            </Link>
                            <button className="btn btn-danger"><i className="fa fa-trash-alt"></i></button>
                        </td>
                        </>
                }
                        
                    </tr>
                })}

            </table>

        }

    </>
}