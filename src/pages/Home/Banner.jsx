import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
import img1 from '../../assets/img/iphone-removebg-preview.png'
import img2 from '../../assets/img/laptop-removebg-preview.png'
import img3 from '../../assets/img/dekstop-removebg-preview.png'
import img4 from '../../assets/img/watch-removebg-preview.png'
import img5 from '../../assets/img/drone-removebg-preview.png'
import { useNavigate } from 'react-router-dom';
import useAuth from './../../Hooks/useAuth';

const Banner = () => {
  const {user} = useAuth()
  const navigate = useNavigate()
  const handleBuyNow = (product) => {
    if(!user){
      navigate('/login');
      return;
    }
    navigate('/checkout', {state:product})
  }
  return (
    <div className='bg-gray-200'>
      
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
      {/* iPhone */}
      <div className="flex items-center justify-center h-[500px] px-10 bg-gray-200">
          <div className="mr-8 text-left">
            <h1 className="text-3xl font-bold text-gray-800">iPhone - Best Smartphone</h1>
            <p className="text-lg text-gray-600">Get 20% discount on this amazing iPhone. Limited offer!</p>
            <button onClick={()=> handleBuyNow({
              name: "iPhone",
              price: `${899}`,
              image: img1,
              description: "Get 20% discount on this amazing iPhone. Limited offer!"
          
            })} className='btn mt-4 px-6 py-2 bg-orange-500 text-white hover:bg-orange-600 '>Buy Now</button>
          </div>
          <img src={img1} className="max-w-[300px] max-h-[400px]" alt="iPhone" />
        </div>

        {/* Laptop */}
        <div className="flex items-center justify-center h-[500px] px-10">
          <div className="mr-8 text-left">
            <h1 className="text-3xl font-bold text-gray-800">Powerful Laptop</h1>
            <p className="text-lg text-gray-600">Latest high-performance laptop for your daily needs.</p>
            <button onClick={()=> handleBuyNow({
               name: "Laptop",
               price: `${899}`,
               image: img2,
               description: "Get 20% discount on this amazing iPhone. Limited offer!"
            })} className='btn mt-4 px-6 py-2 bg-orange-500 text-white hover:bg-orange-600 '>Buy Now</button>
          </div>
          <img src={img2} className="max-w-[300px] max-h-[400px]" alt="Laptop" />
        </div>

        {/* Desktop */}
        <div className="flex items-center justify-center h-[500px] px-10 ">
          <div className="mr-8 text-left">
            <h1 className="text-3xl font-bold text-gray-800">High-End Desktop</h1>
            <p className="text-lg text-gray-600">Ideal for gaming and professional workstations.</p>
            <button onClick={()=> handleBuyNow({
               name: "Dekstop",
               price: `${899}`,
               image: img3,
               description: "Get 20% discount on this amazing iPhone. Limited offer!"
            })} className='btn mt-4 px-6 py-2 bg-orange-500 text-white hover:bg-orange-600 '>Buy Now</button>
          </div>
          <img src={img3} className="max-w-[300px] max-h-[400px]" alt="Desktop" />
        </div>

        {/* Smart Watch */}
        <div className="flex items-center justify-center h-[500px] px-10">
          <div className="mr-8 text-left">
            <h1 className="text-3xl font-bold text-gray-800">Smart Watch</h1>
            <p className="text-lg text-gray-600">Track your fitness and stay connected on the go.</p>
            <button onClick={()=> handleBuyNow({
               name: "Smart Watch",
               price: `${899}`,
               image: img4,
               description: "Get 20% discount on this amazing iPhone. Limited offer!"
            })} className='btn mt-4 px-6 py-2 bg-orange-500 text-white hover:bg-orange-600 '>Buy Now</button>
          </div>
          <img src={img4} className="max-w-[300px] max-h-[400px]" alt="Smart Watch" />
        </div>

        {/* Drone */}
        <div className="flex items-center justify-center h-[500px] px-10 ">
          <div className="mr-8 text-left">
            <h1 className="text-3xl font-bold text-gray-800">4K Drone Camera</h1>
            <p className="text-lg text-gray-600">Capture stunning aerial shots with this advanced drone.</p>
            <button onClick={()=> handleBuyNow({
               name: "Drone",
               price: `${899}`,
               image: img5,
               description: "Get 20% discount on this amazing iPhone. Limited offer!"
            })} className='btn mt-4 px-6 py-2 bg-orange-500 text-white hover:bg-orange-600 '>Buy Now</button>
          </div>
          <img src={img5} className="max-w-[300px] max-h-[400px]" alt="Drone" />
        </div>
        </Carousel>
    </div>
  )
}

export default Banner