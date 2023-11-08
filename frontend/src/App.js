import './App.css';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Registerpage from './pages/Registerpage';
import Loginpage from './pages/Loginpage';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AdminProductPage from './pages/AdminProductPage';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';
import SingleProductPage from './pages/SingleProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminOrderPage from './pages/AdminOrderPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import SearchResultPage from './pages/SearchResultPage';
import ProductCategoryPage from './pages/ProductCategoryPage';
import AddCategorypage from './pages/AddCategoryPage';
import CategoryResultPage from './pages/CategoryResultPage';
import Footer from './components/Footer';


//CRUD - Create, Read, Update, Destroy
      //  Post , Get , Put , Delete
function App() {
  return  <BrowserRouter>
   <Header/>
  <Routes>
    < Route path="/" element={<Homepage/>}/>
    < Route path="/register" element={<Registerpage/>}/> 
    < Route path="/login" element={<Loginpage/>}/> 
    < Route path="/admin-products" element={<AdminProductPage/>}/>
    < Route path="/add-product" element={<AddProductPage/>}/>
    < Route path="/edit-product/:id" element={<EditProductPage/>}/>
    < Route path="/product/:id" element={<SingleProductPage/>}/>
    < Route path="/cart" element={<CartPage/>}/>
    < Route path="/checkout" element={<CheckoutPage/>}/>
    < Route path="/admin-orders" element={<AdminOrderPage/>}/>
    < Route path="/order/:id" element={<OrderDetailsPage/>}/>
    < Route path="/order-history" element={<OrderHistoryPage/>}/>
    < Route path= "/search/:text" element= {<SearchResultPage/>}/>
    < Route path= "/category-page" element= {<ProductCategoryPage/>}/>
    < Route path="/add-category" element={<AddCategorypage/>}/>
    < Route path= "/search-category/:id" element= {<CategoryResultPage/>}/>
   
   

    

 </Routes> 
 <Footer/>
 
    </BrowserRouter>
}

export default App;