import React from 'react'
import Banner from './Banner'
import PopularProduct from './PopularProduct'
import OurProducts from './OurProducts'
import Subscribe from './Subscribe'
import Testimonials from './Testimonials'

const Home = () => {
  return (
    <div>
      <Banner/>
      <PopularProduct/>
      <OurProducts/>
      <Subscribe/>
      <Testimonials/>
    </div>
  )
}

export default Home