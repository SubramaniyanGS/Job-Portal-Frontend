import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const Certifications= () => {
    const [show, setShow] = useState(false);
    const [certifications, setCertifications] = useState([]);
    console.log(certifications);
    const [formData, setFormData] = useState({
        certificationName: '',
        issuingOrganization: '',
        issuanceDate :''
    });



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEdit = (index) => {
        const selecteCertifications = certifications[index];
        setFormData({
            certificationName: selecteCertifications.certificationName,
            issuingOrganization: selecteCertifications.issuingOrganization,
            issuanceDate : selecteCertifications.issuanceDate

        });
        setShow(true); // Open the modal
    };

    
    

    const fetchCertifications= async () => {
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
            setCertifications(data.details.certifications || []);
        } catch (error) {
            console.error('Error fetching experiences:', error);
            // Handle error appropriately
        }
    };

    useEffect(() => {
        fetchCertifications();
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
            setCertifications([...certifications, formData]);
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
                        <h5 className="mb-4 text-uppercase text-left">
                            <i className="fa fa-briefcase greentext"></i> &nbsp; Certifications
                        </h5>
                    </div>
                    <div className="col-lg-6">
                        <i type="button" className="fa fa-edit" onClick={handleShow} style={{ float: 'right' }}></i>
                    </div>
                </div>

                {/* Experience List */}
                {certifications.map((certifications, index) => (
                    <div key={index} className="row text-left p-3">
                        <div className="col-lg-10 pb-2 pt-2">
                            <h5>{certifications.certificationName}</h5>
                            <strong>{certifications.issuingOrganization}</strong> 
                            <p><small>{certifications.issuanceDate.split('T')[0]}</small></p>
                        </div>
                        <div className="col-lg-2">
                            <Button className='btn greenbtn' onClick={() => handleEdit(index)}>Edit</Button>
                        </div>
                    </div>
                ))}


                {/* Add/Edit Experience Modal */}
                {show &&
                <Modal show={show} onHide={handleClose} size="lg" >
                    <Modal.Header closeButton>
                        <Modal.Title>Add Certifications</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Experience Form */}
                        <div className="row mt-2">
                            <div className="col-lg-12 mt-2">
                                <div className="form-group text-left">
                                    <label htmlFor="companyName">Certification Name</label>
                                    <input type="text" className="form-control" id="companyName" name="companyName" value={formData.certificationName}
                                        onChange={(e) => setFormData({ ...formData,certificationName: e.target.value })} />
                                </div>
                            </div>
                            <div className="col-lg-12 mt-2">
                                <div className="form-group text-left">
                                    <label htmlFor="jobTitle">Issuing Organization</label>
                                    <input type="text" className="form-control" id="jobTitle" name="companyName" value={formData.issuingOrganization} onChange={(e) => setFormData({ ...formData, issuingOrganization: e.target.value })}  />
                                </div>
                            </div>
                            <div className="col-lg-12 mt-2">
                                <div className="form-group text-left">
                                    <label htmlFor="jobTitle">Issuing Date</label>
                                    <input type="date" className="form-control" id="jobTitle" name="companyName" value={formData.issuanceDate} onChange={(e) => setFormData({ ...formData, issuanceDate: e.target.value })}  />
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
