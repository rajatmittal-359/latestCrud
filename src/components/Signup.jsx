import React from 'react'
import { signupUser } from '../api/authApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Signup = () => {

    const [signup, setSignup] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const navigate = useNavigate();

    const data = {
        name: signup.name,
        email: signup.email,
        password: signup.password,
        confirmPassword: signup.confirmPassword
    }

    const signupHandler = async(e) => {
      try {
          e.preventDefault();
        const res = await signupUser(signup);
        if(data.name&&data.email&&data.password&&data.confirmPassword){
            alert(res?.data?.message)
        }
        setSignup(signup);
        navigate("/login")
      } catch (error) {
        alert(error.response?.data?.message)
      }
    }
    const handleChange = (e)=>{
        const {name,value} = e.target
        setSignup((prev) => ({
            ...prev,
            [name]: value,
        }));
    }



  return (
    <div>
        <h1>Signup</h1>
        <form onSubmit={signupHandler}>
            <input 
            type="text" 
            placeholder='Enter the name'
            name='name'
            value={signup.name}
            onChange={handleChange}
            />

            <input 
            type="text" 
            placeholder='Enter the email'
            name='email'
            value={signup.email}
            onChange={handleChange}
            />

            <input 
            type="text" 
            placeholder='Enter the password'
            name='password'
            value={signup.password}
            onChange={handleChange}
            />

            <input 
            type="text" 
            placeholder='Enter the confirm password'
            name='confirmPassword'
            value={signup.confirmPassword}
            onChange={handleChange}
            />

            <button type='submit'>Submit</button>

        </form>
    </div>
  )
}

export default Signup