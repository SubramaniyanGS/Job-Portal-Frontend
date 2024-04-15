import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import './otp.css';

function OTPVerification() {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://job-portal-backend-u0t7.onrender.com/app/v1/auth/verify-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ otp }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);

                // Store the JWT in Local Storage   
                const token = localStorage.getItem('token')
                const decodedToken = jwtDecode(token);

                if (decodedToken.role === 'employer') {
                    navigate('/employerdetails')
                } else if (decodedToken.role === 'jobSeeker') {
                    navigate("/jobseekerdetails")
                } else if (decodedToken.role === 'admin') {
                    navigate('/dashboard')
                }

                // Handle successful OTP verification here
                console.log('OTP verification successful:', data);
                // You can return data if needed
            } else {
                console.error('Failed to verify OTP');
                return null;
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            return null;
        }
    };

    return (
        <div className='userlogin'>
            <div className='otp-form-container pt-3 pb-3 ps-5 pe-5 rounded bg-white'>
                <form onSubmit={handleVerifyOtp}>
                    <h3 className='text-center'>OTP Verification</h3>
                    <div className='mb-3 form-floating'>
                        <input
                            id='otp'
                            type='text'
                            placeholder='Enter OTP'
                            className='form-control mt-2'
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <label htmlFor='otp'>OTP</label>
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <div className='d-grid'>
                        <button className='btn login-btn mt-2' type='submit'>Verify OTP</button>
                    </div>
                    <p className='text-end mt-2'>
                        Didn't receive OTP? <Link to='#'>Resend OTP</Link>
                    </p>
                    <p className='text-end mt-2'>
                        <Link to='/'>Back to Signup</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default OTPVerification;
