import React, { useEffect } from 'react'
import  axios  from 'axios'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import { Wishlistcontext } from '../../Context/WishlistContext';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { CurrentContext } from '../../Context/CurrentContext';

export default function Products() {
  const [addedToCart, setAddedToCart] = useState(false);
  const [isLoading, setisLoading] = useState(false)
  const [ApiError, setApiError] = useState("")
   let {userLogin, setuserLogin} =useContext(CurrentContext)
   
  let { Addproduct  } = useContext(CartContext)
   let {  AddWishlist} = useContext(Wishlistcontext)
  const [loading, setloading] = useState(false)
  const [products, setproducts] = useState([])
  const [currentId, setcurrentId] = useState(0)
  const [wishlistId, setwishlistId] = useState(0)
    let {numberItems,setnumberItems} = useContext(CartContext)
  // let formik = useFormik({
  //     initialValues:{
  //       search:""
  //     },
     
  //     onSubmit:handelSearch,
  //   })
    // async function handelSearch(values){
  
    
    //   console.log(values);
    //  setisLoading(true)
    //  axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",values)
     
    //   .then((res)=>{
    //  setisLoading(false)
    //  console.log(res.data.message)
    //  if(res.data.message == "Reset code sent to your email"){
    //   localStorage.setItem("userToken",res.data.token)
    //   setuserLogin(res.data.token)
    //      navigate("/resetcode")
    //  }
    //   })
    //   .catch((res)=>{
    //      setisLoading(false)
    //      setApiError(res.response.data.message)
    //   })
    
    //  }
  async function addProductcart(id){
    setcurrentId(id)
    setloading(true)
     let response = await Addproduct(id)
     console.log(response.data.message);
    
     if(response.data.status == "success"){
      toast.success('Product added successfully to your cart');
      setloading(false)
      setnumberItems(numberItems+1)
     }
     else{
      toast.error('This is an error!');
      setloading(false)
     }
  
     
    }

     
    async function AddwishlistProduct(id){
      let response=   await AddWishlist(id)
      setwishlistId(id)
      console.log(response.data);
      if(response.data.status == "success"){
        toast.success('Product added successfully to your WishList');
        setAddedToCart(true)
      }
      else{
        toast.error('This is an error!');
      }
    }
  function getAllProduct(){
    setloading(true)
   axios.get("https://ecommerce.routemisr.com/api/v1/products")
    .then((res)=>{
      setloading(false)
      console.log(res.data.data);
      setproducts(res.data.data)
    })
    .catch((err)=>{
      setloading(false)
      console.log(err);
      
    })
   
    
  }


  useEffect(()=>{
    getAllProduct()
  },[])
  return (
   <>
   
{/*  
<form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
  <div className="relative  z-0 w-full mb-5 group">
      <input type="text" 
      name="name"
      values={formik.values.name}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
       id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="name"
       className="peer-focus:font-medium absolute left-0
        text-sm text-emerald-500
         duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
          peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto
           peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your name</label>
            {formik.errors.name&&formik.touched.name?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.name}</span> 
</div>:null}
  </div>
 </form> */}
   <div className=' row'>
   {products.length>0?products.map((product)=>(
 <div className="w-1/5 p-3 shadow shadow-gray-500/40 md:shadow-gray-500/40 m-7" key={product.id}>
  
  
  <Link to={`/subproductdetails/${product.id}`} >
  <img src={product.imageCover} alt="" className='w-full'/>
  </Link>
 
 <h2 className=' text-emerald-600'>{product.category.name}</h2>
 <h2 className='font-semibold mb-3'>{product.title.split(" ").slice(0,2).join(" ")}</h2>
 <div className='flex justify-between p-4'>
  <span>{product.price}EGP</span>
  <span><i className='fa fa-star text-yellow-400'></i>{product.ratingsAverage}</span>

 </div>
 <div className="flex justify-between items-center  ">
 <div>
 <button  onClick={()=>{
  AddwishlistProduct(product.id)
 }}> {addedToCart && wishlistId == product.id?<i className="fa-solid fa-heart text-2xl text-emerald-700 cursor-pointer "></i> : <i className="fa-regular fa-heart text-2xl text-emerald-700 cursor-pointer "></i>}</button>
 </div>
 <div>
 <button className='bg-emerald-700 rounded-lg p-2 text-white w-full'  onClick={()=>addProductcart(product.id)}>
 {loading && currentId == product.id? <i className='fas fa-spinner fa-spin '></i>:"Add To Cart" }</button>
 </div>

 </div>
  </div>
  ) ):<span className="loader "></span>}
   </div> 

   </>
  )
}
