import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
// import "leaflet/dist/leaflet.css";
// import { GoogleOAuthProvider } from '@react-oauth/google';



// import './App.css'
import Login from './user/login/login'

import axios from 'axios'

// user
import Register from './user/register/register'
import Home from './user/home/home'
import Cart from './user/cart/cart';
import Order from './user/order/order';
import MyOrders from './user/myOrders/myOrders';
import TrackOrder from './user/trackOrder/trackOrder';



// admin
import AdminLogin from './admin/login/login'
import Dashboard from './admin/dashboard/dashboard'








axios.defaults.baseURL = 'http://localhost:2000'
axios.defaults.withCredentials = true

function App() {
  
  const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID

  return (
    <>
    {/* <GoogleOAuthProvider clientId={client_id}> */}
      <div className="app">
      <ToastContainer />
      
      
      
      <Routes>
          <Route path='/user/login' element={<Login />} />
          <Route path='/user/register' element={<Register />}/>
          <Route path='/user/home' element={<Home />} />
          <Route path='/user/cart' element={<Cart/>}/>
          <Route path='/user/order' element={<Order />}/>
          <Route path='/user/myOrders' element={<MyOrders />}/>
          <Route path='/user/trackOrder' element={<TrackOrder />}/>
      


          {/* admin */}

          <Route path='/admin/login' element = {<AdminLogin />}/>
          <Route path='/admin/dashboard/*' element={<Dashboard />}/> 

          {/* <Route path='/admin/add' element={<Add/>}/>
          <Route path='/admin/list' element={<List/>}/> */}
            
            
      </Routes>

        
    </div>
    {/* </GoogleOAuthProvider> */}
       
      
      
    </>
  )
}

export default App
