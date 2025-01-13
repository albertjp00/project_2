import React, {  useState } from 'react'
import './add.css'
import { AdminAssets } from '../../../adminAssets/assets'
import AdminNavbar from '../../components/navbar/navbar'
import Sidebar from '../../components/sidebar/sidebar'
import axios from 'axios'

const Add = () => {

    const [image,setImage] = useState(false)

    const [data,setData] = useState({
        name:"",
        description:"",
        price:"",
        category:"Salad"
    })

    const onChangeHandler = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setData((data)=>({...data,[name]:value}))
    } 

    const onSubmitHandler = async  (e)=>{
        e.preventDefault()

        const formData = new FormData()
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image",image)

        const response = await axios.post('/http://localhost:2000/admin')
    }

  return (
    

    <div className='add'>
        <form onSubmit={onSubmitHandler} className="flex-col">
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):AdminAssets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
            </div>
            <div className="add-product-name flex-col">
                <p>Product Name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
            </div>
            <div className="add-product-description flex-col">
                <p>Product Description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product Category</p>
                    <select onChange={onChangeHandler} name="category">
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Desert">Desert</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles </option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Product Price</p>
                    <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder='$20' />
                </div>
                
            </div>
            <button type='submit' className='add-button'>Add</button>
        </form>
      
    </div>
  )
}

export default Add
