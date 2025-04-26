import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAuth from './useAuth'

const useCart = () => {
  const{user} = useAuth()
    const{data:cart=[],isLoading,refetch} = useQuery({
        // enabled:!loading && !!user?.email,
        queryKey:['cart',user?.email],
        queryFn:async ()=> {
          
            const res = await fetch(`http://localhost:5000/carts?email=${user.email}`,{
                credentials:'include'
             
            })
            const data = await res.json()
            return data
        }
    })
  return [cart,isLoading,refetch]
}

export default useCart