import React from 'react'
import { loginUser } from '../api/authApi'
import { useState } from 'react'
const Login = () => {
    const [formData,setFormData]= useState({
        email:"",
        password:""
    })
    const handleSubmit =async(e)=>{
        e.preventDefault()
        const res= await loginUser(formData)
        setFormData(...formData)
        alert(res?.data?.message)
        
    }
    const handleChange =(e)=>{
        const {name,value} = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
  return (
    <div>
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder='Enter your email' 
            name='email'
            value={formData.email}
            onChange={handleChange}/>
            <input type="password" placeholder='Enter your password'
            name='password'
            value={formData.password}  
            onChange={handleChange} />
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Login