import React, { useEffect, useState } from 'react'

const useToken = () => {
    const [token,setToken] = useState(()=>localStorage.getItem('access-token'))
    useEffect(()=>{
        const handleStorageChange = ()=> {
            setToken(localStorage.getItem('access-token'))
        }

        window.addEventListener('storage',handleStorageChange)
        return ()=> window.removeEventListener('storage',handleStorageChange)
    },[])
  return token
}

export default useToken