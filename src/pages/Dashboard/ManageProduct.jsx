import React from 'react'
import useProducts from '../../Hooks/useProducts'
import { Link } from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Swal from 'sweetalert2'

const ManageProduct = () => {
    const [products,productLoading, refetch] = useProducts()

      const handleDeleteProduct = (product) => {
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
            fetch(`http://localhost:5000/products/${product._id}`,{
              method: 'DELETE',
              headers: {
                 authorization: `bearer ${localStorage.getItem('access-token')}`
              }
            })
            .then(res=>res.json())
            .then(data=> {
              if(data.deletedCount > 0){
                refetch()
                Swal.fire({
                  title: "Deleted!",
                  text: "Your product has been deleted.",
                  icon: "success"
                });
              }
            })
          
          }
        });
      }
  return (
    <div>
        <h4 className='text-sm text-center text-orange-500'>manage all products</h4>
        <h2 className='text-center text-4xl font-bold'>Hurry Up</h2>
        <div>
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          #
        </th>
        <th>Image</th>
        <th>Product Name</th>
        <th>Price</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {
       products.map((product,index)=> (
        <tr key={index}>
        <th>
          {index + 1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={product.image}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
           
          </div>
        </td>
        <td>
           
        {product.name}
        </td>
        <td>{product.price}</td>
        <th>
        <Link to={`/dashboard/update/${product._id}`}><button className="btn btn-lg bg-orange-500"><FaEdit className=' text-white '/></button></Link>
        </th>
        <th>
            <button onClick={()=> handleDeleteProduct(product)} className='btn'><FaTrash className='text-red-500'/></button>
        </th>
      </tr>
       ))
    }
    
   
    </tbody>
  
  </table>
</div>
        </div>
    </div>
  )
}

export default ManageProduct