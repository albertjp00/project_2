import React, { useContext } from 'react'
import './cart.css'
import { StoreContext } from '../../context/storeContext'
import Navbar from '../../userComponents/navbar/navbar'

const Cart = () => {

  const {cartItems,foodList,removeFromCart} = useContext(StoreContext)
  return (
    <div className='cart'>
      <Navbar />
      <div className="cart-items">
        <div className="cart-items-title">
          <p>items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {foodList.map((item,index)=>{
          if(cartItems[item._id]>0){
            return(
              <div className="cart-items-title cart-items-item">
                <img src={item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>{item.price*cartItems[item._id]}</p>
              </div>
            )
          }
        })

        }
      </div>
      
    </div>
  )
}

export default Cart
