import React, { useContext, useState } from 'react'
import Img from '../../assets/allImg/loginImg.jpg'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../providers/AuthProviders'
import Swal from 'sweetalert2'
import GoogleLogin from './GoogleLogin'

const Login = () => {
    const {register,handleSubmit, formState:{errors}} = useForm()
    const [showPassword,setShowPassword] = useState(false)
    const {user,signIn} = useContext(AuthContext)
    const navigate =useNavigate()
    const onSubmit = data=> {
        console.log('form info',data);
        signIn(data.email,data.password)
        .then(result=> {
          const user = result.user
          console.log(user);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User Login SuccessFull",
            showConfirmButton: false,
            timer: 1500
          });
          
          navigate('/')
        })
    }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-10'>
       <div className='bg-gray-100 '>
        <img src={Img} alt="" className='w-full h-full object-cover' />
       </div>
       <div className=' p-4 bg-white shadow-xl '>
        <div className='w-full max-w-md'>
            <h2 className='text-3xl font-bold '>Login to ElectroPoint</h2>
            <h3 className='text-xl font-bold py-4 text-orange-500'>Enter your detail bellow</h3>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 flex flex-col mx-auto px-10'>
              <div className='text-xl font-bold text-left'>
                <label className='mb-2'>Email</label>
                <input type="email" placeholder='Enter your email' className='input input-bordered w-full' {...register('email', {required: 'email is required'})} />
                {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
              </div>

              <div className='relative text-xl font-bold text-left'>
                <label className='block mb-1 font-semibold' htmlFor="">Password</label>
                <input type={showPassword? "text" : "password"}  placeholder='Enter your password' className='input input-borderd w-full' {...register('password',{required: 'password is required',
                 minLength:{
                    value:6,
                    message:'Password must be atleast 6 characters'
                 }

                })} />
                  {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}

                  {/* show password */}
                  <span onClick={()=> setShowPassword(!showPassword)} className='absolute top-1/2 right-3 transform translate-y-1/2'>{showPassword? <FaEyeSlash size={20}/> : <FaEye size={20}/> }</span>
              </div>
            <div className='flex flex-col space-y-2 mt-7'>
            <button className='btn text-lg font-bold bg-orange-500   text-white hover:bg-white hover:text-orange-500 border border-orange-500 p-6'>Login</button>
          <GoogleLogin/>
            </div>
            </form>
             <p className='text-gray-600 text-xl font-semibold px-8 mt-8'>Did'nt have an account <small className='px-6 underline text-md font-semibold'><Link to='/signup'>Sign up</Link></small> </p>
        </div>
       </div>
    </div>
  )
}

export default Login