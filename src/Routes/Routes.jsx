import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Main from '../Layout/Main'
import Home from '../pages/Home/Home'
import AllProduct from '../pages/AllProduct/AllProduct'
import ProductDetails from '../Components/ProductDetails'
import ContactUS from '../pages/Contact/ContactUS'
import Registration from '../pages/Login/SignUp'
import Login from '../pages/Login/Login'
import SignUp from '../pages/Login/SignUp'
import Cart from '../pages/Cart/Cart'
import PrivateRoutes from './PrivateRoutes';
import DashboardLayout from '../Layout/DashboardLayout'
import DashboardHome from '../pages/DashboardHome'
import AddProducts from '../pages/Dashboard/AddProducts'
import UpdateProduct from '../pages/Dashboard/UpdateProduct'
import ManageProduct from '../pages/Dashboard/ManageProduct'
import AllUsers from '../pages/Dashboard/AllUsers'
import AllOrders from '../pages/Dashboard/AllOrders'
import SiteSetting from '../pages/Dashboard/SiteSetting'
import MyOrders from '../pages/myorders/MyOrders'
import Checkout from '../pages/checkOut/checkOut'




   export const router = createBrowserRouter([
        {
            path:'/',
            element:<Main/>,
            children:[
               {
                path:'/',
                element:<Home/>
               },
               {
                path:'/products',
                element:<AllProduct/>
               },
               {
                path:'/product/:id',
                element:<ProductDetails/>
               },
               {
                path:'/contact',
                element:<ContactUS/>
               },
               {
                path:'/signUp',
                element:<SignUp/>
               },
               {
                path:'/login',
                element:<Login/>
               },
               {
                path:'/cart',
                element:<Cart/>
               },
               {
                path:'/my-orders',
                element:<MyOrders/>
               },
               {
                path:'/checkout',
                element:<Checkout/>
               }

            ]
        },
        {
            path:'dashboard',
            element:<PrivateRoutes><DashboardLayout/></PrivateRoutes>,
            children:[
                {
                    path:'',
                    element:<DashboardHome/>
                },
                {
                    path:'add-product',
                    element:<AddProducts/>
                },
                {
                    path:'update/:id',
                    element:<UpdateProduct/>
                },
                {
                    path:'manage-product',
                    element:<ManageProduct/>
                },
                {
                    path:'all-users',
                    element:<AllUsers/>
                },
                {
                    path:'orders',
                    element:<AllOrders/>
                },
                {
                    path:'setting',
                    element:<SiteSetting/>
                }
            ]
        }
    ])


