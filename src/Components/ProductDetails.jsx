import React, { useContext, useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { AuthContext } from '../providers/AuthProviders'
import useCart from '../Hooks/useCart'
import AOS from 'aos'
import 'aos/dist/aos.css'

const ProductDetails = () => {
   const navigate = useNavigate()
   useEffect(() => {
      AOS.init({
        duration: 1000,
        once: true, // একবারই animate করবে
      })
    }, [])
    const {id} = useParams()
    const [product,setProduct] = useState([])
    const [loading, setLoading] = useState(true)

const [, ,refetch] = useCart()
    // console.log(product);
    
    const {user} = useContext(AuthContext)
    const handleAddToCart = ()=> {
      if(!user){
        Swal.fire({
          icon:'warning',
          title: 'Please Login first'
        })
        return
      }
   
      const cartItem = {
        userEmail:user.email,
        productId:product._id,
          name:product.name,
           price:product.price,
           image:product.image
      }
      
      fetch('http://localhost:5000/carts',{
        method: 'POST',
        headers: {
          'content-type': 'application/json',
       // Using the token from cookies
        },
        credentials:'include',
        body:JSON.stringify(cartItem)
      })
      .then(res=>res.json())
      .then(data=> {
          console.log(data);
          if(data.insertedId){
            Swal.fire({
          
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500
            });
            refetch()
          }
      })
    }
    
    useEffect(()=> {
        fetch('http://localhost:5000/products',{
         method:'GET',
         credentials:'include'
        })
        .then(res=> res.json())
        .then(data => {
            const found = data.find(product => product._id === id)
            setProduct(found)
            setLoading(false)
        })
    },[id])
 const handleBuyNow = () => {
    if(!user){
        navigate('/login')
        return;
    }
   navigate('/checkout', {state:product})
 }
      
    if (loading) {
      return (
          <div className="text-center py-5">
              <h2 className="text-2xl font-semibold">Loading...</h2>
          </div>
      )
   }
  return (
   <div className='py-5 my-10'>
      <h1 className='text-4xl font-bold text-center'>Your Product Information</h1>
     <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 my-10 px-4'>
      
      <div data-aos='fade-right' >
         <img src={product.image} alt="" className='bg-gray-100 w-[400px] h-[400px] shadow' />
      </div>
      <div data-aos='fade-left'  className='space-y-4 text-left'>
         <h2 className='text-3xl font-bold text-orange-500 pb-4'>{product.name}</h2>
     
         <p className='text-lg text-gray-600'>{product.details}</p>
         <p><span className='font-semibold'>Brand:</span>{product.brand}</p>
        
         <p><span className='font-semibold'>Category: </span>{product.category}</p>
         <p><span className='font-semibold'>Color: </span>{product.color}</p>
         <p className='text-xl flex gap-1 font-semibold items-center'>Rating: {product.rating}<span className='font-semibold flex items-center  text-orange-500 '><FaStar/> <FaStar/><FaStar/><FaStar/></span></p>
         <p className='text-4xl font-bold text-orange-500'>${product.price}</p>
   <div>
      <button onClick={handleAddToCart} className='btn bg-black mr-6 py-3 px-6 hover:bg-gray-300 hover:text-black text-white'>Add To Cart</button>
      <button onClick={handleBuyNow} className='btn bg-orange-500 py-2 px-4 text-white'>Buy Now</button>
   </div>
         
      </div>
 </div>
   </div>
  )
}

export default ProductDetails