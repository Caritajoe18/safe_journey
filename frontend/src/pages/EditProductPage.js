import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import http from "../http";


export default function EditProductPage() {
    const [title , setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [category, setCategory] = useState([]);
    const [categorys, setCategorys] = useState([]);
    const {id} = useParams ();

async function getCategorys() {
    const { data } = await http.get("/categorys");
    setCategorys(data);
       
    }
    
    useEffect(() => {
        getCategorys();
    }, []);    

async function getProduct(){
    const {data} = await http.get(`/products/${id}`);
    setTitle(data.title);
    setPrice(data.price);
    setDescription(data.description);
    setCategory(data.category)
}    


async function submitHandler(e){
    e.preventDefault();
    const {data} = await http.put(`/products/${id}`, {title, price, category, description});
    if (data.error){
        setError(data.error)
        return;
    }
    if (data.success){
        Swal.fire("Done", "Product Updated Successfully", "success")
        navigate("/admin-products");
    }

}

useEffect (()=> {
getProduct();

}, [])

    return<>
    <h1 className="text-center text-white m-5">Edit Product</h1>
    <form onSubmit={submitHandler}action="" style={{maxWidth : "750px", margin : "auto"}} className="form">
      {error &&  <div className="alert alert-danger p-2">{error}</div>}
      <label htmlFor="" className="text-white mb-1">TITLE</label>
      <input onChange={e => setTitle(e.target.value)} value={title} type="text" className="py-2 form-control mb-3" placeholder="Title"/>
      <label htmlFor="" className="text-white mb-1">PRICE</label>
      <input onChange={e => setPrice(e.target.value)} value={price} type="number" className="py-2 form-control mb-3" placeholder="Price"/>
      <label htmlFor="" className="text-white mb-1">PRODUCT CATEGORY</label>
      <select onChange={(e) => setCategory(e.target.value)} value={category}  className="py-2 form-control mb-3" placeholder="Product Category"  id="">
        <option value="" selected>Select Category</option>
          {categorys.map(category => {
            return <option value={category._id}>{category.title}</option>
        })}
      </select>
      <label htmlFor="" className="text-white mb-1">DESCRIPTION</label>
      <input  onChange={e => setDescription(e.target.value)} value={description}type="text" className="py-2 form-control mb-3" placeholder="Description"/>
      <button className="btn btn-info w-100">Update Product</button>
    </form>
    
    </>

}