import React, { useContext, useState } from 'react'
import './navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/storeContext'


const Navbar = () => {

    const [menu,setMenu] = useState("home")

    const {token,setToken} = useContext(StoreContext)

    const logout = async ()=>{
      
      localStorage.removeItem("token")
        setToken("")
    }

  return (
    <div className='navbar'>
        <img src={assets.logo} alt="logo" className='navbar-logo'/>
        <ul className='navbar-menu'>
            <Link to="/user/home"><li onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</li></Link>
            <li onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</li>
            <li onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact-us</li>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
            
              <Link to='/user/cart'><img src={assets.basket_icon} alt="" /></Link>
              {/* <div className="dot"></div> */}
              
              
            </div>
            <Link to='/user/myOrders'><img className='parcel-icon' src={assets.parcel_icon} alt="" /></Link>

            <button onClick={()=>logout()}>Sign Out</button>


          </div>
    </div>
  )
}

export default Navbar
