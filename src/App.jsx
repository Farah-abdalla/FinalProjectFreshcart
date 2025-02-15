import 'flowbite';
 
import './App.css'
 import {createBrowserRouter, RouterProvider} from 'react-router-dom'
 import Layout from './Components/Layout/Layout';
 import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Brands from './Components/Brands/Brands';
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import CurrentContextProvider from './Context/CurrentContext';
import Notfound from './Components/Notfound/Notfound';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import  { Toaster } from 'react-hot-toast';
import WishList from './Components/WishList/WishList';
import WishlistcontextProvider from './Context/WishlistContext';
import SubProductDetails from './Components/SubProductDetails/SubProductDetails';

import SubCategories from './Components/SubCategories/SubCategories';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetCode from './Components/ResetCode/ResetCode';
import Checkout from './Components/Checkout/Checkout';
import AllOrders from './Components/AllOrders/AllOrders';
import CategoryDetails from './Components/CategoryDetails/CategoryDetails';


function App() {
  let x = createBrowserRouter([
    {path:"" , element: <Layout/>,
      children:[
        {index:true , element:<ProtectedRoute><Home/></ProtectedRoute>},
        {path:"navbar" , element:<ProtectedRoute><Navbar/></ProtectedRoute>},
        {path:"Footer" , element:<ProtectedRoute><Footer/></ProtectedRoute>},
        {path:"brands" , element:<ProtectedRoute><Brands/></ProtectedRoute>},
        {path:"wishlist" , element:<ProtectedRoute><WishList/></ProtectedRoute>},
        {path:"product" , element:<ProtectedRoute><Products/></ProtectedRoute>},
        {path:"checkout" , element:<ProtectedRoute><Checkout/></ProtectedRoute>},
        {path:"productdetails/:id/:category" , element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
        {path:"categorydetails/:id/:category" , element:<ProtectedRoute><CategoryDetails/></ProtectedRoute>},
        {path:"subproductdetails/:id" , element:<ProtectedRoute><SubProductDetails/></ProtectedRoute>},
        {path:"categories" , element:<ProtectedRoute><Categories/></ProtectedRoute>},
        {path:"allorders" , element:<ProtectedRoute><AllOrders/></ProtectedRoute>},
        {path:"cart" , element:<ProtectedRoute><Cart/></ProtectedRoute>},
        {path:"login" , element:<Login/>},
        {path:"resetcode" , element:<ResetCode/>},
        {path:"register" , element:<Register/>},
        {path:"forgetpassword" , element:<ForgetPassword/>},

        {path:"*" , element:<ProtectedRoute><Notfound/></ProtectedRoute>}
      ]
    }
  ])
  return (
    <>
     
<CurrentContextProvider>

 <CartContextProvider>
 <WishlistcontextProvider>
 <RouterProvider router={x}></RouterProvider>
 <Toaster />
 
 </WishlistcontextProvider>
 </CartContextProvider>

</CurrentContextProvider>

  
 
  
    </>
  )
}

export default App
