import React from 'react'
import {GoogleAuthProvider,GoogleLogin} from '@react-oauth/google'



const GoogleSignin = () => {
  return (
    <div>
      <GoogleAuthProvider>
        <GoogleLogin 
            onSuccess={(response)=> console.log("Success:",response)}
            
        />
      </GoogleAuthProvider>
    </div>
  )
}

export default GoogleSignin
