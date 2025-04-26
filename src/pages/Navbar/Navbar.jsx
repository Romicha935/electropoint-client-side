import React, { useContext } from 'react'
import { FaLongArrowAltRight, FaRegUserCircle, FaSearch, FaShoppingCart } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../../providers/AuthProviders'
import { FaRegCircleUser } from 'react-icons/fa6'
import Swal from 'sweetalert2'
import useCart from '../../Hooks/useCart'
import useAdmin from '../../Hooks/useAdmin'
import useAuth from '../../Hooks/useAuth'

const Navbar = () => {
  
  const [cart] = useCart()
  const {user,logOut} = useContext(AuthContext)
  const [isAdmin,isAdminLoading] = useAdmin()
  const navLinks = <>
    <li className='text-lg'><NavLink to='/' className={({isActive})=> isActive? 'text-orange-500 font-bold underline':'text-black'}>Home</NavLink></li>
    <li className='text-lg '><NavLink to='/products' className={({isActive})=> isActive? 'text-orange-500 font-bold underline':'text-black'}>All Products</NavLink></li>
    <li className='text-lg'><NavLink to='/contact' className={({isActive})=> isActive? 'text-orange-500 font-bold p-2 underline':'text-black'}>Contact Us</NavLink></li>
   
  </>

  const handleLogout = async() => {
    // await fetch('http://localhost:5000/logout', {
    //   method: 'POST',
    //   credentials: 'include'
    // });
    
    logOut()
    .then(()=> {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, LogOut!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "LogOut",
            text: "User Logout successfull.",
            icon: "success"
          });
        }
      });
    })
  }


  return (
    <div className='mb-10 fixed top-0 right-0 left-0 z-50 px-8'>
        <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
         {navLinks}
         <li>
          <input type="text" placeholder='serch' className='input input-bordered w-full' />
         </li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">ElectroPoint</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {navLinks}
    </ul>
    {/*serch bar */}
    <div className='relative mr-8'>
      <input type="text" placeholder='search' className='input input-bordered w-40 md:w-72 rounded-full bg-gray-100' />
      <FaSearch className='absolute right-3 top-3 '/>
    </div>
  </div>
  <div className="navbar-end flex gap-4 px-10">
    {/* admin dasboard */}
    <div className='felx items-center'>
    {/* <Link to='/dashboard' className='text-xs'>Dashboard</Link>  */}
    {
  user && !isAdminLoading && (isAdmin === true) && (
    <Link to='/dashboard' className='text-xs'>Dashboard</Link>
  )
}
{
  user && !isAdminLoading && (isAdmin === false) && (
    <Link to='/my-orders' className='text-xs'>My Orders</Link>
  )
}

    </div>
    {/* cart icon */}
    <div className='relative'>
    <NavLink to='/cart'><button className='btn p-4'><FaShoppingCart className='text-2xl text-orange-400'/></button></NavLink>
    <div className='absolute top-0 right-0 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center'>
      {cart.length}
    </div>
    </div>
    {
      user ? (
       <div className='flex items-center gap-2'>
           <FaRegCircleUser className='text-2xl text-gray-700'/>
           <span className='font-semibold text-gray-700'>{user?.displayName || 'User'}</span>
           <button onClick={handleLogout} className='btn btn-sm '>logOut</button>
       </div>
      )
      :
      (
<NavLink to='/login' ><FaRegUserCircle className='text-2xl  text-gray-700'/></NavLink>
      )
    }
  

  </div>
</div>
    </div>
  )
}

export default Navbar