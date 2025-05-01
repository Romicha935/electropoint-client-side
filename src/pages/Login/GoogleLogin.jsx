import React from 'react'
import { FaGoogle } from 'react-icons/fa'
import useAuth from '../../Hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const GoogleLogin = () => {
      const { googleSignIn} = useAuth()
      const navigate = useNavigate()

      const handleGoogleSignIn = () => {
        googleSignIn()
        .then(result=> {
            const LoggedUser = result.user;
            console.log(LoggedUser);

            const saveUSer = {
              name: LoggedUser.displayName,
              email: LoggedUser.email
            }
            fetch('https://electropoint-server-side.vercel.app/users',{
              method: 'POST',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify(saveUSer)
            })
            .then(() => {
              // ✅ Step 2: Get JWT token from server
              return fetch('https://electropoint-server-side.vercel.app/jwt', {
                method: 'POST',
                headers: {
                  'content-type': 'application/json'
                },
                body: JSON.stringify({ email: LoggedUser.email })
              });
            })

            .then(res=> res.json())
            .then(data=> {
              localStorage.setItem('access-token',data.token)
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your Google sign in success",
                showConfirmButton: false,
                timer: 1500
              });
            })
           
            navigate('/')
        })
      }
  return (
    <div className=''>
        <button onClick={handleGoogleSignIn} className='btn text-lg font-bold border border-black hover:bg-black hover:text-white w-full p-6'>
                   <FaGoogle className='mr-4'/>Sign in With Google
               </button>
    </div>
  )
}

export default GoogleLogin