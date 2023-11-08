import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "../../node_modules/react-router-dom/dist/index";
import http from "../http";


export default function AdminProductPage() {
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
   const navigate = useNavigate();
    async function getProducts() {
        const { data } = await http.get("/products");
        setProducts(data);
        setLoadingProducts(false);
    }

    async function deleteHandler(id) {
        if (!window.confirm("Are you sure you want to delete this product?")) {
            return;
        }
        const { data } = await http.delete(`/products/${id}`);  //=  /products/wfteFWGHJFGHFEGHJusftyqwf56FQ
        if (data.error) {
            Swal.fire(data.error);
            return
        }

        if (data.success) {
            Swal.fire("Done", "Product Deleted Successfully", "success");
            getProducts();
        }

    }

    useEffect(() => {
        getProducts();
        !userInfo.isAdmin && navigate("/")
    }, []);

    return <>
        <div className="d-flex justify-content-between p-3">
            <h3 className="text-white text-center text-uppercase">Admin Products</h3>
            <div>
                <Link className="btn btn-info " to="/add-product">Add Product</Link>
            </div>
        </div>
        <div className="admin-products">
            {loadingProducts ? 
            <div style={{fontSize : "1.6rem", marginLeft : "1rem"}}>Loading Products ...</div>:
                products.length === 0 ? <div className="alert alert-info">No Products Found</div> :
                    products.map((product, i) => {
                        return <div className="admin-product">
                            <img src={product.image} alt="" className="admin-product-image" />
                            <div className="admin-product-details">
                                <h3 className="admin-product-title">{product.title}</h3>
                                <p className="admin-product-description">{product.description}</p>
                            </div>
                            <div className="admin-product-price">₦{product.price} </div>
                            <div className="admin-product-actions">
                                <Link to={`/edit-product/${product._id}`}>  {/**  /edit-product/gheftwfwutyw6u3666  **/}
                                    <button className="btn btn-light"><i className="fa fa-edit"></i></button>
                                </Link>
                                <button onClick={() => deleteHandler(product._id)} className="btn btn-danger"><i className="fa fa-trash-alt"></i></button>
                            </div>
                        </div>
                    })
            }


        </div>
    </>
}