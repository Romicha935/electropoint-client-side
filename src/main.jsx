import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Routes';
import AuthProviders from './providers/AuthProviders.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AOS from 'aos';
import 'aos/dist/aos.css';


const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
  
 
  <AuthProviders>
  <QueryClientProvider client={queryClient}>
   <div className='max-w-screen-xl mx-auto'>
   <RouterProvider router={router}/>
   </div>
   </QueryClientProvider>
   </AuthProviders>
 
 

     
  </StrictMode>,
)
