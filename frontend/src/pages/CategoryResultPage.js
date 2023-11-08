import { useEffect } from "react";
import { useState } from "react"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import http from "../http";


export default function CategoryResultPage() {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();


    const cartItems = JSON.parse( localStorage.getItem("cartItems")  || "[]"  );
    const {id } = useParams();



    async function getProducts() {
        const { data } = await http.get("/products");
        console.log(data);
        setProducts(data.filter(x => x.category === id));
    }

    async function addToCart(id){
         const existingProduct = cartItems.find(x => x._id === id);
         if(existingProduct){
            Swal.fire("Product Already Added To Cart");
            return;
         }


        const {data} = await http.get(`/products/${id}`);
        data.qty = 1;
        localStorage.setItem("cartItems", JSON.stringify([...cartItems, data]));
        Swal.fire("Product Has Been Added To Cart"); Navigate("/cart");        
    }

   

    useEffect(() => {
        getProducts();
    }, [id])


    return <>
       
        {/* <!-- services ends --> */}

        {/* <!-- grid starts here --> */}
        <center className="w">
            <h2 className="m-5">{products.length} result(s) found</h2>
        </center>
        <div className="container">
            <div className="row d-flex justify-content-center">

                {products.length > 0 && products.map(product => {
                    return <div className="col" key={product._id}>
                        <div className="card" style={{ width: "18rem" }}>
                         <Link to={`/product/${product._id}`}>
                          <img src={product.image} className="card-img-top" alt="..." />
                          </Link >  
                            <div className="card-body">
                             <Link to={`/product/${product._id}`}>
                             <h5 className="card-title">{product.title}</h5>
                             </Link>   
                                <p className="card-text">${product.price}</p>                   
                                <div onClick={() => addToCart(product._id)} className="btn btn-dark">Add To Cart</div>
                            </div>
                        </div>
                    </div>




                })}




            </div>
        </div>
    </>
}