import React, { useEffect, useState } from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa'
import Rating from 'react-rating'

import "swiper/css"
import "swiper/css/navigation"
import { Navigation } from 'swiper/modules'
import { SwiperSlide,Swiper } from 'swiper/react'

const Testimonials = () => {
    const [reviews,setReviews] = useState([])

    useEffect(()=>{
        fetch('/reviews.json')
        .then(res=> res.json())
        .then(data=> setReviews(data))
    },[])
  return (
    <div className='my-9'>
        <h3 data-aos='fade-down' className='text-lg text-center text-orange-500'>What our client say</h3>
        <h1 data-aos='fade-down' className='text-4xl text-center font-bold'>Testimonials</h1>
         <Swiper navigation={true} modules={[Navigation]} className='mySwiper'>
           {
            reviews.map((review,index)=> <SwiperSlide  key={review._id}>
             <div className='flex flex-col items-center mx-24 my-10'>
               <Rating initialRating={review.rating}
               emptySymbol={<FaRegStar className='text-gray-400 text-2xl'/>}
               fullSymbol={<FaStar className='text-2xl text-yellow-500'/>}
               readonly
               />
               <p className='py-8'>{review.details}</p>
               <h3 className='text-2xl text-orange-500'>{review.name}</h3>
               <img src={review.image}className='h-16 w-16 rounded-full mt-2' alt="" />
             </div>
            </SwiperSlide> )
           }
         </Swiper>
    </div>
  )
}

export default Testimonials