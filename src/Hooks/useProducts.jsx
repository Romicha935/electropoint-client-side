import { useQuery } from '@tanstack/react-query'
// import React, { useEffect, useState } from 'react'
// import { GiToken } from 'react-icons/gi'

const useProducts = () => {
    // const [products,setProducts] = useState([])
    // const [productsLoading,setProductsLoading] = useState(true)


        // const token = localStorage.getItem('access-token')
        // console.log(token); // এটি console-এ টোকেন দেখাবে

        const {data: products=[], isLoading: productsLoading, refetch} = useQuery({
            queryKey: ['products'],
            queryFn: async()=>{
             const res = await fetch('https://electropoint-server-side.vercel.app/products',{
                method: 'GET',
                 
                  credentials:'include'
                  
              })
              const data = await res.json()
              if(!Array.isArray(data)){
                throw new Error('unexpected data formate')
                
              }
              return data
            }
        })
       
      
      

  return [products,productsLoading,refetch]
}

export default useProducts