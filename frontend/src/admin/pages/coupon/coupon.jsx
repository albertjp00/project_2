import React from 'react'
import './coupon.css'

const Coupon = () => {
  return (
    <div className="coupon-page">

    
    <div className='coupon'>
        <h3>Add Coupon</h3>
        <form  className='forms'>
            <div className="coupon-name">
                <p>Coupon Name</p>
                <input type="text" placeholder='Enter Coupon Name'  />
            </div>
            <div className="coupon-amount">
                <p>Discount value</p>
                <input type="text"  placeholder='Enter Amount'/>
            </div>
            <button className='button' type='submit'>Submit</button>
        </form>
    </div>
    <div className="show-coupon">
        <p>Coupon Name</p>
        <p>Coupon amount</p>
        <br />
        

        
    </div>

    </div>
    
  )
}

export default Coupon
