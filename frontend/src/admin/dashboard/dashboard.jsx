import React from 'react'
import './dashboard.css'
import AdminNavbar from '../components/navbar/navbar'
import Sidebar from '../components/sidebar/sidebar'
import Add from '../pages/add/add'
import { Route, Routes } from 'react-router-dom'
import List from '../pages/list/list'
import Edit from '../pages/edit/edit'
import Orders from '../pages/orders/orders'


const Dashboard = () => {
  return (
    <div>
      <AdminNavbar />
      <div className='container'>
        <Sidebar />
        <div className='a'>
          <Routes>
            <Route path="add" element={<Add />} />
            <Route path="list" element={<List />} />
            <Route path='edit/:id' element={<Edit />} />
            <Route path='orders' element={<Orders />}/>
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
