import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import http from "../http";


export default function SingleProductpage(){
    const [product, setProduct] = useState("");
    const [loadingProduct, setLoadingProduct] = useState(true);
    const [error, setError] = useState("")
    const {id} = useParams();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const [text, setText] = useState("");
    const [reviews, setReviews] = useState([])
    const [rating, setRating] = useState([])


    async function getProduct() {
   
        const {data} = await http.get(`/products/${id}`);
        if (data.error) {
            setError(data.error);
            setLoadingProduct(false);
            return

        }
        setProduct(data);
        setLoadingProduct(false);
    }

    async function submitHandler() {
        const {data } = await http.post("/reviews", {text, user: userInfo._id, product: id});
        if (data.error) {
            Swal.fire("Error", data.error, "error");
            return;
        }
        if (data.success) {
            Swal.fire("Done", data.success, "success");
        }
        getReviews()
    }

    async function getReviews() {
        const {data } = await http.get(`/reviews/${id}`);
        setReviews(data)
     }

     async function deleteHandler(id){
      const {data} = await http.delete(`/reviews/${id}`);
      if(data.error){
         Swal.fire("Error", data.error, "error");
         return;
      }
      if(data.success){
         Swal.fire("Done", "Review Successfully Deleted", "success");
         getReviews();
      }
   }



    useEffect(() =>{
        getProduct();
        getReviews()

}, []);



     return <>
      {loadingProduct ?
         <div style={{ fontSize: "1.6rem", marginLeft: "1rem", color: "white" }}>Loading . . .</div> :
         error ? <div className="alert alert-danger">{error}</div> :
            <div>
               <div className="single-product">
                  <img src={product.image} className="single-product-image" />
                  <div className="single-product-details">
                     <div className="single-product-title">{product.title}</div>
                     <div className="single-product-price">${product.price}</div>
                     {/* {rating === 0 ? <span> <i className="far fa-star"></i> <i className="far fa-star"></i> <i className="far fa-star"></i> <i className="far fa-star"></i> <i className="far fa-star"></i>
                      </span> 
                     
                     : rating > 0.5 ? null : null; 
                     
                       } */}
                     <p className="single-product-description">{product.description}</p>
                  </div>
               </div>

               {/* Reviews Section */}

               {!userInfo ? <h3 className="text-white my-5" ><Link className="text-white text-bold fs-2" to={"/login"}>Login</Link> to add a review</h3> :

                  <div className="my-3 mx-5" >
                     <textarea onChange={e => setText(e.target.value)} name="" id="" cols="30" rows="4" className="form-control mb-3" placeholder="Enter Your Review"></textarea>
                     <button onClick={submitHandler}  className="form-control btn btn-info">Submit Review</button>
                     <h2 style={{ textShadow: "1px 1px 1px white" }} className="text-white my-4">Reviews</h2>
                     {reviews.length > 0 && reviews.map(review => {
                         return <div className="mb-3 rounded border border-light p-3">
                           <h5 className="text-white "> {review.user && review.user.username} <small><i className="fa fa-envelope ms-5"></i> {review.user.email}</small> </h5>
                           <p style={{whiteSpace : "pre"}} className="text-white">{review.text}</p>
                           <p className="text-white">{review.createdAt.substr(0, 10)}</p>
                           {userInfo._id == review.user._id ?
                              <p onClick={() => deleteHandler(review._id)} style={{ textAlign: "end", cursor: "pointer" }} className=""><i className="fa fa-trash-alt text-danger fs-4"></i></p> : null
                           }
                        </div>

                     })}

                  </div>
               }


               <div class="m-3" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", flexDirection: "row" }}>
                  {product.images.map(image => {
                     return <img src={image} style={{ width: "20%", height: "16rem" }} alt="..." />

                  })}
               </div>

            </div>

      }
          <p className="text-center text-white m-5"> Back to <Link className="text-primary" to="/">home</Link></p>      


   </>

}