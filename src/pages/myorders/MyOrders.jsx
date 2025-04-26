import React from 'react'
import useAuth from '../../Hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import { FaTrash } from 'react-icons/fa'
import Swal from 'sweetalert2'

const MyOrders = () => {
    const {user} = useAuth()
    let count = 1
    const {data: orders = [], refetch} = useQuery({
        queryKey: ['orders', user?.email],
      
        queryFn: async ()=> {
               const res = await fetch(`http://localhost:5000/orders?email=${user.email}`,{
                credentials: 'include'
               })

               const data = await res.json()
               return data
        }
    })

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
           
              
              fetch(`http://localhost:5000/orders/${id}`,{
                
                method:'DELETE',
                credentials:'include',
                headers:{
                    'content-type': 'application/json'
                }
              })
              .then(res=> res.json())
              .then(data=> {
                if(data.deletedCount > 0) {
                     Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });
                }
                
                
                refetch()
              })
            }
          });
    }
  return (
    <div>
        <h2 className='text-3xl text-center mt-10 py-5'>My Orders</h2>
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          #
        </th>
        <th>Image</th>
        <th>Product</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Payment</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        orders.map((order,index)=> (
            order.items.map((item,i)=> (
                <tr key={`${index} - ${i}`} className='text-xl'>
                <th>
                  {count ++}
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.image}
                          />
                      </div>
                    </div>
                   
                  </div>
                </td>
                <td>
                 {item.productName}
                </td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
                <td>{order.paid? 'Paid' : 'Unpaid'}</td>
                <td className='flex gap-2'>
                    {
                        !order.paid && <button className='btn btn-md bg-orange-500 text-white p-3'>Pay Now</button>
                    }
                    <button onClick={()=> handleDelete(order._id,item._id)} className='btn btn-md'><FaTrash className='text-red-500'/></button>
                </td>
                <th>
                 
                </th>
              </tr>
            ))
            
        ))
      }
      
     
    </tbody>
   
  </table>
</div>
    </div>
  )
}

export default MyOrders