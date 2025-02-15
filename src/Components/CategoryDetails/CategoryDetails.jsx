
//

import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';

export default function CategoryDetails() {
  var settings = {
   
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:1000,
    dots:false
  };

  let {id,category}= useParams()
  const [categoryDetails, setcategory] = useState(null)
  const [loading, setloading] = useState(false)
 function getproduct(id){
 axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
 .then((res)=>{
  console.log(res)
  setcategory(res.data.data)
 })
 .catch((res)=>{
  
 })
 }

 useEffect(()=>{
  getproduct(id)
 
 },[id,category])
 
  return (
   <>
     
<div className=' row '>
  {categoryDetails != null ?<div className="w-1/4 p-3 shadow shadow-gray-500/40 hover:shadow-emerald-700 m-10 hover:scale-110 transform-gpu" key={categoryDetails?._id}>



<img src={categoryDetails?.image} alt="" className='w-full '/>


<h2 className=' text-emerald-600 font-bold text-2xl'>{categoryDetails?.name}</h2>


</div>:<span className="loader "></span>}


</div> 
    
  
    </>

    
  )
}
