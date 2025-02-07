import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './list.css'
import { toast } from 'react-toastify'
import AdminNavbar from '../../components/navbar/navbar'
import {  NavLink, Routes } from 'react-router-dom'

const List = () => {

    const [list,setList] = useState([])

    const [unlisted,setShowUnlisted] = useState(false)

    const fetchList = async () =>{
        const response = await axios.get('http://localhost:2000/admin/getList')
        if(response.data.success){
           
                    
            setList(response.data.products)
            
        }else{
          toast.error('error')
        }
    }



    const unListItem   = async (foodId)=>{
      try {

        const response = await axios.post(`http://localhost:2000/admin/unlist?id=${foodId}`);
      
        toast.success("Item unlisted",{autoClose:1500})
        await fetchList()
      
      } catch (error) {
        console.log(error); 
        
      }
    }

    const listItem = async (foodId) =>{
        try {
          const response = await axios.post(`http://localhost:2000/admin/listItem?id=${foodId}`)
          toast.success("Item Listed",{autoClose:1500})
          await fetchList()
        } catch (error) {
          console.log(error);
          
        }
    }

    const filteredList = unlisted ? 
    list.filter((item)=>item.status == "unlisted") :
    list.filter((item) =>item.status == "listed")

    useEffect(()=>{
      fetchList()
    },[])


  return (
    <div className='list add flex-col'> 

    <div className="list-header">
        <p>All food list</p>
        <button className='listButton' onClick={()=>setShowUnlisted((prev)=>!prev)}>
          {unlisted ? "show listed" : "Show unlisted"}
        </button>
    </div>
    
      <div className="list-table">
      
        <div className="list-table-format-title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>price</b>
            <b>Action</b>
        
        </div>
        {filteredList.map((item,index)=>{
            return(
                <div key={index} className="list-table-format">
                    <img src={`http://localhost:2000/admin/image/`+item.image} alt="" />
                    <p>{item.name}</p>
                    <p>{item.category}</p>
                    <p>{item.price}</p>
                    
                      <div className="action">
                        <NavLink to={`/admin/dashboard/edit/${item._id}`} >
                          <button className='list-button'>Edit</button>
                        </NavLink>
                        
                        {item.status=="listed" ? (
                        <button className='list-button' onClick={()=>unListItem(item._id)}>Unlist</button>
                        ):
                        <button className='list-button' onClick={()=>listItem(item._id)}>List</button>
                        }
                      </div>
                      
                    
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default List
