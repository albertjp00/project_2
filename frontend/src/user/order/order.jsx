import React, { useContext, useEffect, useState } from 'react'
import './order.css'
import Navbar from '../../userComponents/navbar/navbar'
import { StoreContext } from '../../context/storeContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Order = () => {

    const {totalAmount,foodList,cartItems} = useContext(StoreContext)

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
            amount : totalAmount + 2
        }

        let response = await axios.post('http://localhost:2000/user/placeOrder',
            orderData
        )

        if(response.data.success){
            
        }
         
    }

    
    // useEffect(()=>{
        
        
    // },[data])



  return (
    <div className='order-page'>
      <Navbar />
      <form onSubmit={placeOrder} className="place-order">
        <div className="place-order-left">
            <p className="title">Delivery Information</p>
            <div className="multi-fields">

                <input type="text" name='firstName' value={data.firstName} 
                onChange={onChangeHandler} placeholder='First Name'/>

                <input type="text" name='lastName' value={data.lastName} 
                onChange={onChangeHandler} placeholder='Last Name' />

            </div>
            <input type="email" name='email' value={data.email} 
            onChange={onChangeHandler} placeholder='Email' />

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
          <button type='submit'>Proceed to Payment</button>
        </div>
        </div>
      </form>
    </div>
  )
}

export default Order
