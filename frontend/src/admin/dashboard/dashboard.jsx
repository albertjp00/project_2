import React from 'react'
import './dashboard.css'
import AdminNavbar from '../components/navbar/navbar'
import Sidebar from '../components/sidebar/sidebar'
import Add from '../pages/add/add'
import { Route, Routes } from 'react-router-dom'
import List from '../pages/list/list'

const Dashboard = () => {
  return (
    <div>
      <AdminNavbar />
      <div className='container'>
        <Sidebar />
        <div>
          <Routes>
            <Route path="add" element={<Add />} />
            <Route path="list" element={<List />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
