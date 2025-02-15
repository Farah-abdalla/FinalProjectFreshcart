import React, {  useState } from 'react'
import {useFormik} from 'formik'
import *  as yup   from "yup"
 import axios from 'axios'
 import {useNavigate, Link} from "react-router-dom"
 import { useContext } from 'react';
import { CurrentContext } from '../../Context/CurrentContext'




export default function Register() {
   const [ApiError, setApiError] = useState("")
   const [isLoading, setisLoading] = useState(false)
   let {userLogin, setuserLogin} =useContext(CurrentContext) 
   let navigate = useNavigate()
   async function handleRegister(values){
  //  let res =await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
  //  console.log(res)
  console.log(values);
   setisLoading(true)
   axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
   
    .then((res)=>{
   setisLoading(false)
   console.log(res.data.message)
   if(res.data.message == "success"){
    localStorage.setItem("userToken",res.data.token)
    setuserLogin(res.data.token)
   
       navigate("/")
   }
    })
    .catch((res)=>{
       setisLoading(false)
       setApiError(res.response.data.message)
    })
  
  }
  
  let  validationSchema = yup.object().shape({
    name:yup.string().min(3,"min lenght is 3").max(10,"max lenght is 10").required("name is required"),
    email:yup.string().email("email is not valid").required("email is required"),
    password:yup.string().min(6,"min lenght is 6").required("password is required"),
    rePassword:yup.string().oneOf([yup.ref("password")],"not matched with password").required("repassword is required"),
    phone:yup.string().matches(/^01[0125][0-9]{8}$/,"phone is valid").required("phone is required")

  })
  let formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:"",
    },
    validationSchema,
    onSubmit:handleRegister,
  })
  return (
    <>
    {ApiError?<div className='mx-auto text-center bg-red-700 rounded-lg p-3 text-white w-1/3 m-2'>
     {ApiError}
    </div>:null}
    <h1 className='text-center font-bold text-emerald-700 m-3'>Register Now</h1>

<form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
  <div className="relative  z-0 w-full mb-5 group">
      <input type="text" 
      name="name"
      values={formik.values.name}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
       id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="name"
       className="peer-focus:font-medium absolute left-0
        text-sm text-emerald-500
         duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
          peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto
           peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your name</label>
            {formik.errors.name&&formik.touched.name?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.name}</span> 
</div>:null}
  </div>
 
  <div className="relative  z-0 w-full mb-5 group">
      <input type="email" 
      name="email"
      values={formik.values.email}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
       id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="email"
       className="peer-focus:font-medium absolute left-0
        text-sm text-emerald-500
         duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
          peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto
           peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your email</label>
              {formik.errors.email&&formik.touched.email?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.email}</span> 
</div>:null}
  </div>
  <div className="relative  z-0 w-full mb-5 group">
      <input type="password" 
      name="password"
      values={formik.values.password}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
       id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="password"
       className="peer-focus:font-medium absolute left-0
        text-sm text-emerald-500
         duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
          peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto
           peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your password</label>
              {formik.errors.password&&formik.touched.password?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.password}</span> 
</div>:null}
  </div>
  <div className="relative  z-0 w-full mb-5 group">
      <input type="password" 
      name="rePassword"
      values={formik.values.rePassword}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
       id="repassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="repassword"
       className="peer-focus:font-medium absolute left-0
        text-sm text-emerald-500
         duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
          peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto
           peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your repassword</label>
              {formik.errors.rePassword&&formik.touched.rePassword?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.rePassword}</span> 
</div>:null}
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
              {formik.errors.phone&&formik.touched.phone?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.phone}</span> 
</div>:null}
  </div>
  
  <div className='flex gap-2 items-center'>
    <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
   {isLoading?
    <i className='fas fa-spinner fa-spin'></i>
  :"Register"} </button>
   <Link to={"/login"}><span className='text-blue-500'>do you have an account? Login Now</span></Link>
  </div>
  
</form>

    </>
  )
}
