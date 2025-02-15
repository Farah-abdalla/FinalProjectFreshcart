import axios from "axios";
import { createContext } from "react";

 export let Wishlistcontext = createContext()
 let headers = {
    token: localStorage.getItem("userToken")
} 
 export default function WishlistcontextProvider(props){
   
    function AddWishlist(productId){
        return axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",{
            productId:productId
        },{
            headers
        }
    ).then((res)=>res)
    .catch((err)=>err)
    }

    function getWishlist(){
        return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{
            headers
        })
        .then((res)=>res)
     .catch((err)=>err)
    }
    function removeWishlist(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
            headers
        }).then((res)=>res)
     .catch((err)=>err)
    }

    return <>
    <Wishlistcontext.Provider value={{ AddWishlist , getWishlist, removeWishlist}}>
        {props.children}
    </Wishlistcontext.Provider>
    </>
 }