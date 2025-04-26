import React from 'react'
import useAuth from '../Hooks/useAuth'
import useAdmin from '../Hooks/useAdmin'
import { IoLocation } from 'react-icons/io5';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoutes = ({children}) => {
    const {user,isLoading} = useAuth()
    const [isAdmin,isAdminLoading] = useAdmin()
    const location = useLocation()

    if(isLoading || isAdminLoading){
        <div>
            <p>loading....</p>
        </div>
    }
    if(user && isAdmin){
      return children
    }
  return (
    <Navigate to='/' state={{from:location}}></Navigate>
  )
}

export default AdminRoutes