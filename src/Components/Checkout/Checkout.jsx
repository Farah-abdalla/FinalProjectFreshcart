import React, { useContext, useState } from 'react'
import {useFormik} from 'formik'

 import axios from 'axios'
import { CartContext } from '../../Context/CartContext'




export default function Checkout() {
  const [loading, setloading] = useState(false)
  let {checkout,cartid} = useContext(CartContext)
  
  let formik = useFormik({
    initialValues:{
      
      details:"",
      phone:"",
      city:""
     
    },
   
    onSubmit:()=>{
      handelCheckout(cartid,`http://localhost:5174`)
    },
  })
   async function handelCheckout(cartid,url){
    setloading(true)
     let {data}= await checkout(cartid,url,formik.values)
     console.log(data.session.url);
     window.location.href=data.session.url
     
   }
    
   
  
  
  
 
  return (
    <>
   
    <h1 className='text-center font-bold text-emerald-700 m-3'>Checkout Now</h1>

<form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
 
 
  <div className="relative  z-0 w-full mb-5 group">
      <input type="text" 
      name="details"
      values={formik.values.details}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
       id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="details"
       className="peer-focus:font-medium absolute left-0
        text-sm text-emerald-500
         duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
          peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto
           peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your details</label>
     
  </div>
  <div className="relative  z-0 w-full mb-5 group">
      <input type="tel" 
      name="phone"
      values={formik.values.phone}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
       id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="phone"
       className="peer-focus:font-medium absolute left-0
        text-sm text-emerald-500
         duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
          peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto
           peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your phone</label>
         
  </div>
  <div className="relative  z-0 w-full mb-5 group">
      <input type="text" 
      name="city"
      values={formik.values.city}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
       id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="city"
       className="peer-focus:font-medium absolute left-0
        text-sm text-emerald-500
         duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
          peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto
           peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your city</label>
         
  </div>
  
  
  <div className='flex gap-2 items-center'>
    <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
   {loading?<i className='fas fa-spinner fa-spin'></i>:"Checkout"} 
    </button>
   
  </div>
  
</form>

    </>
  )
}
