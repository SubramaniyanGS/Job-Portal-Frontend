import React, { useState } from 'react';
import './Adminlogin.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Adminlogin() {
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const navigate=useNavigate();

  const handleSubmit = (e)=>{
      e.preventDefault();
      axios.post("https://job-portal-backend-u0t7.onrender.com/app/v1/auth/login",{email,password})
      .then(result => {console.log(result)
      })
      .catch(err=>console.log(err))
  }

  const handleNavigate = ()=>{
      navigate('/home');
  }
return (
  <div className='adminlogin template d-flex justify-content-center align-items-center 100-w vh-100'>
      <div className='form_container pt-3 pb-3 ps-5 pe-5 rounded bg-white'>
      <form onSubmit={handleSubmit}>
          <h3 className='text-center admin'>Admin</h3>
          <div className=' mt-3 mb-3 form-floating'>
              <input type='email' placeholder='Enter email' className='form-control' onChange={(e)=>setEmail(e.target.value)} />
              <label htmlFor='email'>Enter Email</label>
          </div>
          <div className='mb-3 form-floating'>               
              <input type='password' placeholder='Enter password' className='form-control' onChange={(e)=>setPassword(e.target.value)}/>
              <label htmlFor='password'>Enter Password</label>
          </div>
          <div className='mb-3'>
              <input type='checkbox' className='custom-control custom-checkbox' id='check' />
              <label htmlFor='check' className='custom-inout-label'>Remeber me</label>
          </div>
          <div className='d-grid'>
              <button className='btn login-btn mb-3' onClick={handleNavigate}>Login</button>
          </div>
      </form>
      </div>
  </div>
)
}

export default Adminlogin