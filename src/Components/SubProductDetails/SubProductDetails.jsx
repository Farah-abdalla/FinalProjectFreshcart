
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';

export default function SubProductDetails() {
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
  let {id,category}= useParams()
  const [product, setproduct] = useState(null)
  const [loading, setloading] = useState(false)
 function getproduct(id){
 axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
 .then((res)=>{
  console.log(res.data.data)
  setproduct(res.data.data)
 })
 .catch((res)=>{
  
 })
 }

 useEffect(()=>{
  getproduct(id)
 
 },[id,category])
 async function addProductcart(id){

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
  }}> {loading ?<i className='fas fa-spinner fa-spin '></i>:"Add To Cart" }</button>

      </div>
    </div>:null}
    
  
    </>

    
  )
}
