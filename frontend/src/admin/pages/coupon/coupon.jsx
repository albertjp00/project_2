import React, { useContext, useState } from 'react'
import './coupon.css'
import { toast } from 'react-toastify'
import axios from 'axios'
import  { StoreContext } from '../../../context/storeContext'

const Coupon = () => {
    const [coupon,setCoupon] = useState({
        name:"",
        amount :""
    })

    const {coupons  } = useContext(StoreContext)
    console.log(coupons);
    

    const onChangeHandler = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setCoupon((prev)=>({...prev,[name]:value}))
    }

    const validate =()=>{

        const {name,amount} = coupon

        const parsedAmount = Number(amount); 

        if(!name.trim()){
            toast.error("Coupon code is required") 
            return false
        }
        if(!amount ||  !Number.isInteger(parsedAmount) || parsedAmount < 0){
            toast.error("amount is incorrect")
            return false
        }

        return true

    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if(!validate()){
            return
        }
    
        if (!coupon.name || !coupon.amount) {
            toast.error("All fields are required!");
            return;
        }
    
        
    
        
    
        try {
            let response = await axios.post('http://localhost:2000/admin/addCoupon',{
                name:coupon.name,
                amount:coupon.amount
        });
    
            if (response.data.success) {
                toast.success("Coupon added successfully!",{autoClose:1500});
                setCoupon({ 
                    name: "", 
                    amount: "" 
                });
            }else{
                toast.error(response.data.message,{autoClose:1500})
            }
        } catch (error) {
            toast.error("Failed to add coupon!");
            console.error("Error:", error);
        }
    };


    const deleteCoupon = async (name,amount)=>{

        console.log(name,amount);
        
        // let response = await axios.post('http://localhost:2000/admin/DeleteCoupon')

    }
    

  return (
    <div className="coupon-page">

    
    <div className='coupon'>
        <h3>Add Coupon</h3>
        <form onSubmit={onSubmitHandler}  className='forms'>
            <div className="coupon-name">
                <p>Coupon Code</p>
                <input type="text" name='name' onChange={onChangeHandler} value={coupon.name}  placeholder='Enter Coupon Code'  />
            </div>
            <div className="coupon-amount">
                <p>Discount value</p>
                <input type="text" name='amount' onChange={onChangeHandler} value={coupon.amount}  placeholder='Enter Amount'/>
            </div>
            <button className='button' type='submit'>Submit</button>
        </form>
    </div>
    <div className="show-coupon">
        <div className="coupon-header">
            <p>Coupon Name</p>
            <p>Coupon amount</p>
            <p>Action</p>
        </div>
        <br />
        <hr />
        {coupons.map((coupon,index)=>{
            return(
                <div key={index} className="coupon-data">
                        <p>{coupon.name}</p>
                        <p>{coupon.amount}</p>
                        <button onClick={()=>deleteCoupon(coupon._id)}>Delete</button>
                    
                </div>
                
            
            )
        })}
    </div>

    </div>
    
  )
}

export default Coupon
