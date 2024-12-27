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
            <form>
                <div className="login-inputs">
                    <input type="email" placeholder='Enter email'/>
                    <input type="password" placeholder='Enter password'/>
                </div>
                <div className="button-container">
                    <button className='login-button' type='submit'>Submit</button>
                </div>
                
            </form>
            <p>Dont have an account <Link to='/register'>Register</Link></p>
          
          </div>
        
    </div>
  )
}

export default Login
