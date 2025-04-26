import React, { useEffect, useState } from 'react'
import ProductCard from '../AllProduct/ProductCard'
import { Link } from 'react-router-dom'

const OurProducts = () => {
    const[products,setProducts] = useState([])

    useEffect(()=>{
        fetch('/allProducts.json')
        .then(res=> res.json())
        .then(data=> setProducts(data))
    },[])
  return (
    <div>
      <div data-aos='fade-right' className='flex items-center gap-2'>
      <span className='h-8 w-5 bg-orange-500'></span>
      <h2 className='text-lg font-bold'>Our Products</h2>
      </div>
        <h1 data-aos='fade-right'  className='text-4xl text-gray-600 font-semibold  my-5 text-left'>Explore Our's Product</h1>
        <div data-aos='' className='grid grid-cols-1 md:grid-cols-4 p-5 gap-4'>
            {
                products.slice(0,8).map((product,index) => <ProductCard data-aos-delay={index * 1000} key={product._id}product={product}></ProductCard>)
            }
        </div>
  <div className='my-10'>
    <Link to='/products'>
    <button className='btn bg-orange-500 flex justify-center text-white text-center mx-auto font-bold p-2 hover:bg-orange-700'>View All Products</button>
    </Link>
  </div>

    </div>
  )
}

export default OurProducts