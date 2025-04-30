import React, { useContext, useEffect, useState } from 'react'
import './order.css'
import Navbar from '../../userComponents/navbar/navbar'
import { StoreContext } from '../../context/storeContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'

const Order = () => {

    const {totalAmount,foodList,cartItems,setCartItems,token,
      subtotal,setSubtotal
    } = useContext(StoreContext)

    const [data,setData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        street:"",
        city:"",
        state:"",
        zipcode:'',
        phone:""

    })

    const navigate = useNavigate()

    const location = useLocation(0)
    const {amount} = location.state  || 0


   
    

    const validate = ()=>{

        const {firstName,lastName,email,street,city,state,zipcode,phone} = data

        if(!firstName.trim()){
            toast.error("Enter Delivery Inforamtion")
            return false
        }

        if(!lastName.trim()){
            toast.error("Enter Delivery Inforamtion")
            return false
        }
        if(!email.trim()){
            toast.error("Enter Delivery Inforamtion")
            return false
        }

        if(!street.trim()){
            toast.error("Enter Delivery Inforamtion")
            return false
        }

        if(!city.trim()){
            toast.error("Enter Delivery Inforamtion")
            return false
        }

        if(!state.trim()){
            toast.error("Enter Delivery Inforamtion")
            return false
        }

        if(!zipcode.trim()){
            toast.error("Enter Delivery Inforamtion")
            return false
        }

        if(!phone.trim()){
            toast.error("Enter Delivery Inforamtion")
            return false
        }

        return true
    }

    const onChangeHandler= async (e)=>{
       
        const name = e.target.name
        const value = e.target.value
        setData(data=>({...data,[name]:value}))

    }

    const placeOrder = async (e)=>{
         e.preventDefault()

        //  if(!validate()){
        //     return
        //  }
        console.log(foodList);
        console.log(cartItems);

        if(!cartItems){
            navigate('/user/home')
        }
        
        
         let orderItems = []
         foodList.map((item)=>{
            if(cartItems[item._id]>0){
                let itemInfo = item
                
                
                itemInfo['quantity'] = cartItems[item._id]
                orderItems.push(itemInfo)
            }
         })
        //  console.log(orderItems);

        let orderData = {
            address:data,
            items:orderItems,
            amount : subtotal + 2
        }

        let response = await axios.post('http://localhost:2000/user/placeOrder',
            orderData
        )

        if(response.data.success){
            toast.success("Order Placed",{autoClose:1500})

            
            
        }
         
    }

    const handlePayment = async (e) => {


        
        
        e.preventDefault()

        try {
          // Step 1: Create an order on the backend
          

          let orderItems = []
          foodList.map((item)=>{
             if(cartItems[item._id]>0){
                 let itemInfo = item
                 
                 
                 itemInfo['quantity'] = cartItems[item._id]
                 orderItems.push(itemInfo)
             }
          })

          let orderData = {
            address:data,
            items:orderItems,
            amount : subtotal + 2
        }


          
          const response = await axios.post("http://localhost:2000/user/placeOrder", {
            orderData,
            amount: subtotal,
            headers: { Authorization: `Bearer ${token}` } ,
            t : token
          });

          const  order = response.data.order
          
    
          if (!response.data.success) {
            toast.error("Failed to create order");
            return;
          }

          
          const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;
          

        //   Configuring  Razorpay
          const options = {
            key: razorpayKey, 
            amount: response.data.order.amount,
            currency: "INR",
            name: "Your Company Name",
            description: "Test Transaction",
            order_id: response.data.razorpayOrder.id,
            handler: async function (response) {
              const verifyRes = await axios.post(
                "http://localhost:2000/user/verifyPayment",
                response,
                order
              );
    
              if (verifyRes.data.success) {
                // toast.success("Payment Successful!");
                console.log("payment success");
                
                setTimeout(()=>{
                    navigate('/user/myOrders')
                },1000)
                
              } else {
                console.log("failed");
                
                toast.error("Payment verification failed");
              }
            },
            prefill: {
              name: "Test User",
              email: "testuser@example.com",
              contact: "9999999999",
            },
            theme: {
              color: "#3399cc",
            },
          };
    
          // Step 3: Open Razorpay Checkout
          const rzp = new window.Razorpay(options);
          rzp.open();
        } catch (error) {
          console.error("Error during payment:", error);
          toast.error("Something went wrong. Please try again.");
        }
      };

    
      useEffect(() => {
        if (!token) {
          navigate('/user/login');
          return;
        }
      
        const hasItemsInCart = Object.values(cartItems).some((qty) => qty > 0);
        if (!hasItemsInCart || subtotal <= 0) {
          toast.info("Your cart is empty. Please add items to continue.");
          navigate('/user/home');
        }
      
        setSubtotal(amount);
      }, [cartItems, token, amount, subtotal, navigate]);
      



  return (
    <div className='order-page'>
      <Navbar />
      <form onSubmit={handlePayment} className="place-order">
        <div className="place-order-left">
            <p className="title">Delivery Information</p>
            <div className="multi-fields">

                <input type="text" name='firstName' value={data.firstName} 
                onChange={onChangeHandler} placeholder='First Name'/>

                <input type="text" name='lastName' value={data.lastName} 
                onChange={onChangeHandler} placeholder='Last Name' />

            </div>
            

            <input type="text" name='street' value={data.street} 
            onChange={onChangeHandler} placeholder='Street' />

            <div className="multi-fields">
                <input type="text" name='city' value={data.city} 
                onChange={onChangeHandler} placeholder='City'/>

                <input type="text" name='state' value={data.state} 
                onChange={onChangeHandler} placeholder='State' />
            </div>
            <div className="multi-fields">
                <input type="text"  name='zipcode' value={data.zipcode}
                 onChange={onChangeHandler} placeholder='Zipcode'/>
                
            </div>
            <input type="text" name='phone' value={data.phone} 
            onChange={onChangeHandler} placeholder='Phone' />            
        </div>
        <div className="place-order-right">
            <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtototal</p>
              <p>{subtotal}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <b>{subtotal+2}</b>
            </div>
            
          </div>
          <button type='submit'>Proceed to Payment</button>
        </div>
        </div>
      </form>
    </div>
  )
}

export default Order
