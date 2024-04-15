import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Applications.css';

function Applications() {
    const { jobId } = useParams();
    const [applications, setApplications] = useState([]);
    const [details, setDetails] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await axios.get(`https://job-portal-backend-u0t7.onrender.com/app/v1/job/${jobId}/applications/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('API Response:', response.data);
            setApplications(response.data.applications);
            setDetails(response.data.details);
        } catch (error) {
            console.error('Error fetching application details:', error.message);
            // Handle error
        }
    };

    return (
        <div className='applications'>
            <div className="container mt-5">
                <h1 className="text-center mb-5">Applications</h1>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="tab-class text-center">
                            {applications.map((application, index) => (
                                <div key={index} className="application-card">
                                    <h2>Application Date: {new Date(application.applicationDate).toLocaleDateString()}</h2>
                                    {details.map(detail => (
                                        (detail.userId._id === application.jobSeekerId) && (
                                            <div key={detail._id} className="user-details">
                                                <h3>Name: {detail.userId.firstName} {detail.userId.lastName}</h3>
                                                <p>Education: {detail.education}</p>
                                                <h4>Work History:</h4>
                                                {detail.workHistory.map((work, idx) => (
                                                    <div key={idx}>
                                                        <p>Job Title: {work.jobTitle}</p>
                                                        <p>Company: {work.company}</p>
                                                        <p>Start Date: {new Date(work.startDate).toLocaleDateString()}</p>
                                                        <p>End Date: {new Date(work.endDate).toLocaleDateString()}</p>
                                                        <p>Responsibilities: {work.responsibilities}</p>
                                                    </div>
                                                ))}
                                                {/* Add resume file link */}
                                                <a href={detail.resume.src} target="_blank" rel="noopener noreferrer">View Resume</a>
                                                <br></br>
                                                <hr></hr>
                                            </div>
                                        )
                                    ))}
                                </div>
                            ))}
                            {applications.length === 0 && <p>No applications available</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Applications;
