import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import slider1 from "../../assets/slider-image-1.jpeg"
import slider2 from "../../assets/slider-image-2.jpeg"
import slider3 from "../../assets/slider-image-3.jpeg"
import slider4 from "../../assets/grocery-banner.png"
import slider5 from "../../assets/grocery-banner-2.jpeg"
export default function CategoriesSlider() {

  var settings = {
   
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:1000,
    dots:false
  };





   const [categories, setcategories] = useState([])
  function getCategories(){
    axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    .then((res)=>{
      console.log(res.data.data);
      setcategories(res.data.data)
    })
    .catch((res)=>{
      console.log(res);
      
    })
 
  }
  useEffect(()=>{
    getCategories()
  },[])
  return (
    <>
    <h2 className='my-3 capitalize font-semibold text-gray-6+00  text-left'>shop popular categories</h2>
     <Slider {...settings}>
    
     {categories.map((product)=>(

<div key={product._id}>
  <img src={product.image} alt="" className='w-full h-[200px]'/>


<h2 className=' text-emerald-600'>{product.name}</h2>

</div>


) )}
     </Slider>
  
  
   

    </>
  )
}
