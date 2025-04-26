import React, { useEffect, useState } from 'react'

const AllOrders = () => {
  const [orders,setOrders] = useState([
   
  ])

    useEffect(()=>{
      fetch('http://localhost:5000/orders',{
        method:'GET',
        credentials:'include'
      })
      .then(res=> res.json())
      .then(data => setOrders(data))
    },[])

  return (
    <div>
        <h2 className='text-3xl text-center font-bold'>All Orders</h2>
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Customer</th>
        <th>Product</th>
        <th>Quantity</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        orders.map((order,index)=> (
          <tr key={index} className='border-b'>
        <th>
         {index + 1}
        </th>
        
        <td>{order.customerName || order.name}</td>
        <td>{order.productName || order.cartItems?.[0]?.name ||'N/A'}</td>
        <td>{order.quantity || order.cartItems?.[0]?.quantity || 1}</td>
        <td>{order.status || 'Pending'}</td>
        <td>
          <button className='bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2'>Aprove</button>
          <button className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded'>Cancel</button>
        </td>
      
      </tr>
        ))
      }
      
     
    </tbody>
 
  </table>
</div>
    </div>
  )
}

export default AllOrders