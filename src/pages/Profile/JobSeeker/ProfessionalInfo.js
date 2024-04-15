import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const ProfessionalInfo = () => {
    const [show, setShow] = useState(false);
    const [experiences, setExperiences] = useState([]);
    console.log(experiences);
    const [formData, setFormData] = useState({
        company: '',
        jobTitle: '',
        startDate: '',
        endDate: '',
        responsibilities: ''
    });



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEdit = (index) => {
        const selectedExperience = experiences[index];
        setFormData({
            company: selectedExperience.company,
            jobTitle: selectedExperience.jobTitle,
            startDate: selectedExperience.startDate,
            endDate: selectedExperience.endDate,
            responsibilities: selectedExperience.responsibilities
        });
        setShow(true); // Open the modal
    };

    
    

    const fetchExperiences = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://job-portal-backend-u0t7.onrender.com/app/v1/profile/details', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch experiences');
            }

            const data = await response.json();
            setExperiences(data.details.workHistory || []);
        } catch (error) {
            console.error('Error fetching experiences:', error);
            // Handle error appropriately
        }
    };

    useEffect(() => {
        fetchExperiences();
    }, []);


    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://job-portal-backend-u0t7.onrender.com/app/v1/profile/update-details', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            // Update experiences state with the new entry
            setExperiences([...experiences, formData]);
            handleClose();
        } catch (error) {
            console.error('Error updating user:', error);
            // Handle error appropriately
        }
    };

    return (
        <>
            <div>
                <div className="row">
                    <div className="col-lg-6">
                        <h5 className="mb-4 text-uppercase text-left greentext">
                            <i className="fa fa-briefcase"></i> &nbsp; Experience
                        </h5>
                    </div>
                    <div className="col-lg-6">
                        <i type="button" className="fa fa-edit" onClick={handleShow} style={{ float: 'right' }}></i>
                    </div>
                </div>

                {/* Experience List */}
                {experiences.map((experience, index) => (
                    <div key={index} className="row text-left p-3">
                        <div className="col-lg-10">
                            <h5>{experience.company}</h5>
                            <strong>{experience.jobTitle}</strong> <br />
                            <small>{experience.startDate.split('T')[0]} to {experience.endDate.split('T')[0]}</small>
                            <p>{experience.responsibilities}</p>
                        </div>
                        <div className="col-lg-2">
                            <Button className='btn greenbtn' onClick={() => handleEdit(index)}>Edit</Button>
                        </div>
                    </div>
                ))}


                {/* Add/Edit Experience Modal */}
                {show && 
                <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Add Experience</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Experience Form */}
                        <div className="row mt-2">
                            <div className="col-lg-12 mt-2">
                                <div className="form-group text-left">
                                    <label htmlFor="companyName">Company Name</label>
                                    <input type="text" className="form-control" id="companyName" name="companyName" value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
                                </div>
                            </div>
                            <div className="col-lg-12 mt-2">
                                <div className="form-group text-left">
                                    <label htmlFor="jobTitle">Job Title</label>
                                    <input type="text" className="form-control" id="jobTitle" name="companyName" value={formData.jobTitle} onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}  />
                                </div>
                            </div>
                            <div className="col-lg-12 mt-2">
                                <div className="form-group text-left">
                                    <label htmlFor="startDate">Start Date</label>
                                    <input type="date" className="form-control" id="startDate" name="startDate" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}  />
                                </div>
                            </div>
                            <div className="col-lg-12 mt-2">
                                <div className="form-group text-left">
                                    <label htmlFor="endDate">End Date</label>
                                    <input type="date" className="form-control" id="endDate" name="endDate" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}  />
                                </div>
                            </div>
                            <div className="col-lg-12 mt-2">
                                <div className="form-group text-left">
                                    <label htmlFor="responsibilities">Responsibilities</label>
                                    <input type="text" className="form-control" id="responsibilities" name="responsibilities" value={formData.responsibilities} onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}  />
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
