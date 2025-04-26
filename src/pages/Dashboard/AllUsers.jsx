import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { FaTrash } from 'react-icons/fa'
import Swal from 'sweetalert2'

const AllUsers = () => {
    const{data = [],refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async()=> {
            const res = await fetch('http://localhost:5000/users',{
              headers:{
                'content-type': 'application/json'
              },
              credentials:'include'
            })
            const data = await res.json()
            return data
        }
    })
    const users = data || []

    const handleMakeAdmin = async(id)=> {
      const res = await fetch(`http://localhost:5000/users/admin/${id}`,{
        method:'PATCH',
        credentials: 'include',
        headers: {
          'content-type': 'application/json'
        }
      })
      const data = await res.json()
      console.log(data);
      if(data.modifiedCount > 0) {
        Swal.fire({
          
          icon: "success",
          title: "User is now Admin",
          showConfirmButton: false,
          timer: 1500
        });
        refetch()
      }
      
    }
  return (
    <div>
        <div className='flex justify-evenly my-4'>
            <h2 className='text-3xl'>All Users </h2>
            <h2 className='text-3xl'>Total Users : {users.length} </h2>
        </div>

        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
         #
        </th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody className='text-xl'>
      {
        users.map((user,index)=> <tr key={user._id}>
            <th>
              {index + 1}
            </th>
            <td>{user.name}</td>
            <td>{user.email}</td>
          <td>{user.role || 'user'}</td>
          <td className='flex gap-2'>
          {
            user?.role !== 'admin' ? 
           
            <button onClick={()=> handleMakeAdmin(user._id)} className='btn btn-md bg-orange-500 text-white hover:bg-orange-600 py-2 px-4'>Admin</button>:
            <button className='btn btn-md '><FaTrash className='text-red-500'/></button>
            
          }
          </td>
          
            
            
          </tr>
        )
      }
    
    
    </tbody>
  
  </table>
</div>
    </div>
  )
}

export default AllUsers