import React from 'react'
import { FaPhone, FaVoicemail } from 'react-icons/fa'
import { FaMapLocation } from 'react-icons/fa6'
import { IoLocation } from 'react-icons/io5'
import { MdEmail } from 'react-icons/md'

const ContactUS = () => {
  return (
<div className='min-h-screen my-10  p-5 md:p-10'>
      <h2 className='text-3xl font-bold text-center text-orange-500 mb-8'>Contact Us</h2>

      <div className='grid md:grid-cols-2 gap-10 max-w-5xl mx-auto bg-white p-6 shadow rounded-lg'>

        {/* Contact Form */}
        <form className='space-y-4'>
          <input type="text" placeholder="Your Name" className=" bg-gray-100 input input-bordered w-full" required />
          <input type="email" placeholder="Your Email" className="bg-gray-100 input input-bordered w-full" required />
          <input type="text" placeholder="Subject" className="bg-gray-100 input input-bordered w-full" />
          <textarea placeholder="Your Message" className="bg-gray-100 textarea textarea-bordered w-full h-32" required />
          <button className='btn bg-orange-500 text-white hover:bg-orange-600'>Send Message</button>
        </form>

        {/* Contact Info */}
        <div className='space-y-4 text-gray-700'>
          <p className='flex items-center gap-2'><IoLocation className='text-orange-500 text-2xl'/> <span><strong className=' '> Address:</strong></span> Rangpur, Bangladesh</p>
          <p className='flex items-center gap-2'><FaPhone className='text-orange-500 text-2xl'/> <span><strong>Phone:</strong></span> +880 1234-567890</p>
          <p className='flex items-center gap-2'><MdEmail className='text-orange-500 text-2xl'/> <span><strong> Email:</strong></span> info@electropoint.com</p>
          <p>We are always here to help you. Send us your queries anytime!</p>
        </div>

      </div>
    </div>
  )
}

export default ContactUS