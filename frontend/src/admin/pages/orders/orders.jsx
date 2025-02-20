import React, { useEffect, useState } from 'react'
import './orders.css'
import AdminNavbar from '../../components/navbar/navbar'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../../assets/assets'

const Orders = () => {

    const [orders,setOrders] = useState([])

    const fetchOrders = async ()=>{
        // console.log("order page");
        
        let response = await axios.get('http://localhost:2000/admin/listOrders')

        if(response.data.success){
            setOrders(response.data.orders)
            console.log(response.data.orders);
            
        }else{
            toast.error("Something went wrong")
        }
    }

    const updateStatus = async (e, orderId) => {
    try {
        let newStatus = e.target.value;

        let response = await axios.post('http://localhost:2000/admin/updateStatus', {
            orderId,
            status: newStatus
        });

        if (response.data.success) {
            toast.success(response.data.message);

            // ✅ Correctly update state
            
            setOrders((prevData) =>
                prevData.map((order) =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                )
            );
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        console.error("Error updating status:", error);
        toast.error("Failed to update order status");
    }
};



    useEffect(()=>{
        fetchOrders()
        console.log(orders);
        
    },[])
  return (
    <div className='order add'>
        <h3>Order Page</h3>
        <div className="order-list">
            {orders.map((order,index)=>(
                <div key={index} className="order-item">
                    <img src={assets.parcel_icon}  alt="" />
                    <div>
                        <p className='order-item-food'>
                            {order.items.map((item,index)=>{
                                if(index == order.items.length-1){
                                    return item.name + " x " + item.quantity
                                }else{
                                    return item.name + " X " + item.quantity + ", "
                                }
                            })}
                        </p>
                        <p className='order-item-name'>{order.address.firstName+" "+order.address.lastName}</p>
                        <div className='order-item-address'>
                            <p>{order.address.street + " ,"}</p>
                            <p>{order.address.city+" ," +order.address.state + " , India " + order.address.zipcode }</p>
                        </div>
                        <p className='order-item-phone'>{order.items.phone}</p>
                    </div>
                    <p>Items : {order.items.length}</p>
                    <p>${order.amount}</p>
                    <select onChange={(e)=>{updateStatus(e,order._id)}} value={order.status}>
                        <option value="Food Processing">Food Processing</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Orders
