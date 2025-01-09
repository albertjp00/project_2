import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

// import './App.css'
import Login from './user/login/login'

import axios from 'axios'
import Register from './user/register/register'
import Home from './user/home/home'
import Navbar from './userComponents/navbar/navbar'

axios.defaults.baseURL = 'http://localhost:2000'
axios.defaults.withCredentials = true

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
    <div className="app">
    <BrowserRouter>
    
    
    
    <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/home' element={<Home />} />

    </Routes>

  </BrowserRouter>
    </div>

       
      
      
    </>
  )
}

export default App
