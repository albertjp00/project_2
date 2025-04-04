import React, { useContext, useEffect, useState } from 'react'
import './cart.css'
import { StoreContext } from '../../context/storeContext'
import Navbar from '../../userComponents/navbar/navbar'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Footer from '../../userComponents/footer/footer'

const Cart = () => {

  const {cartItems,foodList,removeFromCart,
    getTotalAmount,totalAmount,
    token,
    coupons,setCoupons,getCoupons,couponApplied,setCouponApplied,

    cartAmount,setCartAmount

    

  } = useContext(StoreContext)

  

  const navigate = useNavigate()
  


  const toPlaceOrder = ()=>{
    console.log("cartItem",cartItems);
    
    if(totalAmount === 0){
      toast.error("Add Items")
    }else{
      navigate('/user/order',{state:{amount:cartAmount}})
    }
  }

  const [selectedCoupon, setSelectedCoupon] = useState("");

const applyCoupon = (couponId) => {
    setSelectedCoupon(couponId);
    console.log(couponId);
    
};

const handleApplyCoupon = () => {
  if (selectedCoupon === "") {
    toast.error("Please select a coupon", { autoClose: 1500 });
    return;
  }

  if(!couponApplied){
    setCouponApplied(true)
    const coupon = coupons.find(coupon => selectedCoupon === coupon._id);
  if (!coupon) return;

  const discount = parseInt(coupon.amount);
  const updatedAmount = totalAmount - discount;

  setCartAmount(updatedAmount); 
  setCouponApplied(coupon)
  toast.success("Coupon applied successfully!", { autoClose: 1500 });
  }else{
    
  }

};


   
const removeCoupon = () => {
  setCouponApplied(false);
  setSelectedCoupon("");
  setCartAmount(totalAmount); // Reset to full amount
  toast.info("Coupon removed", { autoClose: 1500 });
};





  useEffect(()=>{
    if(!token){
      navigate('/user/login')
    }
    getCoupons
  },[token])
  
  
  return (
    <>
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

            {couponApplied && (
              <>
                <div className="cart-total-details">
                  <p>Coupon Applied</p>
                  <p onClick={removeCoupon}>Remove</p>
                </div>
                <hr />
              </>
            )}


            <div className="cart-total-details">
              <p>Total</p>
              <b>{cartAmount===0?0:cartAmount+2}</b>
            </div>
            
          </div>
          <button  onClick={()=>toPlaceOrder()}>Proceed to Checkout</button>
        
        </div>
        <div className="cart-promocode">
        {!couponApplied && totalAmount>0 && (
              <>
                <div>
        <p>select one promo code :</p>
        <div className="cart-promocode-boxes">
            {coupons.map((coupon) => (
                <div 
                    key={coupon._id} 
                    className={`coupon-box ${selectedCoupon === coupon._id ? "selected" : " "}`} 
                    onClick={() => applyCoupon(coupon._id)}
                >
                    <p>{coupon.name}</p>
                    <p>{coupon.amount} Off</p>
                    <br />

                </div>
            ))}
        </div>
        <button onClick={handleApplyCoupon}>Apply Coupon</button>
    </div> 
              </>
            )}
     
</div>


      </div>
      
    </div>
        
    </div>
    <Footer />
    </>
  )
}

export default Cart
