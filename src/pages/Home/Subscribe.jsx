import React from 'react'

const Subscribe = () => {
  return (
    <div data-aos='fade-up'  className=' p-6 mt-8 text-center my-8'>
        <h2 className='text-4xl font-bold text-gray-700 mb-4'>Subscribe now & get 20% off</h2>
        <p className='text-gray-400'>Get the latest updates on our products, offers, and more directly in your inbox!</p>
        <div className='flex mt-10 justify-center'>
            <input type="email" placeholder='Enter your email' className='border border-gray-400 rounded-1 py-3  px-6 w-[500px] ' />
            <button className='btn bg-orange-500 py-6 font-bold hover:bg-orange-600 px-6 text-white'>Subscribe</button>
        </div>
    </div>
  )
}

export default Subscribe