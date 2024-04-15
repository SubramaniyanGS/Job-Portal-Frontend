import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const Company = () => {
    const [show, setShow] = useState(false);
    const [company, setCompany] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    console.log(company);
    const [formData, setFormData] = useState({
        companyName: '',
        companyDescription: '',
        companyWebsite: '',
        industry: ''
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEdit = () => {
        setFormData({
            companyName: company.companyName,
            companyDescription: company.companyDescription,
            companyWebsite: company.companyWebsite,
            industry: company.industry
        });
        setShow(true); // Open the modal
    };

    // Function to fetch company details
    const fetchCompanyDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://job-portal-backend-u0t7.onrender.com/app/v1/profile/details', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch company details');
            }

            const data = await response.json();
            setCompany(data.details || {}); // Assuming 'details' contains company details
        } catch (error) {
            console.error('Error fetching company details:', error);
            // Handle error appropriately
        }
    };

    useEffect(() => {
        fetchCompanyDetails();
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
                throw new Error('Failed to update company');
            }

            // Update company state with the new details
            setCompany(formData);
            setSuccessMessage('Company Details update successfully!');
            handleClose();
        } catch (error) {
            console.error('Error updating company:', error);
            // Handle error appropriately
        }
    };

    return (
        <>
            <div>
                <div className="row">
                    <div className="col-lg-6">
                        <h3 className="mb-2 text-uppercase text-left greentext">
                            <i className="fa fa-building "></i> &nbsp; Company Details
                        </h3>
                    </div>
                </div>

                <div className="row text-left p-3">
                    <div className="col-lg-12">
                        <h2 className='pb-4 '>{company.companyName}</h2>
                        <p className='h4 pb-4'><strong>Description:</strong> {company.companyDescription}</p>
                        <p className='h4 pb-4'><strong>Website:</strong> {company.companyWebsite}</p>
                        <p className='h4 pb-4'><strong>Industry:</strong> {company.industry}</p>
                    </div>
                </div>
                <div className="col-lg-6">
                        <Button className="btn greenbtn " onClick={handleEdit}>Edit</Button>
                        <div className='h5 text-success p-3'>{successMessage}</div>
                    </div>
                {show && 
                <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Company Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row mt-2">
                            <div className="col-lg-12 mt-2">
                                <div className="form-group text-left">
                                    <label htmlFor="companyName">Company Name</label>
                                    <input type="text" className="form-control" id="companyName" name="companyName" value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} />
                                </div>
                            </div>
                            <div className="col-lg-12 mt-2">
                                <div className="form-group text-left">
                                    <label htmlFor="companyDescription">Description</label>
                                    <input type="text" className="form-control" id="companyDescription" name="companyDescription" value={formData.companyDescription} onChange={(e) => setFormData({ ...formData, companyDescription: e.target.value })} />
                                </div>
                            </div>
                            <div className="col-lg-12 mt-2">
                                <div className="form-group text-left">
                                    <label htmlFor="companyWebsite">Website</label>
                                    <input type="text" className="form-control" id="companyWebsite" name="companyWebsite" value={formData.companyWebsite} onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })} />
                                </div>
                            </div>
                            <div className="col-lg-12 mt-2">
                                <div className="form-group text-left">
                                    <label htmlFor="industry">Industry</label>
                                    <input type="text" className="form-control" id="industry" name="industry" value={formData.industry} onChange={(e) => setFormData({ ...formData, industry: e.target.value })} />
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" className='btn greenbtn' onClick={handleSave}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                }
            </div>
        </>
    );
};
