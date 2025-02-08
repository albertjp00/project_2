import React, { useState } from 'react'
import axios from 'axios'
import './register.css'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {


  const navigate  = useNavigate()

  const [data ,setData] = useState({
    name:'',
    email:'',
    password:''
  }) 

  const validate = () =>{

    const {name,email,password} = data
    
    

    if(!name.trim()){
      toast.error('All Fields required',{autoClose:1500})
      return false
    }

    if(!email.trim()){
      toast.error('All Fields required',{autoClose:1500})
      return false
    }

    if(!password.trim()){
      toast.error('All Fields required',{autoClose:1500})
      return false
    }

    if(password.length<6){
      toast.error("Password must be at least 6 characters long.",{autoClose:2000})
        return false
    }

    return true
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()

    if(!validate()){
      return 
    }

    const {name,email,password} = data

    try {
      const response = await axios.post('http://localhost:2000/user/register',{
        name , 
        email , 
        password
      })

      if(response.data.success){
        toast.success(response.data.message,{autoClose:1500})  
        setTimeout(()=>{
          navigate('/user/login') 
        },1500)      
        
      }else{
        toast.error(response.data.message,{autoClose:1500})
      }
      
      
    } catch (error) {
      console.log("registration",error);

    }
  }


  return (
    <div className="register">
      <div className='login-container'>
            <div className="login-title">
                <h2>Register</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="login-inputs">

                    <input type="text" name='name' value={data.name} 
                    onChange={(e)=>setData({...data, name:e.target.value})} placeholder='Enter Name' />

                    <input type="email" name='email' value={data.email} 
                    onChange={(e)=>{setData({...data, email : e.target.value})}} placeholder='Enter email'/>
                    
                    <input type="password" name='password' value={data.password} 
                    onChange={(e)=>{setData({...data, password:e.target.value})}}  placeholder='Enter password'/>


                </div>
                <div className="button-container">
                    <button className='login-button' type='submit'>Submit</button>
                </div>
                
            </form>
            <p>Already  have an account <Link to='/user/login'>Login</Link></p>
          
          </div>
    </div>
  )
}

export default Register
