import React from 'react'
import './sidebar.css'
import { AdminAssets } from '../../../adminAssets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink  to="/admin/dashboard/add"  className="sidebar-option">
                <img src={AdminAssets.order_icon} alt="" />
                <p>Add Items</p>
            </NavLink>
            <NavLink to="/admin/dashboard/list" className="sidebar-option">
                <img src={AdminAssets.order_icon} alt="" />
                <p>List Items</p>
            </NavLink>
            <NavLink to='/admin/dashboard/orders' className="sidebar-option">
                <img src={AdminAssets.order_icon} alt="" />
                <p>Orders</p>
            </NavLink>
            <NavLink to='/admin/dashboard/coupon' className='sidebar-option'>
                <img src={AdminAssets.order_icon} alt="" />
                <p>Coupon</p>
            </NavLink>
        </div>
      
    </div>
  )
}

export default Sidebar
