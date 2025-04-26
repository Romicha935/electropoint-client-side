import React, { useEffect } from "react";
// import { IoLocation } from 'react-icons/io5';
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AOS from 'aos'
import 'aos/dist/aos.css'

const Checkout = () => {
    useEffect(() => {
        AOS.init({
          duration: 1000,
          once: true, // একবারই animate করবে
        })
      }, [])
  const location = useLocation();
  const product = location.state;
  const navigate  = useNavigate()

  const handleConfirm = () => {
    Swal.fire({
        icon: 'success',
        title: 'Order Confirmed!',
        text: 'Thanks for your purchase.',
        timer: 2000,
        showConfirmButton: false
      })
      
    navigate('/my-orders')
  }
  return (
    <div className="my-10 ">
      <h2 className="text-3xl mt-10 text-center font-bold">CheckOut</h2>
      <div className="my-10 flex gap-10 justify-center ">
        <div data-aos='fade-right'>
          <img src={product.image} alt="" className="w-80 h-72 mx-auto mb-4" />
        </div>
        <div data-aos='fade-left'>
        <h3 className="text-3xl text-orange-500 font-bold">{product?.name}</h3>
        <p className="text-2xl my-2">Price: ${product?.price}</p>
        <p className="text-xl font-bold">Brand: {product.brand}</p>
        <p className="text-gray-700 font-semibold">{product.details}</p>
        <button onClick={handleConfirm} className="btn my-4 bg-orange-500 hover:bg-gray-200 hover:text-black text-white py-2 px-4">
          Confirm Order
        </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
