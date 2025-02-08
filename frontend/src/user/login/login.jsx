import React, { useState } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'



const Login = () => {

  const navigate = useNavigate()

  const [data,setData] = useState({
    email:'',
    password:''
  })

  const validate = ()=>{

    const {email,password} = data

    if(!email || !password){
      toast.error("All fileds required",{autoClose:1500})
      return false
    }

    return true
    
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()

    if(!validate()){
      return
    }
    
    const {email,password} = data

    try {
      const response = await axios.post('http://localhost:2000/user/login',{
      email,password
    })
    
    if(response.data.success){
      toast.success("Login Succesfull",{autoClose:1500})
      setTimeout(()=>{
        navigate('/user/home')
      },1500)
    }else{
      
      
      toast.error(response.data.message,{autoClose:1500})
    }
    

    

    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className="login">
      

          <div className='login-container'>
            <div className="login-title">
                <h2>Login</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="login-inputs">
                    <input type="email" placeholder='Enter email' value={data.email} name='email'
                    onChange={(e)=>{setData({...data, email:e.target.value})}}/>


                    <input type="password"  placeholder='Enter password' value={data.password}
                    onChange={(e)=>{setData({...data, password:e.target.value})}} />


                </div>
                <div className="button-container">
                    <button className='login-button' type='submit'>Submit</button>
                </div>
                
            </form>
            <p>Dont have an account <Link to='/user/register'>Register</Link></p>
          
          </div>
        
    </div>
  )
}

export default Login
