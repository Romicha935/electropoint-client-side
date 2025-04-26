import React from 'react';
import  { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
//import { react } from '@vitejs/plugin-react';

const PopularProduct = () => {
  const {user} = useAuth()
  const navigate = useNavigate()
  useEffect(()=> {
    AOS.init({
      duration:800,
      once:true
    })
  })
const [popular,setPopular] = useState([])
const [currentPage,setCurrentPage] = useState(1)
const itemPerPage = 4


useEffect(()=> {
  fetch('/popular.json')
  .then(res=> res.json())
  .then(data=> setPopular(data))
},[])

const indexOfLastItem = currentPage * itemPerPage;
const indexOfFirstItem = indexOfLastItem - itemPerPage;
const currentItems = popular.slice(indexOfFirstItem, indexOfLastItem);
const totalPage = Math.ceil(popular.length / itemPerPage);
const handlePageClick = (pageNumber) => {

  setCurrentPage(pageNumber)
}

useEffect(()=> {
  const timer = setInterval(()=> {
    setCurrentPage((prev => prev=== totalPage? 4 : prev + 1))
  },300)
  return clearInterval(timer)
},[totalPage])

const handleBuyNow = (product)=> {

  if(!user){
    navigate('/login')
    return;
  }
       Swal.fire({
              icon: 'success',
              title: 'Buy Now!',
              text: 'Thanks for your purchase.',
              timer: 2000,
              showConfirmButton: false
            })
            
            navigate('/checkout',{state: {product}})
}

  return (
    <div className='my-10'>
      <div className='flex gap-2'>
        <span className='h-12 w-6 bg-orange-500'></span>
      <h1 className='text-5xl font-bold'> Popuar Products</h1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mt-10 '>
         {
          currentItems.map((product,index)=> (
            <div  key={product._id} className='bg-gray-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300'>
              <div>
                <img className='w-full h-64 p-9' src={product.image} alt="" />
              </div>
              <h2 className='text-lg font-semibold mb-2'>{product.name}</h2>
              <p className='text-gray-600 line-clamp-1'>{product.details}</p>
           <div className='flex gap-3 px-8 items-center'>
           <p>{product.rating}</p>
              <span className='flex gap-1 text-orange-500'>
                <FaStar />
                <FaStar/>
                <FaStar/>
                <FaStar/>
              </span>
           </div>
           <div className='flex justify-between items-center px-6 py-2'>
           <p className='font-bold'>${product.price}</p>
           <button onClick={()=>handleBuyNow(product)} className='btn rounded-full border'>Buy Now</button>
           </div>
            </div>
          ))
         }
      </div>

      {/* pagination number */}
      <div className='flex justify-center mt-8 gap-3'>
        {
          Array.from({length: totalPage}, (_,index)=> (
            <button onClick={()=>handlePageClick(index + 1)} key={index} className={`px-4 py-2 rounded ${currentPage === index+1? 'bg-orange-500 text-white' : 'bg-gray-200 text-black'}`} >{index+1}</button>
          ))
        }
      </div>
    </div>
  )
}

export default PopularProduct