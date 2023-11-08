import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../http";


export default function Sidebar({close}) {

    const [category, setCategory] = useState([]);

    async function getCategory() {
        const { data } = await http.get("/categorys");
        setCategory(data);
    }

    useEffect(() => {
        getCategory();
    }, []);

    return <div className="sidebar">
        <span onClick={close} >X</span>
        {category.map (category => {
            return <Link to={`/search-category/${category._id}`} className="sidebar-item"><div>{category.title}</div></Link>
        
        })}
    </div>
}