import { useEffect } from "react";
import { useState } from "react"
import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import http from "../http";


export default function Homepage() {

    const [products, setProducts] = useState([]);
    const cartItems = JSON.parse( localStorage.getItem("cartItems")  || "[]"  );


    async function getProducts() {
        const { data } = await http.get("/products");
        setProducts(data);
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
    


    }, [])
    return <>
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
            <div className="carousel-item active">
                    <img
                        src="https://www.motoringresearch.com/wp-content/uploads/2021/03/Best-luxury-cars-1920x1080.jpg"
                        className="d-block w-100" alt="..." />
                    <p>Luxurious & Exotic</p>
                </div>
                <div className="carousel-item">
                    <img
                        src="https://dealeraccelerate-all.s3.amazonaws.com/rkm/marketing_assets/1294/American-Muscle-Car-HD-images-8-AMB-660x330.jpg"
                        className="d-block w-100" alt="..." />
                    <p>Classic & Collectibles</p>
                </div>
                <div className="carousel-item">
                    <img
                        src="https://mcn-images.bauersecure.com/PageFiles/688621/1440x960/ducati-monster-01.jpg"
                        className="d-block w-100" alt="..." />
                    <p>Super Bikes</p>
                </div>
                <div className="carousel-item">
                    <img
                        src="https://s1.cdn.autoevolution.com/images/news/gallery/tesla-roadster-20-gets-rendered-in-gold-for-a-sheik-s-pleasure_7.jpg"
                        className="d-block w-100" alt="..." />
                    <p>Electric Rides</p>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>



        <center className="w">
            <h1>OUR SERVICES</h1>
        </center>
        <div className="services">
            <div className="service">
                <i className="fa fa-shopping-cart"></i>
                <h3>COMFORT </h3>
                <p>Enjoy luxury in style...<br /> Exotic Cars from the comfort of your home<br />
                    All, at the click of a buton</p>
            </div>
            <div className="service">
                <i className="fa fa-credit-card"></i>
                <h3>Payment Methods</h3>
                <p>Credit card <br /> Debit card <br /> Bank Trasnfer</p>
            </div>
            <div className="service">
                <i className="fa fa-truck"></i>
                <h3>Quick delivery</h3>
                <p>Drive off from the lot, or we deliver to you<br />All we need is an address <br /> Delivery in 24 hours guaranteed</p>
            </div>

        </div>
        {/* <!-- services ends --> */}

        {/* <!-- grid starts here --> */}
        <center className="w">
            <h1 className="m-5">INVENTORY</h1>
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