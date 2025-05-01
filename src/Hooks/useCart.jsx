import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAuth from './useAuth'

const useCart = () => {
  const{user} = useAuth()
    const{data:cart=[],isLoading,refetch} = useQuery({
        // enabled:!loading && !!user?.email,
        queryKey:['cart',user?.email],
        queryFn:async ()=> {
          
            const res = await fetch(`https://electropoint-server-side.vercel.app/carts?email=${user.email}`,{
                credentials:'include'
             
            })
            const data = await res.json()
            console.log(data);
            
            return data
        }
    })
  return [cart,isLoading,refetch]
}

export default useCart