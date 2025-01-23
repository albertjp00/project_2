import React, { useState } from 'react'
import './navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'


const Navbar = () => {

    const [menu,setMenu] = useState("menu")

  return (
    <div className='navbar'>
        <img src={assets.logo} alt="logo" className='navbar-logo'/>
        <ul className='navbar-menu'>
            <Link to="/user/home"><li onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</li></Link>
            <li onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</li>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
            
              <Link to='/user/cart'><img src={assets.basket_icon} alt="" /></Link>
              {/* <div className="dot"></div> */}
              
            </div>
            <button onClick={()=>setShowLogin(true)}>Sign In</button>
          </div>
    </div>
  )
}

export default Navbar
