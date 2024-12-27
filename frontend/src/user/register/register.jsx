import React, { useState } from 'react'
import axios from 'axios'
import './register.css'
import { Link } from 'react-router-dom'

const Register = () => {

  const [data ,setData] = useState({
    name:'',
    email:'',
    password:''
  }) 

  const handleSubmit = async (e) =>{
    e.preventDefault()

    const {name,email,password} = data

    console.log(name,email,password);
    
    try {
      const response = await axios.post('http://localhost:5000/register',{
        name , email , password
      })
    } catch (error) {
      console.log(error);

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
                    <input type="text" name='name' placeholder='Enter Name' />
                    <input type="email" name='email' placeholder='Enter email'/>
                    <input type="password" name='password' placeholder='Enter password'/>
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
