import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import './userSignup.css'

function UserSignup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://job-portal-backend-u0t7.onrender.com/app/v1/auth/register", {
                firstName,
                lastName,
                email,
                password,
                address,
                phoneNumber,
                role
            });

            const { token, user } = response.data;

            // Store the token and user role in local storage
            localStorage.setItem('token', token);
            localStorage.setItem('role', user.role);

            // Redirect based on user role
            navigate('/verify')
            // if (user.role === 'employer') {
            //     navigate('/employerdetails');
            // } else if (user.role === 'jobSeeker') {
            //     navigate('/jobseekerdetails');
            // }
        } catch (error) {
            console.error('Signup Error:', error.response.data);
            setError(error.response.data.message || 'An error occurred during signup.');
        }
    };



    return (
        <div className='usersignup template d-flex justify-content-center align-items-center w-100 vh-100'>
            <div className='form1 form_container  pt-3 pb-3 ps-5 pe-5 rounded bg-white'>
                <form >
                    <h3 className='text-center sig '>Sign Up</h3>
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
                    <div className='mb-3 form-floating'>
                        <input id='address' type='text' placeholder='Enter address' className='form-control mt-2' onChange={(e) => setAddress(e.target.value)} />
                        <label htmlFor='address'>Address</label>
                    </div>
                    <div className='mb-3 form-floating'>
                        <input id='phoneNumber' type='text' placeholder='Enter phoneNumber' className='form-control mt-2' onChange={(e) => setphoneNumber(e.target.value)} />
                        <label htmlFor='phoneNumber'>Phone Number</label>
                    </div>
                    <div className='mb-3 mt-2'>
                        <select id='role' placeholder='Select Role' className='form-control select' onChange={(e) => setRole(e.target.value)}>
                            <option value="">Select Role</option>
                            <option value="jobSeeker">Job Seeker</option>
                            <option value="employer">Employer</option>
                        </select>
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <div className='d-grid'>
                        <button className='btn login-btn mt-2' onClick={handleSignup}>Signup</button>
                    </div>
                    <p className='text-end mt-2'>
                        Already Registered<Link to='/' className='ms-2'>Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
export default UserSignup;
