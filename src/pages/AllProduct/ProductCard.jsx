import React, { useContext } from 'react'
import { BsEye } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../providers/AuthProviders'
import Swal from 'sweetalert2'
import useCart from '../../Hooks/useCart'

const ProductCard = ({product}) => {
    const {_id,name,image,price,category,details} = product
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
        productId:_id,
          name,
           price,
           image
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
  return (
    <div data-aos='fade-left' data-aos-delay='1000' className= 'relative bg-white  shadow-md rounded-xl   hover:shadow-lg transition duration-300'>
      {/** Eye  */}
      <Link to={`/product/${_id}`} >
        <div className='absolute top-3 right-3 hover:bg-orange-500 bg-white hover:text-white text-black p-2 rounded-full'>
          <BsEye className=' w-5 h-5'/>
        </div>
      </Link>
      <img src={product.image} alt="" className='bg-gray-100 w-full h-48 object-contain '/>
      <button onClick={()=>handleAddToCart()} className='btn w-full bg-black hover:bg-gray-300 text-white hover:text-black py-2'>Add To Cart</button>
      <h2 className='text-xl font-semibold mb-1'>{name}</h2>
     
      <p className='text-orange-500 font-bold mb-1'>${price}</p>
   
    </div>
  )
}

export default ProductCard