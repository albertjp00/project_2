  import React, { useContext, useEffect, useState } from 'react'
  import './cart.css'
  import { StoreContext } from '../../context/storeContext'
  import Navbar from '../../userComponents/navbar/navbar'
  import { useNavigate } from 'react-router-dom'
  import { toast } from 'react-toastify'
  import Footer from '../../userComponents/footer/footer'
  import axios from 'axios'

  const Cart = () => {

    const {cartItems,foodList,addToCart,removeFromCart,
      getTotalAmount,totalAmount,
      token,
      coupons,setCoupons,getCoupons,couponApplied,setCouponApplied,

      cartAmount,setCartAmount,

      

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

  const [appliedCoupon,setAppliedCoupon] = useState({})

  const loadCoupon = async () => {
    try {
      const response = await axios.get(`http://localhost:2000/user/cart?t=${token}`);
      
      if (response.data.success) {
        const cartData = response.data.cartData;

        if (cartData.length > 0 && cartData[0].coupon) {
          setCouponApplied(true);
          setAppliedCoupon(cartData[0].coupon);

          setCartAmount(totalAmount - cartData[0].coupon.amount)
        } else {
          setCouponApplied(false);
          setAppliedCoupon({});
        }
      }

    } catch (error) {
      console.error("Error loading coupon:", error);
    }
  };

  
    


  const handleApplyCoupon = async () => {
    if (selectedCoupon === "") {
      toast.error("Please select a coupon", { autoClose: 1500 });
      return;
    }

    if(!couponApplied){
      setCouponApplied(true)

      

      const coupon = coupons.find(coupon => selectedCoupon === coupon._id);
    if (!coupon) return;

    let response = await axios.post('http://localhost:2000/user/applyCoupon',{
      couponId:coupon._id,
      t:token
    })

    

    // const discount = parseInt(coupon.amount);
    // const updatedAmount = totalAmount - discount;

    // setCartAmount(updatedAmount); 
    setCouponApplied(true)
    setAppliedCoupon(coupon)
    if(response.data.success){
    toast.success("Coupon applied successfully!", { autoClose: 1500 });
    }
  }

  };


    
  const removeCoupon = async () => {

    const response = await axios.post('http://localhost:2000/user/removeCoupon',{
      t:token,
      coupon:appliedCoupon
    })

    if(response.data.success){

    setCouponApplied(false);       // reset boolean
    setAppliedCoupon({});          // reset object
    setSelectedCoupon("");         
    setCartAmount(totalAmount);    // recalculate
    toast.info("Coupon removed", { autoClose: 1500 });
    }
  };
  




    useEffect(()=>{
      if(!token){
        navigate('/user/login')
      }
      // getCoupons

      
    
      loadCoupon()
      
      
      

    },[])

    useEffect(() => {
      if (couponApplied && appliedCoupon?.amount) {
        setCartAmount(totalAmount - appliedCoupon.amount);
      } else {
        setCartAmount(totalAmount);
      }
    }, [totalAmount, appliedCoupon, couponApplied]);
    
    
    
    
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
                      <div className="quantity-control">
                        <button onClick={() => removeFromCart(item._id)}>-</button>
                        <span>{cartItems[item._id]}</span>
                        <button onClick={() => addToCart(item._id)}>+</button>
                      </div>

                      <p>{item.price*cartItems[item._id]} </p>
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
          {!couponApplied && totalAmount>40 && (
                <>
                  <div>
          <p>Apply Coupon :</p>
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
