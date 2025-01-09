import React, { useState } from 'react'
import axios from 'axios'
import './register.css'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {


  const navigate  = useNavigate()

  const [data ,setData] = useState({
    name:'',
    email:'',
    password:''
  }) 

  const handleSubmit = async (e) =>{
    e.preventDefault()

    const {name,email,password} = data

    try {
      const response = await axios.post('http://localhost:2000/register',{
        name , email , password
      })

      console.log('Registration Succesfull', response.data);
      navigate('/login')
      
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
            <p>Already  have an account <Link to='/login'>Login</Link></p>
          
          </div>
    </div>
  )
}

export default Register
