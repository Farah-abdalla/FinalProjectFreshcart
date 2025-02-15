import React, { useState } from 'react'
import { useEffect } from 'react';
import axios  from 'axios';

export default function SubCategories() {
  const [subcategories, setsubcategories] = useState([])
  function getSubCategories(){
    axios.get("https://ecommerce.routemisr.com/api/v1/subcategories")
    .then((res)=>{
   console.log(res);
   setsubcategories(res.data.data)
    })
  }

  useEffect(()=>{
    getSubCategories()
  },[])
  return (
    
<div className=' row '>
{subcategories.length>0?subcategories.map((subcategories)=>(
<div className="w-1/4 p-3 shadow shadow-gray-500/40 hover:shadow-emerald-700 m-10 hover:scale-110 transform-gpu" key={subcategories._id}>



<img src={subcategories.image} alt="" className='w-full '/>


<h2 className=' text-emerald-600 font-bold text-2xl'>{subcategories.name}</h2>


</div>
) ):<span className="loader "></span>}
</div> 
  )
}
