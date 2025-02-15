import { createContext } from "react";
import axios from "axios";
import { useState } from "react";

 export let CartContext  = createContext()

 export default function CartContextProvider(props){
    let headers = {
        token: localStorage.getItem("userToken")
    } 
    const [cartid, setcartid] = useState(0)
    const [numberItems, setnumberItems] = useState(0)
    function Addproduct(productId){
      return   axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
            productId:productId
        },{
            headers
        }
    ).then((res)=>res)
    .catch((err)=>err )
    }
  

function GetProduct(){
   return axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
        headers
    }).then((res)=>{
    setcartid(res.data.data._id)
    console.log(res.data.numOfCartItems);
    
    setnumberItems(res.data.numOfCartItems)
    return res
    }
)
    .catch((err)=>err )
    
}



function UpdateProduct(NewCount,productId){
   return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
        count:NewCount
    },
{
    headers
})
    .then((res)=>res)
    .catch((err)=>err)
}   

function RemoveProduct(productId){
   return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
            headers
        }
       
    ).then((res)=>res)
    .catch((err)=>err)
}
function checkout(cartId,url,formdata){
  return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,{
    shippingAddress:formdata
  },{
    headers
  })
    .then((res)=>res)
    .catch((err)=>err)
    
}       
    return(
        <>
     <CartContext.Provider value={{ Addproduct, GetProduct, UpdateProduct , RemoveProduct, checkout,cartid,numberItems,setnumberItems}}>
            {props.children}
     </CartContext.Provider>
        </>
    )
 }