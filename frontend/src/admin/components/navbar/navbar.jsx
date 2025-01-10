import React from 'react'
import './navbar.css'
import { AdminAssets } from '../../../adminAssets/assets'

const AdminNavbar = () => {
  return (
    <div className='navbar'>
      <img src={AdminAssets.logo} className='logo' alt="" />
      <div className='navbar-line'></div>
    </div>
  )
}

export default AdminNavbar
