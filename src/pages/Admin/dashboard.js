import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './dashboard.css'; // Import the CSS file for styling
import { PostedJobs } from '../Profile/Employer/PostedJob';
import { jwtDecode } from 'jwt-decode';
// import { PostJob } from '../Profile/Employer/PostJob';

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
        totalAdmins: 0,
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
                const response = await fetch('http://localhost:8000/app/v1/admin/dashboard', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setDashboardData({
                        totalAdmins: data.totalAdmins,
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
            <h2 align="center">DASHBOARD</h2>
            <div className="dashboard-cards">
                <div className="dashboard-card">
                    <div className="card-title">Admins</div>
                    <div className="card-count">{dashboardData.totalAdmins}</div>
                </div>
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
            const response = await axios.post("http://localhost:8000/app/v1/admin/register", {
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
            <h2 align="center">Admin Manager</h2>
            <Button variant="primary" className='otherbtn' onClick={handleShow}>
                Create Admin
            </Button>
            {show && <div className="modal-backdrop fade show" onClick={handleClose}></div>}
            {show &&
                <Modal show={show} onHide={handleClose} size="md" backdrop="static">
                    <Modal.Header >
                        <Modal.Title>Admin Signup
                            <span className="close-btn" onClick={handleClose}>&times;</span>
                        </Modal.Title>
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
                            <button type="submit" className="btn btn-primary">Signup</button>
                        </form>
                    </Modal.Body>
                </Modal >}
        </>
    );
};

const PostJob = () => {
    const [show, setShow] = useState(false);
    const [companyLogoUrl, setCompanyLogoUrl] = useState();
    const [title, setTitle] = useState();
    const [jobType, setJobType] = useState();
    const [preferredEducation, setPreferredEducation] = useState();
    const [preferredSkill, setPreferredSkill] = useState();
    const [jobLocation, setJobLocation] = useState();
    const [industry, setIndustry] = useState();
    const [minExperience, setMinExperience] = useState();
    const [maxExperience, setMaxExperience] = useState();
    const [minSalary, setMinSalary] = useState();
    const [maxSalary, setMaxSalary] = useState();
    const [status, setStatus] = useState();
    const [description, setDescription] = useState();
    const [successMessage, setSuccessMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8000/app/v1/job/create-job', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title,
                    companyLogoUrl,
                    jobType,
                    preferredEducation,
                    preferredSkill,
                    jobLocation,
                    industry,
                    preferredExperience: {
                        min: parseInt(minExperience),
                        max: parseInt(maxExperience)
                    },
                    salary: {
                        min: parseInt(minSalary),
                        max: parseInt(maxSalary)
                    },
                    status,
                    description
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create job');
            }

            // Handle success
            console.log(response);
            alert('Job created successfully!');
            setSuccessMessage('Job created successfully!');
            handleClose();
            // Reload the page after a short delay
            setTimeout(() => {
                window.location.reload();
            }, 2000); // Reload after 2 second (adjust delay as needed)
        } catch (error) {
            console.error('Error creating job:', error);
            // Handle error appropriately
        }
    };

    return (
        <>
            <Button variant="primary" className='otherbtn' onClick={handleShow}>
                Post a Job
            </Button>
            <div className='h5 text-success p-3'>{successMessage}</div>
            {show &&
                <Modal show={show} onHide={handleClose} size="xl">
                    <Modal.Header closeButton>
                        <Modal.Title>Post a Job</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleFormSubmit} >
                            <div className="row g-3">

                                <div className="col-12 col-sm-4">
                                    <label>Job Title</label>
                                    <input type="text" className="form-control" placeholder="Job Title" onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div className="col-12 col-sm-4">
                                    <label>Job Type</label>
                                    <select id='role' placeholder='Job Type' className='form-control' onChange={(e) => setJobType(e.target.value)}>
                                        <option value="">Job Type</option>
                                        <option value="full-time">Full Time</option>
                                        <option value="part-time">Part Time</option>
                                        <option value="internship">Internship</option>
                                        <option value="contract">Contract</option>
                                    </select>
                                </div>
                                <div className="col-12 col-sm-4">
                                    <label>Job Location</label>
                                    <input type="text" className="form-control" placeholder="Location" onChange={(e) => setJobLocation(e.target.value)} />
                                </div>
                                <div className="col-12 col-sm-4">
                                    <label>Preferred Education</label>
                                    <input type="text" className="form-control" placeholder="Education" onChange={(e) => setPreferredEducation(e.target.value)} />
                                </div>
                                <div className="col-12 col-sm-4">
                                    <label>Preferred Skills</label>
                                    <input type="text" className="form-control" placeholder="skills" onChange={(e) => setPreferredSkill(e.target.value)} />
                                </div>
                                <div className="col-12 col-sm-4">
                                    <label>Industry</label>
                                    <input type="text" className="form-control " placeholder='Industry' onChange={(e) => setIndustry(e.target.value)} />
                                </div>
                                <div className="col-12 col-sm-4">
                                    <label>Minimum Experience</label>
                                    <input type="number" className="form-control" placeholder='Experience (Years)' onChange={(e) => setMinExperience(e.target.value)} />
                                </div>
                                <div className="col-12 col-sm-4">
                                    <label>Maximum Experience</label>
                                    <input type="number" className="form-control" placeholder='Experience (Years)' onChange={(e) => setMaxExperience(e.target.value)} />
                                </div>
                                <div className="col-12 col-sm-4">
                                    <label>Minimum Salary</label>
                                    <input type="number" className="form-control" placeholder='Minimum Salary' onChange={(e) => setMinSalary(e.target.value)} />
                                </div>
                                <div className="col-12 col-sm-4">
                                    <label>Maximum Salary</label>
                                    <input type="number" className="form-control" placeholder='Maximum Salary' onChange={(e) => setMaxSalary(e.target.value)} />
                                </div>
                                <div className="col-12 col-sm-4">
                                    <label>Status</label>
                                    <select id='role' placeholder='Job Type' className='form-control' onChange={(e) => setStatus(e.target.value)}>
                                        <option value="active">Active</option>
                                        <option value="inactive">In Active</option>

                                    </select>
                                </div>
                                <div className="col-12 col-sm-4">
                                    <label>Company Logo</label>
                                    <input type="file" className="form-control" onChange={(e) => setCompanyLogoUrl(e.target.value)} />
                                </div>

                                <div className="col-12">
                                    <label>Job Description</label>
                                    <textarea className="form-control" rows="5" placeholder="Job Description" onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>

                                <div className="col-12">
                                    <button className="btn btn-primary w-100" type="submit">Post Job</button>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>}
        </>
    );
};
const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/app/v1/auth');
                setUsers(response.data.details); // Access the 'details' array in the response data
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const filtered = users.filter(user =>
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchTerm, users]);

    const deleteUser = async (userEmail) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:8000/app/v1/auth/delete-user/${userEmail}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert("Successfully deleted user");
            window.location.reload();
            setUsers(users.filter(user => user._id !== userEmail)); // Filter users based on _id
            setFilteredUsers(filteredUsers.filter(user => user._id !== userEmail)); // Filter filteredUsers based on _id
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // Inside the render function of the ManageUsers component
    return (
        <div>
            <h2>Manage Users</h2>
            <input
                type="text"
                placeholder="Search by email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <hr className="divider" />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user._id}>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button onClick={() => deleteUser(user.email)}>Remove</button> {/* Include email in the button label */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

const Dashboard = () => {
    return (
        <div>
        <WelcomeCard />
        <DashboardCards />
        <hr className="divider" />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <div style={{ flex: 1 }}>
                <AdminSignupForm variant="primary" style={{ marginRight: '10px' }} />
                <PostJob variant="success" style={{ marginRight: '10px' }} />
                <ManageUsers variant="success" style={{ marginRight: '10px' }} />
            </div>
            <div style={{ flex: 1 }}>
            <h2 align="center">Jobs Posted By Admin</h2>
                <PostedJobs />
            </div>
        </div>
    </div>
    );
};

export default Dashboard;
