import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from "axios";
import './employerDetails.css'

function EmployerDetails() {
    const [companyName,setCompanyName]=useState();
    const [location,setLocation]=useState();
    const [companyDescription,setCompanyDescription]=useState();
    const [numberOfEmployees,setNumberofEmployees]=useState();
    const [industry,setIndustry]=useState();
    const [companyWebsite,setCompanyWebsite]=useState();
    const navigate=useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();

        const token = localStorage.getItem('token');

        axios.post("https://job-portal-backend-u0t7.onrender.com/app/v1/employer/employer-details",{companyName,location,companyDescription,numberOfEmployees,industry,companyWebsite},
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        .then(result => {console.log(result)
            navigate('/')
        })
        .catch(err=>console.log(err))
    }    
    
    return (
        <div className='employersignup template d-flex justify-content-center align-items-center w-100 vh-100'>
            <div className='form1 form_container  pt-3 pb-3 ps-5 pe-5 rounded bg-white'>
                <form onSubmit={handleSubmit}>
                    <h3 className='text-center company'>Company Details</h3>
                        <div className='mb-2 mt-3 form-floating '>
                            <input id='companyName' type='text' placeholder='company Name' className='form-control mt-2' onChange={(e)=>setCompanyName(e.target.value)}/>
                            <label htmlFor='companyName'>Company Name</label>
                        </div>  
                      
                        <div className='mb-2 mt-2 form-floating'>                      
                            <input id='location' type='text' placeholder='Enter Location' className='form-control mt-2' onChange={(e)=>setLocation(e.target.value)}/>
                            <label htmlFor='location'>Location</label>
                        </div>  
                    <div className='mb-1'>
                        <textarea name="" id="" cols="25" rows="2" class="form-control" placeholder='Company Description' onChange={(e)=>setCompanyDescription(e.target.value)} ></textarea>
                    </div>
                    <div className='row'>
                      <div className='col'>
                        <div className='mb-1 form-floating'>
                            <input id='numberOfEmployees' type='number' placeholder='numberOfEmployees' className='form-control mt-2' onChange={(e)=>setNumberofEmployees(e.target.value)} />
                            <label htmlFor='numberOfEmployees'>Employees</label>
                        </div>
                      </div>  
                      <div className='col'>
                        <div className='mb-1 form-floating'>                      
                            <input id='industry' type='text' placeholder='Industry' className='form-control mt-2' onChange={(e)=>setIndustry(e.target.value)}/>
                            <label htmlFor='industry'>Industry</label>
                        </div>
                      </div>  
                    </div>  
                    <div className='mb-2 form-floating'>                      
                            <input id='companywebsite' type='text' placeholder='contactInfo' className='form-control mt-2' onChange={(e)=>setCompanyWebsite(e.target.value)}/>
                            <label htmlFor='companywebsite'>Company Website</label>
                    </div> 
                    <div className='d-grid mb-3'>
                        <button className='btn login-btn mt-2'>Submit</button> 
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EmployerDetails;