import React from 'react'
import  axios  from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Categories() {
  const [category, setcategory] = useState([])
  const [AllSubcategory, setAllSubcategory] = useState([])
   const [loading, setloading] = useState(false)
  function getCategory(){
   
    axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    .then((res)=>{
    console.log(res);
    
    setcategory(res.data.data)
    }).catch((err)=>{
      console.log(err);
      setloading(false)
      
    })
    
  }


   function getAllSpecificonCategory(categoryid){
    setloading(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryid}/subcategories`)
    .then((res)=>{
      console.log(res);
    setloading(false)
      setAllSubcategory(res.data.data)
      }).catch((err)=>{
        console.log(err);
        setloading(false)
      })
   }
  useEffect(()=>{{
    getCategory()
   
  }},[])
  return (
   
   <>
   {loading==false?<><div className=' row '>
    {category.length>0?category.map((category)=>(
  
  <div className="w-1/4 p-3 shadow shadow-gray-500/40 hover:shadow-emerald-700 m-10 hover:scale-110 transform-gpu" key={category._id}>
   
   <button to={`/categories`} onClick={()=>{
    getAllSpecificonCategory(category._id)
   }}> 
   
   <img src={category.image} alt="" className='w-full h-[300px]'/>
   
   </button>
  <h2 className=' text-emerald-600'>{category.name}</h2>


   </div>
 
   ) ):<span className="loader "></span>}
    </div>
  

 <div className='row'>
       
   
       {AllSubcategory.map((AllSubcategory)=>(
    
    
       
     <div className="w-1/4 p-3 shadow shadow-gray-500/40 hover:shadow-emerald-700 m-10 hover:scale-110 transform-gpu " key={AllSubcategory._id}>
            
       
            <h2 className=' text-emerald-600 text-3xl'>{AllSubcategory.name}</h2>
           
          
             </div>
    
     
       ) )}
       </div></>:<span className="loader "></span>}
   </>
  )
}

   