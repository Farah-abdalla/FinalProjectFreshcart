import React, { useContext } from 'react'
import logo from "../../assets/freshcart-logo.svg"
import { Link } from 'react-router-dom'
import { CurrentContext } from '../../Context/CurrentContext'
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';


export default function Navbar() {
  let {userLogin, setuserLogin} =useContext(CurrentContext)
  let {numberItems,setnumberItems} = useContext(CartContext)
  let navigate = useNavigate()
  function signout(){
    localStorage.removeItem("userToken")
    setuserLogin(null)
    navigate("/login")

  }
  return (
  <>
  

<nav className="bg-slate-400  fixed top-0 right-0 left-0 p-5 z-50">
    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
       <div className='flex items-center '>
       <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-8" alt="Flowbite Logo" /> 
        </Link>
        {userLogin != null?<ul className='flex gap-5'>
              <li> <Link to="" className='text-gray-600 text-md '>Home</Link></li>
              <li><Link to="cart" className='text-gray-600 relative text-md'>Cart
              
              </Link></li>
              <li><Link to="product" className='text-gray-600 text-md'>Products</Link></li>
              <li><Link to="categories" className='text-gray-600 text-md'>Categories</Link></li>
              <li><Link to="brands" className='text-gray-600 text-md'>Brands</Link></li>
              <li> <Link to="wishlist" className='text-gray-600 text-md'>WishList</Link></li>
             
            </ul>:null}
    
       </div>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <ul className='flex gap-5'>
              <li><i className='fab fa-instagram text-xl'></i></li>
              <li><i className='fab fa-facebook text-xl'></i></li>
              <li><i className='fab fa-tiktok text-xl'></i></li>
              <li><i className='fab fa-twitter text-xl'></i></li>
              <li><i className='fab fa-linkedin text-xl'></i></li>
              <li><i className='fab fa-youtube text-xl'></i></li>
            </ul>
            {userLogin != null?<>
              <Link to="cart" className='text-gray-600 relative'> <i _ngcontent-wkj-c20="" className="fa-solid fa-cart-shopping text-2xl ">
              <div className='absolute top-[-13px] right-[-13px] size-6 bg-emerald-600 text-white rounded-md flex items-center justify-center'>{numberItems}</div></i> </Link>
           <span className=" text-emerald-600 cursor-pointer text-md " onClick={ signout}>Signout</span>
            </>:<>
            <Link to="login" className="text-md  text-emerald-600 ">Login</Link>
            <Link to="register" className="text-md  text-emerald-600">Register</Link>
            </>}
           
        </div>
    </div>
</nav> 


  


</>
  )
}
