import { useState } from "react";
import { Link } from "react-router-dom";
import Calculator from "../components/Calculator";

export default function CartPage() {
    let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const [showCalculator, setShowCalculator] = useState(false);

    let totalPrice = 0;
    for (let i = 0; i < cartItems.length; i++) {
        totalPrice += cartItems[i].price * cartItems[i].qty;
    }


    function deleteItemHandler(id) {
        cartItems = cartItems.filter(x => x._id !== id);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        window.location.reload();
    }

    function incrementHandler(id) {
        //Find the item in the cart
        let item = cartItems.find(x => x._id === id);
        //Increment the quantity if the item by 1
        item.qty += 1; // item.qty = item.qty + 1;
        //Replace the item with the new quantity item
        cartItems.map(x => x._id === id ? item : x);

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        window.location.reload();
    }

    function decrementHandler(id) {
        //Find the item in the cart
        let item = cartItems.find(x => x._id === id);
        if (item.qty === 1) return;
        //Increment the quantity if the item by 1
        item.qty -= 1; // item.qty = item.qty - 1;
        //Replace the item with the new quantity item
        cartItems.map(x => x._id === id ? item : x);

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        window.location.reload();
    }







    return <div style={{position : "relative"}}>
    <div className="d-flex align-item-end justify-content-end pe-2">
        < button className="btn btn-primary" onClick={()=>setShowCalculator(true)}>Open Calculator</button></div>
        {cartItems.length === 0 ? <h1 className="text-white ms-2">
            No Item In Cart 
            </h1> : <div className="cart">

            <table className="table cart-items">
                <tr><th>Image</th> <th>Title</th> <th>Price</th> <th>Quantity</th> </tr>
                {cartItems.map(item => {
                    return <tr key={item._id}>
                        <td>
                            <i onClick={() => deleteItemHandler(item._id)} style={{ cursor: "pointer", fontSize: "1.8rem" }} className="fa fa-trash-alt text-danger"></i>
                            <img src={item.image} alt="" /></td>
                        <td>{item.title}</td>
                        <td>{item.price && item.price.toLocaleString()}</td>
                        <td className="cart-quantity">
                            <button onClick={() => decrementHandler(item._id)} className="btn-sm btn-primary qty-minus"><i className="fa fa-minus"></i></button>
                            {item.qty}
                            <button onClick={() => incrementHandler(item._id)} className="btn-sm btn-primary qty-plus"><i className="fa fa-plus"></i></button>
                        </td>
                    </tr>
                })}
            </table>

            <div className="cart-details">
                <div className="cart-details-text text-align-center">Subtotal of {cartItems.length} cart items</div>
                <div className="cart-details-price">${totalPrice && totalPrice.toLocaleString()}</div>
                <Link to={"/checkout"}>
                    <button className="btn btn-info w-100">Checkout</button>
                </Link>
            </div>

        </div>}
    
    {showCalculator && <Calculator close={() => setShowCalculator(false)}/>}



    </div>
}