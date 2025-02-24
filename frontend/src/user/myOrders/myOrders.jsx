import React, { useContext, useEffect, useState } from 'react'
import './myOrders.css'
import Navbar from '../../userComponents/navbar/navbar'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/storeContext'
import { useNavigate } from 'react-router-dom'
import {io} from 'socket.io-client'



const socket = io("http://localhost:2000", {
    transports: ["websocket", "polling"]  
});

const MyOrders = () => {

    const [data,setData] = useState([])

    const {token} = useContext(StoreContext)

    const navigate = useNavigate()
 
    const fetchOrders = async ()=>{
        let response = await axios.get(`http://localhost:2000/user/myOrders?t=${token}`)

        if(response.data.success){
            setData(response.data.orders)
            console.log(response.data.orders);
            
        }else{
            toast.error('Something went wrong')
        }
    }

    useEffect(()=>{
        if(!token){
            navigate("/user/login")
            return
        }

        socket.connect()
        fetchOrders()
        
        console.log("Listening for order updates...");
        
        socket.on("updatedStatus",(updatedOrder)=>{
            console.log("Received update:", updatedOrder);
            setData((prevData)=>
                prevData.map((order)=>
                    order._id === updatedOrder._id ? updatedOrder : order
                )
            )
        })

        return ()=>{
            socket.off("updatedStatus")
            socket.disconnect()
        }
        
    },[token])

  return (
    <div className='orders-page'>
      <Navbar />
      <div className="my-orders">
        <h2>My Orders</h2>
        <div className="container">
            {data.map((order,index)=>{
                return(
                    
                    
                    <div key={index} className="my-orders-order">
                       
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item,index)=>{
                            
                            
                            if(index === order.items.length-1){
                                return item.name + " X " + item.quantity
                            }else{
                                return item.name+ " X " + item.quantity+ ", " 
                            }
                        })}</p>
                        <p>${order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                        <button>Track Order</button>
                    </div>
                )
            })}
        </div>
      </div>
    </div>
  )
}

export default MyOrders
