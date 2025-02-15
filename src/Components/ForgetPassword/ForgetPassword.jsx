import {useFormik} from 'formik'
import React, { useContext } from 'react'
import { useState } from 'react'
import *  as yup   from "yup"
import  axios  from 'axios';
import {useNavigate} from "react-router-dom"
import { CurrentContext } from '../../Context/CurrentContext';

export default function ForgetPassword() {
  const [isLoading, setisLoading] = useState(false)
  const [ApiError, setApiError] = useState("")
   let {userLogin, setuserLogin} =useContext(CurrentContext)
  let navigate = useNavigate()  
  let  validationSchema = yup.object().shape({
      
    email:yup.string().email("email is not valid").required("email is required"),
   
    
  })
  let formik = useFormik({
    initialValues:{
      email:""
    },
    validationSchema,
    onSubmit:handelForgetPassword,
  })
  async function handelForgetPassword(values){
  
    
    console.log(values);
   setisLoading(true)
   axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",values)
   
    .then((res)=>{
   setisLoading(false)
   console.log(res.data.message)
   if(res.data.message == "Reset code sent to your email"){
    localStorage.setItem("userToken",res.data.token)
    setuserLogin(res.data.token)
       navigate("/resetcode")
   }
    })
    .catch((res)=>{
       setisLoading(false)
       setApiError(res.response.data.message)
    })
  
   }
   
    
  
    
   
  return (
    <>
   
 
   <h3 className='m-9 font-bold text-3xl text-emerald-700 text-center'>please enter your verification code</h3>
   <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
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

<button type="submit" className="m-4 text-left text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Verify</button>
  </div>
  </form>
    </>
  )
}
 