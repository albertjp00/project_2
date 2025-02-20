import React, { useContext, useEffect } from 'react'
import './cart.css'
import { StoreContext } from '../../context/storeContext'
import Navbar from '../../userComponents/navbar/navbar'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Cart = () => {

  const {cartItems,foodList,removeFromCart,getTotalAmount,totalAmount,token} = useContext(StoreContext)

  
  const navigate = useNavigate()
  
  

  const toPlaceOrder = ()=>{
    console.log("cartItem",cartItems);
    
    if(totalAmount === 0){
      toast.error("Add Items")
    }else{
      navigate('/user/order')
    }
  }


  useEffect(()=>{
    if(!token){
      navigate('/user/login')
    }
  },[token])
  
  
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
                    <p className='remove' onClick={()=>removeFromCart(item._id)}>X</p>
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
              <p>{totalAmount===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <b>{totalAmount===0?0:totalAmount+2}</b>
            </div>
            
          </div>
          <button onClick={()=>toPlaceOrder()}>Proceed to Checkout</button>
        
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
