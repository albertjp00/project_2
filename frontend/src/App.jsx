import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

// import './App.css'
import Login from './user/login/login'

import axios from 'axios'
import Register from './user/register/register'
import Home from './user/home/home'
import Navbar from './userComponents/navbar/navbar'


import AdminLogin from './admin/login/login'
import Dashboard from './admin/dashboard/dashboard'

axios.defaults.baseURL = 'http://localhost:2000'
axios.defaults.withCredentials = true

function App() {
  

  return (
    <>
    
    <div className="app">
 
    
    
    
    <Routes>
        <Route path='/user/login' element={<Login />} />
        <Route path='/user/register' element={<Register />}/>
        <Route path='/user/home' element={<Home />} />
    


        {/* admin */}
        
        <Route path='/admin/login' element = {<AdminLogin />}/>
        <Route path='/admin/dashboard' element={<Dashboard />}/> 
          
          
    </Routes>

        
    </div>
       
      
      
    </>
  )
}

export default App
