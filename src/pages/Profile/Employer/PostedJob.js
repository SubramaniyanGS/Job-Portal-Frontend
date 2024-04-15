import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const PostedJobs = () => {
    const [show, setShow] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        jobType: '',
        jobLocation: '',
        industry: '',
        status: '',
        createdAt: '',
        preferredEducation: '',
        preferredSkill: ''
    });
    const [editIndex, setEditIndex] = useState(null); // State to store the index of the job being edited

    const handleClose = () => {
        setShow(false);
        setEditIndex(null); // Reset edit index when modal is closed
    };
    const handleShow = () => setShow(true);

    const handleEdit = (index) => {
        const selectedJob = jobs[index];
        setFormData({
            title: selectedJob.title,
            jobType: selectedJob.jobType,
            jobLocation: selectedJob.jobLocation,
            industry: selectedJob.industry,
            status: selectedJob.status,
            preferredEducation: selectedJob.preferredEducation,
            preferredSkill: selectedJob.preferredSkill,
            createdAt: selectedJob.createdAt
        });
        setEditIndex(index); // Set the index of the job being edited
        setShow(true); // Open the modal
    };

    const fetchJobs = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://job-portal-backend-u0t7.onrender.com/app/v1/job/get-job', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch experiences');
            }

            const data = await response.json();
            setJobs(data.jobs || []);
        } catch (error) {
            console.error('Error fetching experiences:', error);
            // Handle error appropriately
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleDelete = async (index) => {
        try {
            const token = localStorage.getItem('token');
            const jobIdToDelete = jobs[index]._id; // Assuming the job ID is stored in _id property
            const response = await fetch(`https://job-portal-backend-u0t7.onrender.com/app/v1/job/delete-job/${jobIdToDelete}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete job');
            }

            // Remove the deleted job from the jobs array
            const updatedJobs = [...jobs];
            updatedJobs.splice(index, 1);
            setJobs(updatedJobs);
        } catch (error) {
            console.error('Error deleting job:', error);
            // Handle error appropriately
        }
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            const jobIdToUpdate = jobs[editIndex]._id;
            const response = await fetch(`https://job-portal-backend-u0t7.onrender.com/app/v1/job/update-job/${jobIdToUpdate}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update job');
            }

            // Update the job details in the frontend
            const updatedJobs = [...jobs];
            updatedJobs[editIndex] = formData;
            setJobs(updatedJobs);
            console.log('Job updated successfully!');
            setSuccessMessage('Job updated successfully!');

            handleClose();
        } catch (error) {
            console.error('Error updating job:', error);
            // Handle error appropriately
        }
    };

    const handleApplications = (jobId) => {
        window.location.href = `/job/${jobId}/applications`;
    };

    return (
        <>
            <div>
                <div className="row">
                    <div className="col-lg-6">
                        <h5 className="mb-4 text-uppercase text-left greentext">
                            <i className="fa fa-briefcase"></i> &nbsp; Posted Jobs
                        </h5>
                    </div>
                    <div className="col-lg-6">
                        <i type="button" className="fa fa-edit" onClick={handleShow} style={{ float: 'right' }}></i>
                    </div>
                </div>

                {/* Experience List */}
                {Array.isArray(jobs) && jobs.map((job, index) => (
                    <div key={index} className="row text-left p-3">
                        <div className="col-lg-10">
                            <h4>{job.title}</h4>
                            <p className='h6 pt-2 pb-2'>Job Type : {job.jobType}</p>
                            <p className='h6 pb-2'>Location : {job.jobLocation}</p>
                            <p className='h6 pb-2'>PreferredEducation : {job.preferredEducation}</p>
                            <p className='h6 pb-2'>PreferredSkills: {job.preferredSkill}</p>
                            <p className='h6 pb-2'>Industry: {job.industry}</p>
                            <p className='h6 pb-2'>Status: {job.status}</p>
                            <p className='h6 pb-2'>Posted At : {job.createdAt.split('T')[0]}</p>
                        </div>
                        <div className="col-lg-2 d-flex align-items-center justify-content-end">
                            {/* Buttons section */}
                            <div className="btn-group" role="group" aria-label="Job Actions">
                                <Button className='btn btn-primary me-2' onClick={() => handleApplications(job._id)}>Applications</Button>
                                <Button className='btn greenbtn me-2' onClick={() => handleEdit(index)}>Edit</Button>
                                <Button className='btn btn-danger' onClick={() => handleDelete(index)}>Delete</Button>
                            </div>
                        </div>
                        <div className='h5 text-success p-3'>{successMessage}</div>
                    </div>
                ))}

                {/* Add/Edit Experience Modal */}
                {show && 
                <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Update Job Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Experience Form */}
                        <div className="row mt-2">
                            <div className="col-lg-12 mt-2">
                                <div className="form-group text-left">
                                    <label htmlFor="companyName">Job Title</label>
                                    <input type="text" className="form-control" id="companyName" name="companyName" value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                                </div>
                            </div>
                            <div className="col-lg-12 mt-2">
                                <div className="form-group text-left">
                                    <label htmlFor="jobTitle">Job Type</label>
                                    <input type="text" className="form-control" id="jobTitle" name="companyName" value={formData.jobType} onChange={(e) => setFormData({ ...formData, jobType: e.target.value })} />
                                </div>
                            </div>
                            <div className="col-lg-12 mt-2">
                                <div className="form-group text-left">
                                    <label htmlFor="startDate">Location</label>
                                    <input type="text" className="form-control" id="startDate" name="startDate" value={formData.jobLocation} onChange={(e) => setFormData({ ...formData, jobLocation: e.target.value })} />
                                </div>
                            </div>
                            <div className="col-lg-12 mt-2">
                                <div className="form-group text-left">
                                    <label htmlFor="endDate">PreferredEducation</label>
                                    <input type="text" className="form-control" id="endDate" name="endDate" value={formData.preferredEducation}
                                        onChange={(e) => setFormData({ ...formData, preferredEducation: e.target.value })} />
                                </div>
                            </div>
                            <div className="col-lg-12 mt-2">
                                <div className="form-group text-left">
                                    <label htmlFor="responsibilities">PreferredSkills</label>
                                    <input type="text" className="form-control" id="responsibilities" name="responsibilities" value={formData.preferredSkill} onChange={(e) => setFormData({ ...formData, preferredSkill: e.target.value })} />
                                </div>
                            </div>
                            <div className="col-lg-12 mt-2">
                                <div className="form-group text-left">
                                    <label htmlFor="responsibilities">Industry</label>
                                    <input type="text" className="form-control" id="responsibilities" name="responsibilities" value={formData.industry} onChange={(e) => setFormData({ ...formData, industry: e.target.value })} />
                                </div>
                            </div>
                            <div className="col-lg-12 mt-2">
                                <div className="form-group text-left">
                                    <label htmlFor="responsibilities">Status</label>
                                    <input type="text" className="form-control" id="responsibilities" name="responsibilities" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} />
                                </div>
                            </div>
                            {/* Add other input fields similarly */}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSave}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                }
            </div>
        </>
    )
}

