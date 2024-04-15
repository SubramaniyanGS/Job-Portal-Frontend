import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const ProjectsInfo= () => {
    const [show, setShow] = useState(false);
    const [projects, setProjects] = useState([]);
    console.log(projects);
    const [formData, setFormData] = useState({
        projectName: '',
        description: '',
        technologiesUsed: '',
        projectUrl: ''
    });



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEdit = (index) => {
        const selecteProjects = projects[index];
        setFormData({
            projectName: selecteProjects. projectName,
            description: selecteProjects.description,
            technologiesUsed: selecteProjects.technologiesUsed,
            projectUrl: selecteProjects.projectUrl
            
        });
        setShow(true); // Open the modal
    };

    
    

    const fetchProjects= async () => {
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
            setProjects(data.details.projects || []);
        } catch (error) {
            console.error('Error fetching experiences:', error);
            // Handle error appropriately
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);


    const handleSave = async (projectId) => {
        try {
            const token = localStorage.getItem('token');
            // Assuming you have the ID of the existing entry stored in a variable called projectId
            const response = await fetch(`https://job-portal-backend-u0t7.onrender.com/app/v1/profile/update-details`, {
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
    
            setProjects([...projects, formData]);
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
                            <i className="fa fa-briefcase"></i> &nbsp; Projects
                        </h5>
                    </div>
                    <div className="col-lg-6">
                        <i type="button" className="fa fa-edit" onClick={handleShow} style={{ float: 'right' }}></i>
                    </div>
                </div>

                {/* Experience List */}
                {projects.map((projects, index) => (
                    <div key={index} className="row text-left p-3">
                        <div className="col-lg-10">
                            <h5>{projects.projectName}</h5>
                            <strong>{projects.projectUrl}</strong> <br />
                            <small>{projects.description}</small>
                            <p>{projects.technologiesUsed}</p>
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
                        <Modal.Title>Add Projects</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Experience Form */}
                        <div className="row mt-2">
                            <div className="col-lg-12 mt-2">
                                <div className="form-group text-left">
                                    <label htmlFor="companyName">Project Title</label>
                                    <input type="text" className="form-control" id="companyName" name="companyName" value={formData.projectName}
                                        onChange={(e) => setFormData({ ...formData, projectName: e.target.value })} />
                                </div>
                            </div>
                            <div className="col-lg-12 mt-2">
                                <div className="form-group text-left">
                                    <label htmlFor="jobTitle">Project Url</label>
                                    <input type="text" className="form-control" id="jobTitle" name="companyName" value={formData.projectUrl} onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}  />
                                </div>
                            </div>
                            <div className="col-lg-12 mt-2">
                                <div className="form-group text-left">
                                    <label htmlFor="startDate">Description</label>
                                    <input type="text" className="form-control" id="startDate" name="startDate" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}  />
                                </div>
                            </div>
                            <div className="col-lg-12 mt-2">
                                <div className="form-group text-left">
                                    <label htmlFor="responsibilities">Technologies Used</label>
                                    <input type="text" className="form-control" id="responsibilities" name="responsibilities" value={formData.technologiesUsed} onChange={(e) => setFormData({ ...formData, technologiesUsed: e.target.value })}  />
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
