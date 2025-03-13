import React, { useContext, useState } from 'react'
import './exploreMenu.css'
import { StoreContext } from '../../context/storeContext'
import { menu_list } from '../../assets/assets'


const Menu = () => {


  const {foodList,category,setCategory} = useContext(StoreContext)

  

  // const  menuList = ['salad',"rolls","desert","sandwich","cake","pure veg","pasta","noodles"]

  



  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>Choose from diverse menu featuring a delectable array of dishes crafted with the finest </p>
        <div className="explore-menu-list"> 
            {menu_list.map((item,index)=>{
                return (
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-item">
                      
                        <img className={category==item.menu_name?"active":""} src={item.menu_image} alt="" /> 
                        <p>{item.menu_name}</p>
                    </div>

                )
            })}
        </div>
    </div>
  )
}

export default Menu
