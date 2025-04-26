import React, { useState } from 'react'
import ProductCard from './ProductCard'
import Sidebar from './Sidebar'
import useProducts from '../../Hooks/useProducts'
import loadingAnimation from '../../assets/img/Animation - 1744302281181.json'
import Lottie from 'lottie-react'

const AllProduct = () => {
  const [products,productsLoading] = useProducts()
  console.log(products);
  
  const [selectedCategorys,setSelectedCategorys] = useState([])
    // const [products,setProducts] = useState([])

    // useEffect(()=> {
    //     fetch('http://localhost:5000/products')
    //     .then(res=> res.json())
    //     .then(data=> setProducts(data))
    // },[])
    //pagination side
    const [currentPage,setCurrentPage] = useState(1)
    const itemsPerPage = 10;

    const filterProducts = selectedCategorys.length > 0 ? products.filter(product=> selectedCategorys.includes(product.category)) 
    :
    products
    console.log(filterProducts);

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filterProducts.slice(indexOfFirstProduct, indexOfLastProduct)

    const totalPage = Math.ceil(filterProducts.length / itemsPerPage)

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber)
    }

    

    if(productsLoading){
      return (
         <div className='flex justify-center items-center min-h-screen'>
          <Lottie className='h-72 w-72' animationData={loadingAnimation} loop={true}></Lottie>
         </div>
      )
    }
  return (
    <div className='mt-10'>
    <div className='my-10 flex flex-col md:flex-row gap-10'>
        <Sidebar selectedCategorys={selectedCategorys} setSelectedCategorys={setSelectedCategorys} />
    <div className='grid grid-cols-1 md:grid-cols-3 gap-8 px-4 '>
    {
        currentProducts.map((product)=> (
          console.log(product.name),
          // console.log(currentPage),
          
           <ProductCard key={product._id} product={product}/>))
      }
    </div>

   
    </div>
     {/* pagination controls */}
     <div className='flex justify-center mt-8 my-5'>
      <button onClick={()=> handlePageChange(currentPage - 1)} disabled={currentPage ===1 } className='btn bg-orange-500 text-white py-2 px-4 rounded'>Previous</button>

      {[...Array(totalPage)].map((_,index)=>(
      <button key={index} onClick={()=> handlePageChange(index+1)} className={`py-2 px-4 mx-2 ${currentPage === index+1 ? 'bg-black text-white': 'bg-gray-200'}`}>{index + 1}</button>
      ))}
      <button onClick={()=> handlePageChange(currentPage + 1)} disabled={currentPage === totalPage} className='btn bg-gray-300 py-2 px-4 rounded-md mx-2'>Next</button>
    </div>
    </div>
  )
}

export default AllProduct