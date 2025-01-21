import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Register= () => {

    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error, setError]=useState('')

    const handleSubmit= async(e)=>{ //
        e.preventDefault()
         try{
             const response=await axios.post('http://localhost:5000/api/auth/register',{
                username,
                email,
                password,
             })
             alert('Register Success')
             console.log(response.data)
         }catch(err){
            setError(err.response?.data?.message || 'Registered failed' )
            console.error("Failed")
         }
          
    }
  return (
    <div className='container'>
         <form className='register-from' onSubmit={handleSubmit} >
             <h2>Register</h2>
         
             <div className='input-group'>
                <label> Username</label>
               <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)} required />
             </div>

             <div className='input-group'>
                <label> Email</label>
               <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} required/>
             </div>

             <div className='input-group'>
                <label> Password</label>
               <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} required/>
             </div>

             <button type="submit" className='submit-button'>Register</button>
             {error && <p className='error-message'>{error} </p>}
             <p className='login-prompt'>
                Already have an account? <Link to ="/login"> Login</Link>
             </p>
         </form>


    </div>
  )
}
export default Register