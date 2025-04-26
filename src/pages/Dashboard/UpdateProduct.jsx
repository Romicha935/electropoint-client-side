import React from 'react'
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_API;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const UpdateProduct = () => {
        const {id} = useParams()
        const {register, handleSubmit, formState: { errors },reset} = useForm()
        const onSubmit =async (data)=> {
           console.log('form submited', data);
    
            const imageFormData = new FormData()
               imageFormData.append('image',data.image[0])
               const imageUpload = await fetch(image_hosting_api,{
                method: 'POST',
              
                body:imageFormData
               })
    
               const imageResult = await imageUpload.json()
               console.log('image result',imageResult);
               if(imageResult.success){
                const productData = {
                 name: data.name,
                 category:data.category,
                 price:data.price,
                 brand:data.brand,
                 color:data.color,
                 details:data.details
                }
                const res =  await fetch(`http://localhost:5000/products/${id}`,{
                    method:'PATCH',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem('access-token')}`
                    },
                    body:JSON.stringify(productData)
                  })
                  const result = await res.json()
                  console.log('server response' ,result);
                  if(result && result.modifiedCount > 0){
                    Swal.fire({
                        title: "Product updated successfull!",
                        text: "You clicked the button!",
                        icon: "success"
                      });
                  }
                  reset()
               }
                }
  return (
    <div>
           <p className='text-orange-500 underline-offset-1 -mt-10 text-center'>what's a new</p>
           <h2 className='text-3xl font-bold items-center text-center py-6'>Update an Product</h2>
           <div className=''>
               <form onSubmit={handleSubmit(onSubmit)} >
                   {/* <input {...register('name')}    /> */}
                   <div className='form-control w-full my-6'>
                       <label className=' '>
                           <span className='label-text  '>Product name*</span>
                       </label>
                       <input type="text" placeholder='product name' {...register('name')} className=' input input-borderd w-full'/>
                   </div>
   
                   <div className='flex gap-6'>
                       {/* category */}
                       <div className='form-control w-full my-6'>
                           <label className='label'>
                               <span>Category*</span>
                           </label>
                           <select defaultValue='default' {...register('category', {required:true})} className='select select-bordered w-full'>
                               <option disabled value="default">Select a Category</option>
                               <option value="Phone">Phone</option>
                               <option value="Laptop">Laptop</option>
                               <option value="Smart Watch">Smart Watch</option>
                               <option value="Camera">Camera</option>
                               <option value="Drone">Drone</option>
                               <option value="Headphones">Headphons</option>
                               <option value="Speaker">Speaker</option>
                               <option value="Televisions">Televisions</option>
                               <option value="Audio Systems">Audio Systems</option>
                               <option value="Projectors">Projectors</option>
                               <option value="Mice">Mice</option>
                               <option value="Printers">Printers</option>
                               <option value="Scaners">Scaners</option>
                               <option value="Keyboard">Keyboards</option>
                           </select>
                       </div>
   
                       {/* price */}
                      <div className='form-control w-full  my-6'>
                       <label htmlFor="" className='label'>
                           <span className='label-text'>Price*</span>
                       </label>
                       <input {...register('price', {required:true})} type="number" placeholder='price' className='input input-borderd w-full' />
                      </div>
                   </div>
                   <div className='flex gap-6'>
                       {/* brand */}
                       <div className='form-control w-full my-6'>
                           <label className='label'>
                               <span>Brand*</span>
                           </label>
                        <input {...register('brand',{required:true})} type="text" placeholder='brand' className='input input-borderd w-full' />
                       </div>
   
                       {/* rating */}
                      <div className='form-control w-full  my-6'>
                       <label htmlFor="" className='label'>
                           <span className='label-text'>Rating*</span>
                       </label>
                       <input {...register('rating', {required:true})} type="text" placeholder='rating' className='input input-borderd w-full' />
                      </div>
                   </div>
                   <div className='flex gap-6'>
                       {/* image */}
                       <div className='form-control w-full my-6'>
                           <label className='label'>
                               <span>Image*</span>
                           </label>
                        <input {...register('image',{required:true})} type="file" placeholder='image' className='file-input file-input-borderd w-full' />
                       </div>
   
                       {/* color */}
                      <div className='form-control w-full  my-6'>
                       <label htmlFor="" className='label'>
                           <span className='label-text'>Color*</span>
                       </label>
                       <input {...register('color', {required:true})} type="text" placeholder='color' className='input input-borderd w-full' />
                      </div>
                   </div>
   
                   <div className='form-control'>
                  
                           <span className='font-semibold'>details</span>
                           <textarea 
                           {...register('details', {required:true})} className='textarea w-full h-24 border'></textarea>
                           {errors.details && <p className='text-red-500 text-sm mt-1'>{errors.details.message}</p>}
                       
                   </div>
                   <button className='btn mt-8 bg-orange-500 text-white' type='submit'>Update Product <FaUtensils/></button>
               </form>
           </div>
       </div>
  )
}

export default UpdateProduct