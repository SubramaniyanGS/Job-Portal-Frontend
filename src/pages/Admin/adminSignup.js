import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import './userSignup.css';

function AdminSignup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://job-portal-backend-u0t7.onrender.com/app/v1/admin/register", {
                firstName,
                lastName,
                email,
                password
            });

            const { token, user } = response.data;

            // Store the token and user role in local storage
            localStorage.setItem('token', token);
            localStorage.setItem('role', user.role);

            // Redirect to dashboard or any other desired route
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Admin Signup Error:', error.response.data);
            setError(error.response.data.message || 'An error occurred during admin signup.');
        }
    };

    return (
        <div className='admin-signup template d-flex justify-content-center align-items-center w-100 vh-100'>
            <div className='form1 form_container pt-3 pb-3 ps-5 pe-5 rounded bg-white'>
                <form>
                    <h3 className='text-center sig'>Admin Sign Up</h3>
                    <div className='row'>
                        <div className='col'>
                            <div className='mb-3 mt-3 form-floating '>
                                <input id='firstName' type='text' placeholder='Enter First Name' className='form-control mt-2' onChange={(e) => setFirstName(e.target.value)} />
                                <label htmlFor='firstName'>First Name</label>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='mb-3 mt-3 form-floating'>
                                <input id='lastName' type='text' placeholder='Enter Last Name' className='form-control mt-2' onChange={(e) => setLastName(e.target.value)} />
                                <label htmlFor='lastName'>Last Name</label>
                            </div>
                        </div>
                    </div>
                    <div className='mb-3 form-floating'>
                        <input id='email' type='email' placeholder='Enter Email' className='form-control mt-2' onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor='email'>Email</label>
                    </div>
                    <div className='mb-3 form-floating'>
                        <input id='password' type='password' placeholder='Enter Password' className='form-control mt-2' onChange={(e) => setPassword(e.target.value)} />
                        <label htmlFor='password'>Password</label>
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <div className='d-grid'>
                        <button className='btn login-btn mt-2' onClick={handleSignup}>Sign Up</button>
                    </div>
                    <p className='text-end mt-2'>
                        Already Registered<Link to='/admin/login' className='ms-2'>Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default { AdminSignup };