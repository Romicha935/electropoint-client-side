import React, { useContext, useState } from 'react'
import Img from '../../assets/allImg/loginImg.jpg'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../providers/AuthProviders'
import GoogleLogin from './GoogleLogin'


const SignUp = () => {
      const {register,handleSubmit, formState:{errors}} = useForm()
      const [showPassword,setShowPassword] = useState(false)
      const {createUser} = useContext(AuthContext)
      const navigate = useNavigate()

      const onSubmit = data=> {
          console.log('form info',data);
          
          createUser(data.email,data.password)
          .then(result => {
            const user = result.user;
            console.log(user);

            fetch('https://electropoint-server-side.vercel.app/users',{
              method: 'POST' ,
              headers:{
                'content-type': 'application/json'
              },
              body: JSON.stringify({name:data.name,email:data.email}),
              credentials: 'include'
            })

            .then(()=> {
              fetch('https://electropoint-server-side.vercel.app/jwt',{
                method:'POST',
                headers:{
                  'content-type': 'application/json'
                },
                body: JSON.stringify({email:data.email}),
                credentials:'include'
              })
              .then(res=>res.json())
              .then(tokenData => {
           
                console.log('jwt token successfully',tokenData);
                navigate('/')
                

              })
            })

            
          })
          .catch(error=> {
            if(error.code === 'auth/email-already-in-use'){
              alert('This email is alredy Registered, Please Login')
            }
            else{
              console.log(error.message);
              
            }
          })
      }

  return (
    <div className='min-h-screen  grid grid-cols-1 md:grid-cols-2 gap-5 mt-10'>
          <div className='bg-gray-100 '>
           <img src={Img} alt="" className='w-full h-full object-cover' />
          </div>
          <div className=' p-4 bg-white shadow-xl '>
           <div className='w-full max-w-md'>
               <h2 className='text-3xl font-bold '>Create An Account</h2>
               <h3 className='text-xl font-bold py-4 text-orange-500'>Enter your detail bellow</h3>

               <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 flex flex-col mx-auto px-10'>
                 <div className='text-xl font-bold text-left'>
                   <label className='mb-2'>Name</label>
                   <input type="text" placeholder='Enter your name' className='input input-bordered w-full' {...register('name', {required: 'name is required'})} />
                   {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
                 </div>
                 <div className='text-xl font-bold text-left'>
                   <label className='mb-2'>Email</label>
                   <input type="email" placeholder='Enter your email' className='input input-bordered w-full' {...register('email', {required: 'email is required'})} />
                   {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
                 </div>
   
                 <div className='relative text-xl font-bold text-left'>
                   <label className='block mb-1 font-semibold' htmlFor="">Password</label>
                   <input type={showPassword ? "text": "password"} placeholder='Enter your password' className='input input-borderd w-full' {...register('password',{required:true,minLength:6,maxLength:20, pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{6,}$/
   
                   })} />
                   {errors.password?.type === "required" && <p className='text-red-500 text-sm'>Password is required</p> }
                     {errors.password?.type === 'minLength' && <p className='text-red-500 text-sm'>Password must be 6 characters</p>}
                     {errors.password?.type === 'maxLength' && <p className='text-red-500 text-sm'>Password must be less then 20 characters</p> }
                     {errors.password?.type === 'pattern' && <p className='text-sm text-red-500'>password must have one uppercase & one lowercase, one number and one special characters</p> }
                     {/*show password */}
                     <span onClick={()=> setShowPassword(!showPassword)} className='absolute top-1/2 right-3 transform -translate-y-1/2'>{showPassword? <FaEyeSlash size={20}/> : <FaEye size={20}/>}</span>
                   {/* fotgot password */}
                     <div><a href="" className='link link-hover'>Forgot Password</a></div>
                 </div>
               <div className='flex flex-col  space-y-2 mt-7'>
               <button className='btn text-lg font-bold bg-orange-500   text-white hover:bg-white hover:text-orange-500 border border-orange-500 p-6'>Sign Up</button>
             <GoogleLogin/>
               </div>
               </form>
                <p className='text-gray-600 text-xl font-semibold px-8 mt-8'>Alrady have an account <small className='px-6 underline text-md font-semibold'><Link to='/login'>Sign in</Link></small> </p>
           </div>
          </div>
       </div>
  )
}

export default SignUp