import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Jobs.css';
import Jobcard from '../../components/JobCard/Jobcard';
import { jwtDecode } from 'jwt-decode';

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchData();
    }, [searchQuery]); // Run effect whenever searchQuery changes

    const navigate = useNavigate();
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
            }
            const response = await axios.get(`https://job-portal-backend-u0t7.onrender.com/app/v1/job/view-all-jobs?search=${searchQuery}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('API Response:', response.data.jobs);
            setJobs(response.data.jobs);
        } catch (error) {
            console.error('Error fetching job details:', error.message);
            // Handle error
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    return (
        <>
            <div className='jobs'>
                <div className="page-header">
                    <div className="overlay">
                        <div className="container">
                            <h2>Search for a Job</h2>
                            <div className="row sm-gutters">
                                <div className="col-sm-12">
                                    <form onSubmit={handleSearchSubmit}>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="title"
                                                placeholder="Job title, skills, keywords etc..."
                                                className="form-control"
                                                autoComplete="off"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                            <button type="submit" className="search-button">
                                                <i className="fa fa-search"></i>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="row sm-gutters mt-3">
                                <div className="col-sm-6">
                                    <div className="form-group select">
                                        <select name="industry" placeholder="Industry" className="form-control">
                                            <option>Select Location </option>
                                            <option>Chennai</option>
                                            <option>Madurai</option>
                                            <option>Tiruchi</option>
                                            <option>Coimbatore</option>
                                            <option>USA</option>
                                            <option>NewYork</option>
                                            <option>Tirunelveli</option>
                                            <option>Noida</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group select">
                                        <select name="industry" placeholder="Industry" className="form-control">
                                            <option>Category</option>
                                            <option>Information Technology</option>
                                            <option>Marketing</option>
                                            <option>Finance</option>
                                            <option>Garments/Textile</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mt-5">
                    <h1 className="text-center greentext mb-5 wow fadeInUp" data-wow-delay="0.1s">Most Popular Jobs</h1>
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="sidebar">
                                <div className="sidebar-item p-3">
                                    <h4 className="title">Experience</h4>
                                    <ul>
                                        <li>
                                            <input type="checkbox" />
                                            Fresher<span>40</span>
                                        </li>
                                        <li>
                                            <input type="checkbox" />
                                            1 - 3 years <span>24</span>
                                        </li>
                                        <li>
                                            <input type="checkbox" />
                                            3 - 5 years <span>30</span>
                                        </li>
                                        <li>
                                            <input type="checkbox" />
                                            5 -10 years <span>15</span>
                                        </li>
                                        <li>
                                            <input type="checkbox" />
                                            above 10 years <span>15</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="sidebar">
                                <div className="sidebar-item p-3">
                                    <h4 className="title">Salary Range</h4>
                                    <ul>
                                        <li>
                                            <input type="checkbox" />
                                            15000 - 25000<span>40</span>
                                        </li>
                                        <li>
                                            <input type="checkbox" />
                                            25000 - 50000 <span>24</span>
                                        </li>
                                        <li>
                                            <input type="checkbox" />
                                            50000 - 100000 <span>30</span>
                                        </li>
                                        <li>
                                            <input type="checkbox" />
                                            Above 1 lakh <span>15</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="sidebar">
                                <div className="sidebar-item p-3">
                                    <h4 className="title">Qualification</h4>
                                    <ul>
                                        <li>
                                            <input type="checkbox" />
                                            Bsc <span>40</span>
                                        </li>
                                        <li>
                                            <input type="checkbox" />
                                            BE<span>24</span>
                                        </li>
                                        <li>
                                            <input type="checkbox" />
                                            B-Tech <span>30</span>
                                        </li>
                                        <li>
                                            <input type="checkbox" />
                                            MCA <span>15</span>
                                        </li>
                                        <li>
                                            <input type="checkbox" />
                                            Others <span>15</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="sidebar">
                                <div className="sidebar-item p-3">
                                    <h4 className="title">Job Status</h4>
                                    <ul>
                                        <li>
                                            <input type="checkbox" />
                                            Active <span>40</span>
                                        </li>
                                        <li>
                                            <input type="checkbox" />
                                            In Active <span>24</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-9">
                            <div className="tab-class text-center wow fadeInUp" data-wow-delay="0.3s">
                                {Array.isArray(jobs) ? (
                                    jobs.map((job, index) => (
                                        <Link to={`/jobs/${job._id}`} key={index}>
                                            <Jobcard job={job} />
                                        </Link>
                                    ))
                                ) : (
                                    <p>No jobs available</p>
                                )}
                                <a className="btn greenbtn py-3 px-5 mb-5" href="">Browse More Jobs</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Jobs;
