import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const Skills = () => {
    const [show, setShow] = useState(false);
    const [skills, setSkills] = useState([]);
    const [formData, setFormData] = useState({
        skillName: '',
        proficiency: ''
    });
    const [selectedIndex, setSelectedIndex] = useState(null); // Track the index of the selected skill for editing

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEdit = () => {
        // Populate form data with all skills fetched from backend
        const allSkillsFormData = skills.map(skill => ({
            skillName: skill.skillName,
            proficiency: skill.proficiency
        }));
        setFormData(allSkillsFormData);
        setShow(true);
    };

    const fetchSkills = async () => {
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
            setSkills(data.details.skills || []);
        } catch (error) {
            console.error('Error fetching experiences:', error);
            // Handle error appropriately
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);


    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://job-portal-backend-u0t7.onrender.com/app/v1/profile/add-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ skills: [formData] }),
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            setSkills([...skills, formData]);
            handleClose();
        } catch (error) {
            console.error('Error updating user:', error);
            // Handle error appropriately
        }
    };


    const handleEditSave = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://job-portal-backend-u0t7.onrender.com/app/v1/profile/update-details', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ skills: [formData] }),
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            const updatedSkills = [...skills];
            updatedSkills[selectedIndex] = formData;
            setSkills(updatedSkills);
            handleClose();
        } catch (error) {
            console.error('Error updating user:', error);
            // Handle error appropriately
        }
    };

    const handleSkillNameChange = (e, index) => {
        const { value } = e.target;
        const updatedSkills = [...skills];
        updatedSkills[index] = { ...updatedSkills[index], skillName: value };
        setSkills(updatedSkills);
    };

    return (
        <>            <div>
            <div className="row">
                <div className="col-lg-6">
                    <h5 className="mb-4 text-uppercase text-left">
                        <i className="fa fa-briefcase"></i> &nbsp; Skills
                    </h5>
                </div>
                <div className="col-lg-6">
                    <i type="button" className="fa fa-edit" onClick={handleShow} style={{ float: 'right' }}></i>
                </div>
            </div>

            {/* Experience List */}
            {skills.map((skills, index) => (
                <div key={index} className="row text-left p-3">
                    <div className="col-lg-10">
                        <h5>{skills.skillName}</h5>
                        <strong>{skills.proficiency}</strong> <br />
                    </div>
                    <div className="col-lg-2">
                        <Button className='btn greenbtn' onClick={() => handleEdit()}>Edit</Button>
                    </div>
                </div>
            ))}


            {/* Add/Edit Experience Modal */}
            {show &&
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add Skills</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Experience Form */}
                    <div className="row mt-2">
                        <div className="col-lg-12 mt-2">
                            <div className="form-group text-left">
                                <label htmlFor="companyName">Skill Name</label>
                                <input type="text" className="form-control" id="companyName" name="companyName" value={formData.skillName}
                                    onChange={(e) => setFormData({ ...formData, skillName: e.target.value })} />
                            </div>
                        </div>
                        <div className="col-lg-12 mt-2">
                            <div className="form-group text-left">
                                <label htmlFor="jobTitle">Proficiency</label>
                                <input type="text" className="form-control" id="jobTitle" name="companyName" value={formData.proficiency} onChange={(e) => setFormData({ ...formData, proficiency: e.target.value })} />
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
    );
};
