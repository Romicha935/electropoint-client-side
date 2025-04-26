import React, { useState } from 'react'

const SiteSetting = () => {
  const [settingsData,setSettingsData] = useState({
    siteName: "",
    tagline: "",
    logoUrl: "",
    favicon: "",
    supportEmail: "",
    contactNumber: "",
    address: "",
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: "",
    primaryColor: "#000000",
    secondaryColor: "#ffffff",
    footerText: "",
    maintenanceMode: false,
    maintenanceMessage: ""

  })
  const handleChange = (e) => {
      const {name,type,value,checked} = e.target;
      const newValue = type=== "checkbox" ?  checked:value;
      setSettingsData({...settingsData, [name]: newValue})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/settings',{
      method:"POST",
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify(settingsData),
      credentials:'include'
    })
    .then(res=>res.json())
    .then(data=> {
      console.log('data saved',data);
      
    })
  }
  return (
    <form onSubmit={handleSubmit}>
        <h2 className='text-2xl font-bold text-center mb-6'>Site Setting</h2>
        {/* site info */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
          <div>
          <label className='block font-medium'>Site Neme</label>
          <input name='siteName' onChange={handleChange} type="text" className='w-full border rounded p-2' placeholder='enter site name' />
          </div>
          <div>
          <label className='block font-medium'>Tagline</label>
          <input name='tagline' onChange={handleChange} type="text" className='w-full border rounded p-2' placeholder='sort description' />
          </div>
          <div>
          <label className='block font-medium'>Logo</label>
          <input name='logoUrl' onChange={handleChange} type="file" className='w-full border rounded p-2'  />
          </div>
          <div>
          <label className='block font-medium'>Favicon</label>
          <input name='favicon' onChange={handleChange} type="text" className='w-full border rounded p-2' />
          </div>
        </div>

        {/* contact info */}
        <h3 className='text-xl font-semibold mb-2'>Contact info</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
            <input name='email' onChange={handleChange} type="email" className='border rounded p-2' placeholder='Your email'/>
            <input name='contactNumber' onChange={handleChange} type="number" className='border rounded p-2' placeholder='Phone Number'/>
            <input name='address' onChange={handleChange} type="text" className='border rounded p-2 col-span-2' placeholder='Address'/>
        </div>

        {/* social media links */}
        <h3 className='text-xl font-semibold mb-6'>Social Media Links</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
          <input name='facebook' onChange={handleChange } type="url" className='border rounded p-2' placeholder='facebook url' />
          <input name='instagram' onChange={handleChange } type="url" className='border rounded p-2' placeholder='instagram url' />
          <input name='twitter' onChange={handleChange } type="url" className='border rounded p-2' placeholder='twiter url' />
          <input name='youtube' onChange={handleChange } type="url" className='border rounded p-2' placeholder='Youtube url' />
        </div>

        {/* them setting */}
        <h3 className='text-xl font-semibold mb-6'>Theme</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
            <input name='primaryColor' onChange={handleChange} type="color" className='border rounded p-2' title='Primary Color'/>
            <input name='secondaryColor' onChange={handleChange} type="color" className='border rounded p-2' title='Secondary Color'/>
        </div>
        {/* fotter */}
        <h3 className='text-xl font-semibold mb-6'>Footer</h3>
        <textarea name='footerText' onChange={handleChange} className='border rounded p-2 mb-6 w-full ' rows='3' placeholder='Enter footer text here' id=""></textarea>

        {/* maintance mode */}
        <div className='mb-6'>
            <label className='inline-flex items-center gap-2'>
                <input name='maintanceMode' onChange={handleChange} type="checkbox"className='form-checkbox' name="" id="" /> Enable Maintance Mode
            </label>
            <textarea name='maintanceMessage' onChange={handleChange} className='border rounded p-2 mb-6 w-full ' rows='2' placeholder='Maintance Message' id=""></textarea>
        </div>
        {/* submit button */}
        <div className='text-center'>
            <button type='submit' className='bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600'>Save Setting</button>
        </div>
    </form>
  )
}

export default SiteSetting