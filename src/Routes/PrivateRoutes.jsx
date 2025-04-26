import React from 'react'
import useAuth from '../Hooks/useAuth'
import { Navigate, useLocation, } from 'react-router-dom'

const PrivateRoutes = ({children}) => {
    const {user,isLoading} = useAuth()
    const location = useLocation()
  
    if(isLoading){
      return  <span className="loading loading-spinner loading-xl"></span>
    }
    
    if(user){
        return children
    }
  return (
    
    <Navigate to='/login' state={{form:location}} replace></Navigate>
  )
}

export default PrivateRoutes