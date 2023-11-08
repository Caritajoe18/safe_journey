import { useState } from "react";
import { useEffect } from "react"
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import http from "../http"

export default function ProductCategoryPage() {
    const [categorys, setCategorys] = useState([]);

    async function getCategorys() {
        const { data } = await http.get("/categorys");
        setCategorys(data);
    }

    async function deleteHandler(id) {
        if (!window.confirm("Are you sure you want to delete this category?")) {
            return;
        }
        const { data } = await http.delete(`/categorys/${id}`);
        if (data.error) {
            Swal.fire(data.error);
            return;
        }

        if (data.success) {
            Swal.fire("Done", "Category Deleted Successfully", "success");
            getCategorys();
        }

    }


    useEffect(() => {
        getCategorys()
    }, [])
    return <>
    <div className="d-flex justify-content-between p-3">
            <h3 className="text-white text-center text-uppercase">Product Category</h3>
            <div>
                <Link className="btn btn-info " to="/add-category">Add Category</Link>
            </div>
        </div>
        {categorys.length === 0 ? <h2 className="text-white">No Category Saved Yet</h2> :
            <table className="table">
                <tr>
                    <th>SN.</th> <th></th> <th>Category</th> <th></th> <th></th> <th>Actions</th>
                </tr>
                {categorys.map((category, i) => {
                    return <tr>
                        <td>{i + 1}.</td>
                        <td></td>
                        <td>{category.title}</td>
                        <td></td>
                        <td></td>
                        <td>
                            <button onClick={() => deleteHandler(category._id)} className="btn btn-danger"><i className="fa fa-trash-alt"></i></button>
                        </td>
                    </tr>
                })}

            </table>

        }

    </>
}