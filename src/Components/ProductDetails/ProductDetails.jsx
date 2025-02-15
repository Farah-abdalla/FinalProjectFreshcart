import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';

export default function ProductDetails() {
    let {numberItems,setnumberItems} = useContext(CartContext)
   
  var settings = {
   
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:1000,
    dots:false
  };
  let { Addproduct  } = useContext(CartContext)
 const [loading, setloading] = useState(false)
  let {id,category}= useParams()
  const [product, setproduct] = useState(null)
  const [relatedproduct, setrelatedproduct] = useState([])
  const [currentrelatedid, setcurrentrelatedid] = useState(0)
 function getproduct(id){
 axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
 .then((res)=>{
  console.log(res.data.data)
  setproduct(res.data.data)
 })
 .catch((res)=>{
  
 })
 }

 function getRelatedProduct(){
  axios.get("https://ecommerce.routemisr.com/api/v1/products")
  .then((res)=>{
  console.log(res.data.data);
  setrelatedproduct(res.data.data.filter((product)=> product.category.name == category))
  })
  .catch((res)=>{
  
 })
 }
 useEffect(()=>{
  getproduct(id)
  getRelatedProduct()
 },[id,category])

 async function addProductcart(id){
  setcurrentrelatedid(id)
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
  return (
   <>
    {product != null?<div className='row items-center'>
      <div className='w-1/4'>
         {/* <img src={product.imageCover} alt="" /> */}
         <Slider {...settings}>
          {product.images.map((details)=> <div  key={product.id}>
          <img src={details}  alt="" className='w-full'/>
          </div>)}
         </Slider>
      </div>
      <div className='w-3/4 p-4'>
       <h3 className='text-2xl font-semibold capitalize text-left'>{product.title}</h3>
      <h4 className='text-gray-700 my-4 text-left'>{product.description}</h4>
      <h4 className='text-left text-emerald-600'>{product.category.name}</h4>
     
      <div className='flex justify-between p-3'>
  <span>{product.price}EGP</span>
  <span><i className='fa fa-star text-yellow-400'></i>{product.ratingsAverage}</span>

 </div>
  <button className='bg-emerald-700 rounded-lg p-2 text-white w-full' onClick={()=>{
    addProductcart(product.id)
  }}>{loading ?<i className='fas fa-spinner fa-spin '></i>:"Add To Cart" }</button>

      </div>
    </div>:null}
    
    <div className=' row'>
   {relatedproduct.length>0?relatedproduct.map((product)=>(
 <div className="w-1/6 p-3" key={product.id}>
  <Link to={`/productdetails/${product.id}/${product.category.name}`} >
  <img src={product.imageCover} alt="" className='w-full'/>
  </Link>
 
 <h2 className=' text-emerald-600'>{product.category.name}</h2>
 <h2 className='font-semibold mb-3'>{product.title.split(" ").slice(0,2).join(" ")}</h2>
 <div className='flex justify-between p-4'>
  <span>{product.price}EGP</span>
  <span><i className='fa fa-star text-yellow-400'></i>{product.ratingsAverage}</span>

 </div>
  <button className='bg-emerald-700 rounded-lg p-2 text-white w-full' onClick={()=>{
    addProductcart(product.id)
  }}> {loading&& currentrelatedid == product.id ?<i className='fas fa-spinner fa-spin '></i>:"Add To Cart" }</button>

  </div>
  ) ):<span className="loader "></span>}
   </div>
    
    </>

    
  )
}
