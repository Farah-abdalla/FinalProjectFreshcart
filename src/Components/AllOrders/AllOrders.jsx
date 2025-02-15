import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

export default function AllOrders() {
 const [getAllorders, setgetAllorders] = useState([])
  function getAllOrders(){
    axios.get("https://ecommerce.routemisr.com/api/v1/orders")
    .then((res)=>{
      console.log(res.data.data);
      setgetAllorders(res.data.data)
    })
    .catch((err)=>{
  console.log(err);
  
    })
  }
  useEffect(()=>{
    getAllOrders()
  },[])
  return (
    <>
       <h2 className='text-emerald-600 font-bold text-5xl text-center m-4'>All Orders</h2>
  
<div className=' row '>
{getAllorders.length>0?getAllorders.map((Allorders)=>(
<div className="w-1/4 p-3 shadow shadow-gray-500/40 hover:shadow-emerald-700 m-10 hover:scale-110 transform-gpu" key={Allorders.id}>

<div >{Allorders.cartItems.map((item)=><div className='item.product.id'>
  <div >
  <h3>title:{item.product.title.split(" ").slice(0,2).join(" ")}</h3>
  <h4>price:{item.price}</h4>
  <img src={item.product.imageCover} alt="" className='w-full '/>
  </div>
</div>)}</div>

{/* */}





</div>
) ):<span className="loader "></span>}
</div>   

    </>
  )
}
