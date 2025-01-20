import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './list.css'
import { toast } from 'react-toastify'

const List = () => {

    const [list,setList] = useState([])

    const fetchList = async () =>{
        const response = await axios.get('http://localhost:2000/admin/getList')
        if(response.data.success){
           
                    
            setList(response.data.products)
            
        }else{
          toast.error('error')
        }
    }

    const unList = async (foodId)=>{
      const response = await axios.post(`http://localhost:2000/admin/unlist?id=${foodId}`);
      
      if(response.success){
      await fetchList()
      }
    }

    useEffect(()=>{
      fetchList()
    },[])


  return (
    <div className='list add flex-col'> 
    <p>All food list</p>
      <div className="list-table">
        <div className="list-table-format-title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>price</b>
            <b>Action</b>
        </div>
        {list.map((item,index)=>{
            return(
                <div key={index} className="list-table-format">
                    <img src={`http://localhost:2000/admin/image/`+item.image} alt="" />
                    <p>{item.name}</p>
                    <p>{item.category}</p>
                    <p>{item.price}</p>
                    <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
                    <button>Edit</button>
                    <button onClick={()=>unList(item._id)}>Unlist</button>
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default List
