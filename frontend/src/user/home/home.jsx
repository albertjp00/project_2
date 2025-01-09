import React, { useState } from 'react'
import Navbar from '../../userComponents/navbar/navbar'
import './home.css'
import Header from '../../userComponents/header/header'
import FoodDisplay from '../../userComponents/FoodDisplay/FoodDisplay'
import Menu from '../../userComponents/exploreMenu/exploreMenu'


const Home = () => {

  const [category,setCategory] = useState("All")
  return (
    <div>
        <Navbar />
        <Header />
        <Menu category={category} setCategory={setCategory}/>

        <FoodDisplay />
    </div>
  )
}

export default Home
