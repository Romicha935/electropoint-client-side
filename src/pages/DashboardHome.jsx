import React from 'react'
import { FaBox, FaDollarSign, FaShoppingCart, FaUsers } from 'react-icons/fa'

const DashboardHome = () => {
  return (
    <div className='p-6 w-[100%]'>
        <h2 className='text-3xl font-bold mb-4 text-center'>Welcome to Admin Dashboard</h2>

        {/* summary cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2  gap-6'>
            <div className='bg-gray-100 w-80 rounded-xl shadow p-6 text-center'>
                <FaBox className='text-4xl text-orange-500 mx-auto mb-2 text-center'/>
                <p className='text-xl font-semibold'>120</p>
                <p className='text-gray-600'>Total Products</p>
            </div>

            <div className='bg-gray-100 rounded-xl shadow p-6 text-center'>
                <FaShoppingCart className='text-4xl text-orange-500 mx-auto mb-2 text-center'/>
                <p className='text-xl font-semibold'>32</p>
                <p className='text-gray-600'>Total Orders</p>
            </div>

            <div className='bg-gray-100 rounded-xl shadow p-6 text-center'>
                <FaUsers className='text-4xl text-orange-500 mx-auto mb-2 text-center'/>
                <p className='text-xl font-semibold'>40</p>
                <p className='text-gray-600'>Total Users</p>
            </div>
            <div className='bg-gray-100 rounded-xl shadow p-6 text-center'>
                <FaDollarSign className='text-4xl text-orange-500 mx-auto mb-2 text-center'/>
                <p className='text-xl font-semibold'>$5,120</p>
                <p className='text-gray-600'>Total Revenue</p>
            </div>
        </div>
    </div>
  )
}

export default DashboardHome