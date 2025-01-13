import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

// import './App.css'
import Login from './user/login/login'

import axios from 'axios'
import Register from './user/register/register'
import Home from './user/home/home'


import AdminLogin from './admin/login/login'
import Dashboard from './admin/dashboard/dashboard'
import Add from './admin/pages/add/add'
import List from './admin/pages/list/list'

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
        <Route path='/admin/dashboard/*' element={<Dashboard />}/> 

        {/* <Route path='/admin/add' element={<Add/>}/>
        <Route path='/admin/list' element={<List/>}/> */}
          
          
    </Routes>

        
    </div>
       
      
      
    </>
  )
}

export default App
