import React from 'react'
import { FaHome, FaList, FaTrash, FaUser } from 'react-icons/fa'
import { FaHouseMedical } from 'react-icons/fa6'
import { GrDeliver, GrUpdate } from 'react-icons/gr'
import { IoSettingsOutline } from 'react-icons/io5'
import { RiFunctionAddLine } from 'react-icons/ri'
import { NavLink, Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className='flex  '>
        {/* sidebar */}
        <div className='w-64 min-h-screen  shadow-xl'>
            <ul className='space-y-4 font-semibold menu p-4'>
                <li>
                    <NavLink to='/dashboard'><FaHome/> Dashboard Home</NavLink>
                </li>
                <li>
                    <NavLink to='/dashboard/add-product'><RiFunctionAddLine/> Add products</NavLink>
                </li>
               
                <li>
                    <NavLink to='/dashboard/manage-product'><FaList/> Manage products</NavLink>
                </li>
               
                <li>
                    <NavLink to='/dashboard/all-users'><FaUser/> All Users</NavLink>
                </li>
                <li>
                    <NavLink to='/dashboard/orders'><GrDeliver/> All Orders</NavLink>
                </li>
                <li>
                    <NavLink to='/dashboard/setting'><IoSettingsOutline/> Site Setting</NavLink>
                </li>
                <li>
                    <NavLink to='/'><FaHouseMedical/> Go to Home</NavLink>
                </li>
            </ul>
        </div>

        <div className='flex-1 p-8'>
            <Outlet/>
        </div>
    </div>
  )
}

export default DashboardLayout