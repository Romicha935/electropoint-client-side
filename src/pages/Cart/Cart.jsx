import React from 'react'
import useCart from '../../Hooks/useCart'
import { FaTrash } from 'react-icons/fa'
import Swal from 'sweetalert2'
import useAuth from '../../Hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
   const [cart,isLoading,refetch] = useCart()
   const {user} = useAuth()
   const navigate = useNavigate()
   const totalPrice = cart.reduce((total,item)=> total + item.price,0)

   const handleDelete = (id) =>{
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
         fetch(`https://electropoint-server-side.vercel.app/carts/${id}`, {
          method:'DELETE',
          headers:{
            'content-type': 'application/json'
          },
          credentials:'include'
         })
         .then(res=> res.json())
         .then(data=> {
          if(data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            refetch()
          }
         })
      }
    });
   }

   const handlePlaceOrder = () => {
    const order = {
      customerName:'unknown',
      email: "order@gmail.com",
      items:cart.map((item)=>({
        productName: item.name,
        image:item.image,
        price: item.price,
        quantity: item.quantity || 1,
        
     
      })),
         status: 'Pending',
         totalPrice:totalPrice
    } 
    fetch('https://electropoint-server-side.vercel.app/orders',{
      method: 'POST',
      headers:{
        'content-type': 'application/json'
      },
      credentials:'include',
      body: JSON.stringify(order)
    })
    .then(res=> res.json())
    .then(data=> {
      console.log(data);
      if(data.insertedId){
        console.log(user?.emai);
        
        fetch(`https://electropoint-server-side.vercel.app/carts/clear/${user?.email}`,{
            method: 'DELETE',
            headers: {
              'content-type': 'application/json'
            },
            credentials:'include'
          })
          .then(res=> res.json())
          .then(delRes=> {
            refetch()
            if(delRes.deletedCount > 0){
              Swal.fire({
         
                icon: "success",
                title:'your order has been submitted successfully',
                showConfirmButton: false,
                timer: 1500
              });
              navigate('/dashboard/orders')
            }
            else{
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                // footer: '<a href="#">Why do I have this issue?</a>'
              });
            }
           
          })
       
      
      }
     
    })
   }
  return (
    <div className='my-10'>
        <div className='flex justify-evenly px-10 pt-10'>
            <h2 className='text-4xl'>items: {cart.length} </h2>
            <h2 className='text-4xl'>Total price: ${totalPrice} </h2>
            <button className='btn bg-orange-500 p-4 text-white'>Pay</button>
            <button onClick={handlePlaceOrder} className='btn bg-green-500 hover:bg-green-600 py-1 px-3 text-white'> Palce Order</button>
        </div>

        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
         #
        </th>
        <th>Image</th>
        <th>Name</th>
        <th>Price</th>
        <th>Action</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
     {
        cart.map((item,idx)=> <tr key={item._id} >
        <th>
         {idx + 1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={item.image}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            
          </div>
        </td>
        <td>
          {item.name}
        </td>
        <td>${item.price}</td>
        <th>
          <button onClick={()=> handleDelete(item._id)} className="btn btn-ghost btn-xs p-4"> <FaTrash className='text-xl text-red-500 '/> </button>
        </th>
      </tr> )
     }
    
      
    </tbody>
   
  </table>
</div>
    </div>
  )
}

export default Cart