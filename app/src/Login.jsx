import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from "./AuthContext"; // Adjust path as needed

import axios from 'axios'

const Login= () => {

    //const [username,setUsername]=useState('');
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error, setError]=useState('')
    const navigate=useNavigate();
    const {login}=useAuth();

    const handleSubmit= async(e)=>{ //
        e.preventDefault()
         try{
             const response=await axios.post('https://pollify-h0t9.onrender.com/api/auth/login',{
   
                email,
                password,
             })
             alert(' Login Success')
             const userData={id : response.data.userId, username:response.data.username}
             login(userData)
             localStorage.setItem('token', response.data.token);
             navigate('/dash')
         }catch(err){
            setError(err.response?.data?.message || 'Login failed' )
            console.error(" Login Failed")
         }
          
    }
  return (
    <div className='container'>
         <form className='register-from' onSubmit={handleSubmit} >
             <h2>Login</h2>
         
             

             <div className='input-group'>
                <label> Email</label>
               <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} required/>
             </div>

             <div className='input-group'>
                <label> Password</label>
               <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} required/>
             </div>

             <button type="submit" className='submit-button'>Login</button>
             {error && <p className='error-message'>{error} </p>}
             {/* <p className='login-prompt'>
                Already have an account? <Link to ="/login"> Login</Link>
             </p> */}
         </form>


    </div>
  )
}
export default Login