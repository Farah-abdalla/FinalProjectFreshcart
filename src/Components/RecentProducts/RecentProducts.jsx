import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Wishlistcontext } from '../../Context/WishlistContext';
export default function RecentProducts() {
  const [products, setproducts] = useState([])
  const [loading, setloading] = useState(false)
  const [currentId, setcurrentId] = useState(0)
  let { Addproduct } = useContext(CartContext)
  let {  AddWishlist} = useContext(Wishlistcontext)
  const [addedToCart, setAddedToCart] = useState(false);
 const [wishlistId, setwishlistId] = useState(0)
 let {numberItems,setnumberItems} = useContext(CartContext)
  function getProduct(){
    axios.get("https://ecommerce.routemisr.com/api/v1/products")
    .then((res)=>{
     console.log(res.data.data);
      setproducts(res.data.data);
    })
    .catch((res)=>{
      console.log(res);
    })
  
  }  

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
    setAddedToCart(true)
    console.log(response.data);
    if(response.data.status == "success"){
      toast.success('Product added successfully to your WishList');
    }
    else{
      toast.error('This is an error!');
    }
  }
  useEffect(()=>{
   getProduct()
   
  },[])
  return (
   <>
  
   <div className=' row'>
   {products.length>0?products.map((product)=>(
 <div className="w-1/5 p-3 shadow shadow-gray-500/40 md:shadow-gray-500/40 m-7" key={product.id}>
  <Link to={`productdetails/${product.id}/${product.category.name}`} >
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
 <button onClick={()=>{
  AddwishlistProduct(product.id)
 }}>{addedToCart && wishlistId == product.id?<i className="fa-solid fa-heart text-2xl text-emerald-700 cursor-pointer "></i> : <i className="fa-regular fa-heart text-2xl text-emerald-700 cursor-pointer "></i>}</button>
 </div>
 <div>
 <button className='bg-emerald-700 rounded-lg p-2 text-white w-full' onClick={()=>addProductcart(product.id)}>
 {loading && currentId == product.id? <i className='fas fa-spinner fa-spin '></i>:"Add To Cart" }</button>
 </div>

 </div>
  </div>
  ) ):<span className="loader "></span>}
   </div>

   </>
  )
}
