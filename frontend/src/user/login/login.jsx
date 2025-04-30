import React, { useContext, useState } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { StoreContext } from '../../context/storeContext'
import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google'




const Login = () => {

  const navigate = useNavigate()

  const {setToken} = useContext(StoreContext)

  const [data,setData] = useState({
    email:'',
    password:''
  })

  // const client_id = import.meta.env.GOOGLE_CLIENT_ID
  const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  

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
      setToken(response.data.token)
      localStorage.setItem("token",response.data.token)
      toast.success("Login Succesfull",{autoClose:1000})
      setTimeout(()=>{
        navigate('/user/home')
      },1500)
    }else{
      
      
      toast.error(response.data.message,{autoClose:1500})
    }
    
    } catch (error) {
      toast.error("An error occured")
      console.log(error);
      
    }


    


  }




  const googleLogin = async (response) => {
    console.log("Google Response:", response.credential); 

    if (!response || !response.credential) {
        toast.error("Google Login Failed");
        return;
    }

    try {

      
      
        const res = await axios.post('http://localhost:2000/user/auth/google', {
            token: response.credential
        });

        console.log(res);
        
        if (res.data.jwtToken) {
          console.log("here");
          
            setToken(res.data.jwtToken);
            localStorage.setItem("token", res.data.jwtToken);
            toast.success("Login Successful", { autoClose: 1000 });
            setTimeout(() => {
                navigate('/user/home');
            }, 1500);
        }
    } catch (error) {
        console.log(error);
        toast.error("Google authentication failed");
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
          

            

            {/* <GoogleOAuthProvider clientId = {client_id}>
                <GoogleLogin 
                onSuccess={(response)=>googleLogin(response)} onError={() => toast.error("Google Login Failed")}
                />
            </GoogleOAuthProvider> */}
          </div>
        
    </div>
  )
}

export default Login
