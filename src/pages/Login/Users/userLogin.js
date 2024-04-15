import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../../../AuthContext';// Update with the correct path

function UserLogin() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('https://job-portal-backend-u0t7.onrender.com/app/v1/auth/login', { email, password });
      const { token, user } = result.data;

       // Store token and user role in local storage
       localStorage.setItem('token', token);
       localStorage.setItem('role', user.role);

      // Call the login function from your auth context to update the user state
      login(token);

      const decodedToken = jwtDecode(token);

      if (!decodedToken.isEmailVerified) {
        navigate('/verify');
        return;
      }

      // Navigate based on user role
      if (decodedToken.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/home');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    }
  };

  return (
    <div className='userlogin template d-flex justify-content-center align-items-center 100-w vh-100'>
      <div className='form_container pt-3 pb-3 ps-5 pe-5 rounded bg-white'>
        <form onSubmit={handleSubmit}>
          <h3 className='text-center log'>Login</h3>
          <div className=' mt-3 mb-3 form-floating'>
            <input type='email' placeholder='Enter email' className='form-control' onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor='email'>Enter Email</label>
          </div>
          <div className='mb-3 form-floating'>
            <input type='password' placeholder='Enter password' className='form-control' onChange={(e) => setPassword(e.target.value)} />
            <label htmlFor='password'>Enter Password</label>
          </div>
          {error && typeof error === 'string' && <p className='text-danger'>{error}</p>}
          <div className='mb-3'>
            <input type='checkbox' className='custom-control custom-checkbox' id='check' />
            <label htmlFor='check' className='custom-inout-label'>
              Remember me
            </label>
          </div>
          <div className='d-grid'>
            <button className='btn login-btn'>Login</button>
          </div>
          <p className='text-end mt-2'>
            Forget <a href=''>Password</a>
            <Link to='/usersignup' className='ms-2'>
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;
