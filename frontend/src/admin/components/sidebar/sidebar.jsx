import React from 'react'
import './sidebar.css'
import { AdminAssets } from '../../../adminAssets/assets'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <div className="sidebar-option">
                <img src={AdminAssets.order_icon} alt="" />
                <p>Add Items</p>
            </div>
            <div className="sidebar-option">
                <img src={AdminAssets.order_icon} alt="" />
                <p>List Items</p>
            </div>
            <div className="sidebar-option">
                <img src={AdminAssets.order_icon} alt="" />
                <p>Orders</p>
            </div>
        </div>
      
    </div>
  )
}

export default Sidebar
