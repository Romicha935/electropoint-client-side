import React from 'react'
import Navbar from '../pages/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'

const Main = () => {
  return (
    <div className=''>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Main