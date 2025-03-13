import React, { useContext } from 'react'
import './foodDisplay.css'
import FoodItem from '../FoodItem/FoodItem'
import { StoreContext } from '../../context/storeContext'

const FoodDisplay = () => {

    const {foodList,category} = useContext(StoreContext)

    let foodLists = foodList.filter((item)=>item.status == 'listed')

    // if(!category == "All"){
    //   console.log(category);
      
    //   foodList = foodList.filter((item)=>item.category = category)
    // }

    if (category !== "All") {
      foodLists = foodLists.filter((item) => item.category === category);
    }

  return (
    <div className='food-display' id='food-display'>
      <h2>Top Dishes near you</h2>
      <div className="food-display-list">
        {foodLists.map((item,index)=>{
          // if(category==="All" || category===item.category){
            return <FoodItem key={index} id={item._id} name={item.name} description={item.description}
            price={item.price} image={item.image} />
          // }
          
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
