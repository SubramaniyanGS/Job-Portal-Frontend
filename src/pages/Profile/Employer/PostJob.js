import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const PostJob = () => {
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
            const response = await fetch('https://job-portal-backend-u0t7.onrender.com/app/v1/job/create-job', {
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

            <div className="row">
                <div className="col-lg-6">
                    <h3 className="mb-2 text-uppercase text-left greentext">
                        <i className="fa fa-building"></i> &nbsp; Create Job
                    </h3>
                </div>
            </div>
            <div className='pb-3 pt-3'>
                <p className='h6 pb-2 pt-2'>Click here to create a job.  </p>
                <p className='h6 pb-2'>Provide all the necessary details.</p>
                <p className='h6 pb-2'>The job will not be created if all fields are not provided.</p>
            </div>

            <Button variant="primary" className='btn greenbtn' onClick={handleShow}>
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
                                <button className="btn greenbtn w-100" type="submit">Post Job</button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"  onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            }
        </>
    );
};
