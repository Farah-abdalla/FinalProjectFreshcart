import React, { useContext, useEffect, useState } from 'react';
import { Wishlistcontext } from '../../Context/WishlistContext';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';

export default function WishList() {
  let { getWishlist, removeWishlist } = useContext(Wishlistcontext);
   let {numberItems,setnumberItems} = useContext(CartContext)
  const [wishlist, setWishlist] = useState([]);
  const [loading, setloading] = useState(false); 
  const [loadingCart, setloadingCart] = useState(false);  // Loading state
  const [currentId, setcurrentId] = useState(0)
  let { Addproduct  } = useContext(CartContext)
  // Fetch products from the wishlist
  const getWishListProduct = () => {
    setloading(true);  // Enable loading state
    getWishlist()
      .then(response => {
        console.log(response.data);
        if (response.data.status === "success") {
          setWishlist(response.data.data);
        } else {
          toast.error("Failed to load wishlist.");
        }
      })
      .catch(error => {
        console.error("Error fetching wishlist:", error);
        toast.error("Error fetching wishlist.");
      })
      .finally(() => {
        setloading(false);  // Disable loading state
      });
  };

  // Remove product from the wishlist
  const removeWishListProduct = (id) => {
    removeWishlist(id)
      .then(response => {
        console.log(response.data);
        if (response.data.status === "success") {
          toast.success("Product successfully removed from wishlist.");
          setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== id)); 
          
        } else {
          toast.error("Failed to remove product.");
        }
      })
      .catch(error => {
        console.error("Error removing product from wishlist:", error);
        toast.error("Error removing product.");
      });
  };
  async function addProductcart(id){
    setcurrentId(id)
    setloadingCart(true)
     let response = await Addproduct(id)
     console.log(response.data.message);
    
     if(response.data.status == "success"){
      toast.success('Product added successfully to your cart');
      setloadingCart(false)
      setnumberItems(numberItems+1)
     }
     else{
      toast.error('This is an error!');
      setloadingCart(false)
     }
  
     
    }
  // Fetch wishlist data on component mount
  useEffect(() => {
    getWishListProduct();
  }, []);

  return (
    <>
      

      {loading ? (
        <span className="loader "></span>
      ) : (
        <>
        <h2 className='text-left m-4 font-bold text-3xl text-emerald-700'>My Wishlist</h2>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <tbody>
              {wishlist.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-4">No items in your wishlist.</td>
                </tr>
              ) : (
                wishlist.map((data) => (
                  <tr key={data.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="p-4">
                      <img src={data.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Product" />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      <div className="m-3  text-emerald-600 text-xl">{data.title}</div>
                      <div className="m-3  text-emerald-700">{data.price}</div>
                      <div className="m-3  text-red-700">
                        <button onClick={() => removeWishListProduct(data.id)}> 
                          <i className="fa-solid fa-trash text-red-600"></i> Remove
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className='bg-emerald-700 text-white px-7 py-4 rounded-md' onClick={()=>{
                        addProductcart(data.id)
                      }}>{loadingCart&& currentId == data.id ?<i className='fas fa-spinner fa-spin '></i>:"Add To Cart" }</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        </>
      )}
    </>
  );
}
