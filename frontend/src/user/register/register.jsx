import React from 'react'
import './register.css'
import { Link } from 'react-router-dom'

const Register = () => {



  return (
    <div className="register">
      <div className='register-container'>
        <div className="register-title">
            <h2>Register</h2>
        </div>

        <form>
            <div className="register-inputs">
                <input type="text" placeholder='Enter Name'/>
                <input type="email" placeholder='Enter email'/>
                <input type="password" placeholder='Enter password'/>
            </div>
            <button>Submit</button>
        </form>
        
        <p>Already have an account <Link to='/login'>Login</Link></p>
    </div>
    </div>
  )
}

export default Register
