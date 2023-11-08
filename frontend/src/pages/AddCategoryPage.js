import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import http from "../http";



export default function AddCategorypage(){
    const [title , setTitle] = useState("");
    const [error, setError] = useState("");
    
    const navigate = useNavigate();

    async function submitHandler(e) {
        e.preventDefault();
        //Check for empty fields
     if(!title) {
        setError("No Category Added!!!");
        return;
     }
     //Send a post request to the server with the Category information
     const {data} = await http.post("/categorys", {title});
      if(data.error){
        setError(data.error);
        return;
      }
      if (data.success){
       Swal.fire("Saved", "Category Saved Successfully", "success");
        navigate("/category-page")
      }
    }
  

    return <>
     <h1 className="text-center text-white m-5">Add Category</h1>
    <form onSubmit={submitHandler} action="" style={{ maxWidth: "750px", margin: "auto" }} className="form">
      <input onChange={e => setTitle(e.target.value)} value={title} type="text" className="py-2 form-control mb-3" placeholder="Category" />
      <button className="btn btn-info w-100">Submit</button>
    </form>
  </>
}