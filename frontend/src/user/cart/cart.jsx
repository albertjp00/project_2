import React, { useContext } from 'react'
import './cart.css'
import { StoreContext } from '../../context/storeContext'
import Navbar from '../../userComponents/navbar/navbar'

const Cart = () => {

  const {cartItems,foodList,removeFromCart,getTotalAmount,totalAmount} = useContext(StoreContext)

  
  
  
  
  return (
    <div className="navbar-cart">
      <Navbar />
   
    <div className='cart'>
      
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
              return (
                <div key={index}>
                  <div key={index} className="cart-items-title cart-items-item">
                    <img className="cart-item-image" src={`http://localhost:2000/user/image/${item.image}`} alt="" />
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>{item.price*cartItems[item._id]}</p>
                    <p onClick={()=>removeFromCart(item._id)}>X</p>
                  </div>
                  <hr />  
                </div>          
              )
            }
        })}
        
        
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtototal</p>
              <p>{totalAmount}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <b>{totalAmount+2}</b>
            </div>
            
          </div>
          <button>Proceed to Checkout</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have promo code enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promo code' />
              <button>submit</button>
            </div>
          </div>
        </div>
      </div>
      
    </div>

    </div>
  )
}

export default Cart
