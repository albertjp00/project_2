import React, { useState } from 'react'
import './navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {

    const [menu,setMenu] = useState("menu")

  return (
    <div className='navbar'>
        <img src={assets.logo} alt="logo" className='navbar-logo'/>
        <ul className='navbar-menu'>
            <li onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</li>
            <li onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</li>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
            
              <img src={assets.basket_icon} alt="" />
              {/* <div className="dot"></div> */}
              
            </div>
            <button onClick={()=>setShowLogin(true)}>Sign In</button>
          </div>
    </div>
  )
}

export default Navbar
