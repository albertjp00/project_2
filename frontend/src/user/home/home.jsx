import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../userComponents/navbar/navbar'
import './home.css'
import Header from '../../userComponents/header/header'
import FoodDisplay from '../../userComponents/FoodDisplay/FoodDisplay'
import Menu from '../../userComponents/exploreMenu/exploreMenu'
import Footer from '../../userComponents/footer/footer'
import Chatbot from '../../userComponents/chatbot/chatbot'
import { StoreContext } from '../../context/storeContext'
import { useNavigate } from 'react-router-dom'


const Home = () => {

  const [category,setCategory] = useState("All")

  const {token } = useContext(StoreContext)
  
  const navigate = useNavigate()

  useEffect(()=>{
    if(!token){      
      navigate('/user/login')
    }
  },[token])
  return (
    <>
    <div className='home'>
        <Navbar />
        <Header />
        <Menu category={category} setCategory={setCategory}/>

        <FoodDisplay />
        <Chatbot />
        
    </div>
    <Footer />
    </>
  )
}

export default Home
