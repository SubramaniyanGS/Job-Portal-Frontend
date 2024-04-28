import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './dashboard.css'; // Import the CSS file for styling
import { jwtDecode } from 'jwt-decode';
import { PostJob } from '../Profile/Employer/PostJob';

const WelcomeCard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/');
      };

    return (
        <div className="welcome-card d-flex justify-content-between">
            <h2 className="welcome-text">WELCOME TO JOB PORTAL ADMIN </h2>
            <button type="button" className="btn logoutbtn" onClick={handleLogout}>Logout</button>
        </div>
    );
};

const DashboardCards = () => {
    const [dashboardData, setDashboardData] = useState({
        totalJobSeekers: 0,
        totalEmployers: 0,
        totalJobs: 0,
        totalResumes: 0,
        totalApplications: 0,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    // Token is not present, redirect to login page
                    navigate('/');
                } else {
                    // Token is present, but may be expired, you can check it here if needed
                    // You can decode the token to get the expiration time and compare it with the current time
                    // If the token is expired, redirect to login page

                    // For example, you can use jwt-decode library to decode the token
                    const decodedToken = jwtDecode(token);
                    const role = decodedToken.role;
                    const expirationTime = decodedToken.exp; // Expiration time in seconds since epoch
                    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds since epoch

                    if (expirationTime < currentTime) {
                        // Token is expired, redirect to login page
                        alert('Token has expired. Please log in again.')
                        navigate('/');

                    } // Convert milliseconds to seconds
                    if (role !== "admin") {
                        alert('you are not authorized')
                        console.log('you are not authorized');
                        // Token is expired, redirect to login page
                        navigate('/');
                    }

                }
                const response = await fetch('https://job-portal-backend-u0t7.onrender.com/app/v1/admin/dashboard', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setDashboardData({
                        totalJobSeekers: data.totalJobSeekers,
                        totalEmployers: data.totalEmployers,
                        totalJobs: data.totalJobs,
                        totalResumes: data.totalResumes,
                        totalApplications: data.totalApplications,
                    });
                }
            } catch (error) {
                alert(error.message);
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [navigate]); // Empty dependency array to run the effect only once when the component mounts

    return (
        <>
            <h2 align="center" className='dash'>DASHBOARD</h2>
            <div className="dashboard-cards">
                <div className="dashboard-card">
                    <div className="card-title">Jobseekers</div>
                    <div className="card-count">{dashboardData.totalJobSeekers}</div>
                </div>
                <div className="dashboard-card">
                    <div className="card-title">Employers</div>
                    <div className="card-count">{dashboardData.totalEmployers}</div>
                </div>
                <div className="dashboard-card">
                    <div className="card-title">Jobs</div>
                    <div className="card-count">{dashboardData.totalJobs}</div>
                </div>
                <div className="dashboard-card">
                    <div className="card-title">Resumes Received</div>
                    <div className="card-count">{dashboardData.totalResumes}</div>
                </div>
                <div className="dashboard-card">
                    <div className="card-title">Applications Received</div>
                    <div className="card-count">{dashboardData.totalApplications}</div>
                </div>
            </div>
        </>
    );
};

const AdminSignupForm = () => {
    const [show, setShow] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState(null);
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleClose = () => {
        setShow(false); // Set show state to false when modal is closed
        setFirstName(''); // Clear form fields
        setLastName('');
        setEmail('');
        setPassword('');
        setPhoneNumber('');
        setRole('');
        navigate('/dashboard');
    };

    const handleShow = () => setShow(true);

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post("https://job-portal-backend-u0t7.onrender.com/app/v1/admin/register", {
                firstName,
                lastName,
                email,
                phoneNumber,
                password,
                role
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 201) {
                alert('Admin created successfully');
                setFirstName('');
                setLastName('')
                setEmail('')
                setPassword('')
                setPhoneNumber('')
                setRole('')
                navigate('/dashboard');
                setShow(false);
            }
            // const { token, user } = response.data;

            // // Store the token and user role in local storage
            // localStorage.setItem('token', token);
            // localStorage.setItem('role', user.role);

            // Redirect to dashboard or any other desired route
        } catch (error) {
            alert(error.response.data.message);
            console.error('Admin Signup Error:', error.response.data);
            setError(error.response.data.message || 'An error occurred during admin signup.');
        }
    };
    useEffect(() => {
        if (!show) {
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setPhoneNumber('');
            setRole('');
        }
    }, [show]);
    return (
        <>
            <h2 align="center" className='dash'>Admin Manager</h2>
            <div className='d-flex align-item-center justify-content-center'>
            <Button className='btn greenbtn' onClick={handleShow}>
                Create Admin
            </Button>
            </div>
            {show &&
            <Modal show={show} onHide={handleClose} size="md" >
                 <Modal.Header closeButton>
                    <Modal.Title>Create Admin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSignup}>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="firstName" placeholder="Enter first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="lastName" placeholder="Enter last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                            <input type="text" className="form-control" id="phoneNumber" placeholder="Enter phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="role" className="form-label">Role</label>
                            <select className="form-control" id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        {error && <p className="text-danger">{error}</p>}
                        <button type="submit" className="btn btn-primary">Create</button>
                    </form>
                </Modal.Body>
            </Modal >
             }
        </>
    );
};

const Dashboard = () => {
    return (
        <div>
            <WelcomeCard />
            <DashboardCards />
            <hr className="divider" />
            <AdminSignupForm />
            <hr className="divider" />
            <PostJob />
        </div>
    );
};

export default Dashboard;
