import React from 'react'
import './login.css'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className="login">
      <div className='login-container'>
        <div className="login-title">
            <h2>Login</h2>
        </div>

        <div className="login-inputs">
            <input type="email" placeholder='Enter email'/>
            <input type="password" placeholder='Enter password'/>
        </div>
        <button>Submit</button>

        <p>Dont have an account <Link to='/register'>Register</Link></p>
      
    </div>
    </div>
  )
}

export default Login
