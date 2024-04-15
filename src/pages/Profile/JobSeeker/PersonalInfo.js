import React, { useState, useEffect } from 'react';
import '../Profile.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const PersonalInfo = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});
  const [error,setError]= useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  console.log(user);
  const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      phoneNumber:'',
      role:''
  }); 
  const handleClose = () => setShow(false);

  const handleEdit = () => {
    setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
        phoneNumber:user.phoneNumber,
        role:user.role
    });
    setShow(true); // Open the modal
};

  const fetchUserDetails = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://job-portal-backend-u0t7.onrender.com/app/v1/profile/details', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch User details');
        }

        const data = await response.json();
        setUser(data.data || {}); // Assuming 'details' contains company details
    } catch (error) {
        console.error('Error fetching User details:', error);
        // Handle error appropriately
    }
};

const handleSave = async () => {
  try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://job-portal-backend-u0t7.onrender.com/app/v1/profile/update-user', {
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
      setUser(formData);
      setSuccessMessage('Personal Details update successfully!');
      handleClose();
  } catch (error) {
      console.error('Error updating company:', error);
      // Handle error appropriately
  }
};



  // Moved useEffect hook below to ensure data fetching occurs after component mounts
  useEffect(() => {
    fetchUserDetails();
  }, []);  // Empty dependency array to run once on component mount

  return (
    <>
      {error && <div>Error: {error}</div>}
      <div>
                <div className="row">
                    <div className="col-lg-6">
                        <h3 className="mb-2 text-uppercase text-left greentext">
                            <i className="fa fa-building "></i> &nbsp; Personal Info
                        </h3>
                    </div>
                </div>

                <div className="row text-left p-3">
                    <div className="col-lg-7">
                        <p className='pb-4 h4 '><strong>First Name:</strong> {user.firstName}</p>
                        </div>
                        <div className="col-lg-5">
                        <p className='h4 pb-4'><strong>Last Name:</strong> {user.lastName}</p>
                        </div>
                        <div className="col-lg-7">
                        <p className='h4 pb-4'><strong>Email:</strong> {user.email}</p>
                        </div>
                        <div className="col-lg-5">
                        <p className='h4 pb-4'><strong>Phone No:</strong> {user.phoneNumber}</p>
                        </div>
                        <div className="col-lg-7">
                        <p className='h4 pb-4'><strong>Address:</strong> {user.address}</p>
                        </div>
                        <div className="col-lg-5">
                        <p className='h4 pb-4'><strong>Role:</strong> {user.role}</p>
                        </div>
                   
                    <div className="col-lg-6">
                        <Button className="btn greenbtn " onClick={handleEdit}>Edit</Button>
                        <div className='h5 text-success p-3'>{successMessage}</div>
                    </div>
                    {show && 
                <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Personal Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row mt-2">
                            <div className="col-lg-12 mt-2">
                                <div className="form-group text-left">
                                    <label htmlFor="companyName">First Name</label>
                                    <input type="text" className="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                                </div>
                            </div>
                            <div className="col-lg-12 mt-2">
                                <div className="form-group text-left">
                                    <label htmlFor="companyDescription">Last Name</label>
                                    <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                                </div>
                            </div>
                            <div className="col-lg-12 mt-2">
                                <div className="form-group text-left">
                                    <label htmlFor="companyWebsite">Email</label>
                                    <input type="text" className="form-control" id="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                </div>
                            </div>
                            <div className="col-lg-12 mt-2">
                                <div className="form-group text-left">
                                    <label htmlFor="industry">Address</label>
                                    <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                                </div>
                            </div>
                            <div className="col-lg-12 mt-2">
                                <div className="form-group text-left">
                                    <label htmlFor="industry">Phone Number</label>
                                    <input type="text" className="form-control" id="phonenumber" name="phonenumber" value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} />
                                </div>
                            </div>
                            <div className="col-lg-12 mt-2">
                                <div className="form-group text-left">
                                    <label htmlFor="industry">Role</label>
                                    <input type="text" className="form-control" id="role" name="role" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
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
                
      </div>              
    </>
  );
};
