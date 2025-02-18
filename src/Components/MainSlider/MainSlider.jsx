import React from 'react'
import Slider from "react-slick";
import slider1 from "../../assets/slider-image-1.jpeg"
import slider2 from "../../assets/slider-image-2.jpeg"
import slider3 from "../../assets/slider-image-3.jpeg"
import slider4 from "../../assets/grocery-banner.png"
import slider5 from "../../assets/grocery-banner-2.jpeg"
export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:1000,
    
  };



  return (
    <div className="row">
    <div className='w-3/4'>
    
     <Slider {...settings}>
     <img src={slider3} alt=""  className='w-full h-[400px] object-cover'/>
     <img src={slider4} alt=""  className='w-full h-[400px] object-cover'/>
     <img src={slider5} alt=""  className='w-full h-[400px] object-cover'/>
     </Slider>
     </div>
     <div className='w-1/4'>
     <img src={slider2} alt=""  className='w-full h-[200px]'/>
     <img src={slider3} alt=""  className='w-full h-[200px]'/>
     </div>
    </div>
   
  )
}
