import React from 'react'
import useAuth from './useAuth'
import { useQuery } from '@tanstack/react-query'

const useAdmin = () => {
    const {user,isLoading:authLoading} = useAuth()

  
    const {data:isAdmin , isLoading: isAdminLoading} = useQuery({
        enabled:!!user?.email && !authLoading,
        queryKey:['isAdmin', user?.email],
        queryFn: async()=> {
               
                const res = await fetch(`https://electropoint-server-side.vercel.app/users/admin/${user?.email}`,{
                  method:'GET',
                 
                 credentials:'include'
                })
             const data = await res.json()
             console.log('foo',data);
             
             return data.admin
        }
    })
    console.log(isAdmin);
  return [isAdmin,isAdminLoading]
}

export default useAdmin