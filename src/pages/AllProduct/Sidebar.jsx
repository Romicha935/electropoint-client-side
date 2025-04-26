import React from 'react'

const Sidebar = ({selectedCategorys,setSelectedCategorys}) => {
    const categories = [
        'Phone',
        'Laptop',
        'SmartWatch',
        'Camera',
        'Drone',
        'Headphones',
        'Speakers',
        'Televisions',
        'Audio Systems',
        'Projectors',
        'Mice',
        'Printers',
        'Scanners',
        'Keyboards'
      ]
      // const handleCheckboxChange = e => {
      //   const value = e.target.value;
      //   if(e.target.checked){
      //     setSelectedCategorys(prev=> [...prev, value] )
      //   }
      //   else{
      //     setSelectedCategorys(prev=> prev.filter(category=> category !== value) )
      //   }
      // }
    const handleCheckboxChange = e => {
      const value  = e.target.value;
       if(e.target.checked){
        setSelectedCategorys(prev=> [...prev,value])
       }
       else{
        setSelectedCategorys(prev=> prev.filter(category=> category !==value))
       }
    }
      
  return (
    <div className='w-1/3 sticky top-24 h-[calc(100vh-6rem)] overflow-auto p-4 shadow rounded'>
        <h2 className='text-2xl text-gray-700 font-bold'>Select Category</h2>
        <ul  className='space-y-2'>
           {
            categories.map((category,idx)=> (
              <li key={idx} className='flex items-center gap-3 text-gray-700 text-lg font-semibold'>
                <input onChange={handleCheckboxChange} checked={selectedCategorys.includes(category)} type="checkbox" id='category' name='category' value={category}  className='w-5 h-5 text-white accent-orange-5' />
                <label className='cursor-pointer '>
                    {category}
                </label>
              </li>
            ))
        }
        </ul>
    </div>
  )
}

export default Sidebar