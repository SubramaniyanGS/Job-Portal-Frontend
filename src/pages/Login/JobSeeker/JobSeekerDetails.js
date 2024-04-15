import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './JobSeekerDetails.css'

const JobSeekerDetails = () => {
  const [education, setEducation] = useState('');
  const [yearOfExperience, setYearOfExperience] = useState('');
  const [resume, setResume] = useState(null);
  const [portfolio, setPortfolio] = useState('');
  const [projects, setProjects] = useState([{ projectName: '', description: '', technologiesUsed: '', projectUrl: '' }]);
  const [skills, setSkills] = useState([{ skillName: '', proficiency: '' }]);
  const [certifications, setCertifications] = useState([{ certificationName: '',  issuingOrganization: '' ,issuanceDate:''}]);
  const [jobPreferences, setJobPreferences] = useState([{ desiredJobTitle: '',  desiredLocation: '' ,desiredSalary:''}]);
  const [workHistory, setWorkHistory] = useState([{  jobTitle: '',  company: '' , startDate:'' , endDate:'' , responsibilities:''}]);
  const [additionalInformation, setAdditionalInformation] = useState('');
  
  
  
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Get the token from local storage
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []); // Run this effect only once on component mount

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  const handleJobPreferenceChange = (index, field, value) => {
    const updatedJobPreferences = [...jobPreferences];
    updatedJobPreferences[index][field] = value;
    setJobPreferences(updatedJobPreferences);
  };

  const handleWorkHistoryChange = (index, field, value) => {
    const updatedWorkHistory = [...workHistory];
    updatedWorkHistory[index][field] = value;
    setWorkHistory(updatedWorkHistory);
  };


  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index][field] = value;
    setSkills(updatedSkills);
  };
  const handleCertificationChange = (index, field, value) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index][field] = value;
    setCertifications(updatedCertifications);
  };

  //Adding array values

  const addJobPreferences = () => {
    setJobPreferences([...jobPreferences, {  desiredJobTitle: '',  desiredLocation: '' ,desiredSalary:''}]);
  };

  const addWrokHistory = () => {
    setWorkHistory([...workHistory, {  jobTitle: '',  company: '' , startDate:'' , endDate:'' , responsibilities:''}]);
  };

  const addProject = () => {
    setProjects([...projects, { projectName: '', description: '', technologiesUsed: '', projectUrl: '' }]);
  };

  const addCertification = () => {
    setCertifications([...certifications,{ certificationName: '',  issuingOrganization: '' ,issuanceDate:''} ]);
  };

  const addSkill = () => {
    setSkills([...skills, { skillName: '', proficiency: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('education', education);
    formData.append('yearOfExperience', yearOfExperience);
    formData.append('resume', resume);
    formData.append('portfolio', portfolio);
    formData.append('additionalInformation', additionalInformation);

    // Append projects and skills,certifications,workexperience

    jobPreferences.forEach((jobPreference, index) => {
        formData.append(`jobPreferences[${index}][desiredJobTitle]`, jobPreference.desiredJobTitle);
        formData.append(`jobPreferences[${index}][desiredLocation]`, jobPreference.desiredLocation);
        formData.append(`jobPreferences[${index}][desiredSalary]`, jobPreference.desiredSalary);
    });

    workHistory.forEach((workHistories, index) => {
      formData.append(`workHistory[${index}][jobTitle]`, workHistories.jobTitle);
      formData.append(`workHistory[${index}][company]`, workHistories.company);
      formData.append(`workHistory[${index}][startDate]`, workHistories.startDate);
      formData.append(`workHistory[${index}][endDate]`, workHistories.endDate);
      formData.append(`workHistory[${index}][responsibilities]`, workHistories.responsibilities);
    });

    projects.forEach((project, index) => {
        formData.append(`projects[${index}][projectName]`, project.projectName);
        formData.append(`projects[${index}][description]`, project.description);
        formData.append(`projects[${index}][technologies]`, project.technologies);
        formData.append(`projects[${index}][projectUrl]`, project.projectUrl);
    });

    skills.forEach((skill, index) => {
        formData.append(`skills[${index}][skillName]`, skill.skillName);
        formData.append(`skills[${index}][proficiency]`, skill.proficiency);
    });

    certifications.forEach((certification, index) => {
        formData.append(`certifications[${index}][certificationName]`, certification.certificationName);
        formData.append(`certifications[${index}][ issuingOrganization]`, certification. issuingOrganization);
        formData.append(`certifications[${index}][issuanceDate]`, certification.issuanceDate);
    });

    try {
      const response = await fetch('https://job-portal-backend-u0t7.onrender.com/app/v1/jobSeeker/jobSeeker-details', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Data submitted successfully:', data);
        navigate('/');
      } else {
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


    return (
      <div className='jobseeker template d-flex justify-content-center align-items-center w-100'>
        <div className='formed formcontainer  pt-3 pb-3 ps-5 pe-5 mt-5 mb-5 rounded bg-white'>
            <form onSubmit={handleSubmit}>
              <h1 className='text-center company'>Job Seeker Details</h1>
                <div className='row'>
                    <div className='col-lg-4 col-md-12'>
                        <div className='mb-2 mt-3'>
                            <label htmlFor="education">Education:</label>
                            <input placeholder='Enter Education(Current)' className='form-control mt-2' type="text" id="education" value={education}  onChange={(e) => setEducation(e.target.value)} />
                        </div>
                      </div>
                      <div className='col-lg-4 col-md-12'>
                        <div className='mb-2 mt-3'>
                            <label htmlFor="yearOfExperience">Experience:</label>
                            <input placeholder='Enter Year Of Experiences' className='form-control mt-2' type="text" id="yearOfExperience" value={yearOfExperience} onChange={(e) => setYearOfExperience(e.target.value)} />
                        </div>
                      </div>
                      <div className='col-lg-4 col-md-12'>
                        <div className='mb-2 mt-3'>
                            <label htmlFor="portfolio">Portfolio:</label>
                            <input placeholder='Enter Portfolio link' className='form-control mt-2' type="text" id="portfolio" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} />
                        </div>
                      </div>
                  </div>
                  <div className='mt-2'>
                      <label>Job Preferences:</label>
                      {jobPreferences.map((jobPreference, index) => (
                      <div key={index} className='mb-2 row'>
                        <div className="col-md-4">
                          <input
                          className='form-control mt-2'
                          type="text"
                          placeholder="Enter Job Title"
                          value={jobPreference.desiredJobTitle}
                          onChange={(e) => handleJobPreferenceChange(index, 'desiredJobTitle', e.target.value)}
                          />
                        </div>
                        <div className="col-md-4">
                          <input
                          className='form-control mt-2'
                          type="text"
                          placeholder="Enter Location"
                          value={jobPreference.desiredLocation}
                          onChange={(e) => handleJobPreferenceChange(index, 'desiredLocation', e.target.value)}
                          />
                        </div>
                        <div className="col-md-4">
                          <input
                          className='form-control mt-2'
                          type="number"
                          placeholder="Enter Salary"
                          value={jobPreference.desiredSalary}
                          onChange={(e) => handleJobPreferenceChange(index, 'desiredSalary', e.target.value)}
                          />
                        </div>
                    </div>
                    ))}
                    <div className='d-flex justify-content-end'>
                      <button className='btn submit-btn' type="button" onClick={addJobPreferences}>
                        Add
                      </button>
                    </div>
                  </div>
                  <div className='mb-2'>
                      <label>Work History:</label>
                      {workHistory.map((workHistories, index) => (
                      <div key={index} className='row mb-2'>
                        <div className="col-md-2">
                          <input
                          className='form-control mt-2'
                          type="text"
                          placeholder="Job Title"
                          value={workHistories.jobTitle}
                          onChange={(e) => handleWorkHistoryChange(index, 'jobTitle', e.target.value)}
                          />
                        </div>
                        <div className="col-md-2">
                          <input
                          className='form-control mt-2'
                          type="text"
                          placeholder="Company"
                          value={workHistories.company}
                          onChange={(e) => handleWorkHistoryChange(index, 'company', e.target.value)}
                          />
                        </div>
                        <div className="col-md-2">
                          <input
                          className='form-control mt-2'
                          type="date"
                          placeholder="Start Date"
                          value={workHistories.startDate}
                          onChange={(e) => handleWorkHistoryChange(index, 'startDate', e.target.value)}
                          />
                        </div>
                        <div className="col-md-2">
                          <input
                          className='form-control mt-2'
                          type="date"
                          placeholder="End Date"
                          value={workHistories.endDate}
                          onChange={(e) => handleWorkHistoryChange(index, 'endDate', e.target.value)}
                          />
                        </div>
                        <div className="col-md-4">
                          <input
                          className='form-control mt-2'
                          type="text"
                          placeholder=" Enter Responsibilities"
                          value={workHistories.responsibilities}
                          onChange={(e) => handleWorkHistoryChange(index, 'responsibilities', e.target.value)}
                          />
                        </div>
                </div>
              ))}
              <div className='d-flex justify-content-end'>
                <button className='btn submit-btn' type="button" onClick={addWrokHistory}>
                  Add
                </button>
              </div>
            </div>
                  <div className='mb-2'>
                      <label>Projects:</label>
                      {projects.map((project, index) => (
                      <div key={index} className='row mb-2'>
                        <div className="col-md-3">
                          <input
                          className='form-control mt-2'
                          type="text"
                          placeholder="Project Name"
                          value={project.projectName}
                          onChange={(e) => handleProjectChange(index, 'projectName', e.target.value)}
                          />
                        </div>
                        <div className="col-md-3">
                          <input
                          type='text'
                          className='form-control mt-2'
                          placeholder="Description"
                          value={project.description}
                          onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                          />
                        </div>
                        <div className="col-md-3">
                          <input
                          className='form-control mt-2'
                          type="text"
                          placeholder="Technologies"
                          value={project.technologies}
                          onChange={(e) => handleProjectChange(index, 'technologies', e.target.value)}
                          />
                        </div>
                        <div className="col-md-3">
                          <input
                          className='form-control mt-2'
                          type="text"
                          placeholder="Project URL"
                          value={project.projectUrl}
                          onChange={(e) => handleProjectChange(index, 'projectUrl', e.target.value)}
                          />
                        </div>
                </div>
              ))}
              <div className='d-flex justify-content-end'>
                <button className='btn submit-btn' type="button" onClick={addProject}>
                  Add
                </button>
              </div>
            </div>
            <div className='mb-2'>
              <label>Certifications:</label>
              {certifications.map((certification, index) => (
                <div key={index} className='row mb-2'>
                  <div className="col-md-4">
                    <input
                    className='form-control mt-2'
                      type="text"
                      placeholder="Certification Name"
                      value={certification.certificationName}
                      onChange={(e) => handleCertificationChange(index, 'certificationName', e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                    className='form-control mt-2'
                      type="text"
                      placeholder="Issued Organization"
                      value={certification.issuingOrganization}
                      onChange={(e) =>handleCertificationChange(index, 'issuingOrganization', e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                    className='form-control mt-2'
                      type="date"
                      placeholder="Issuance Date"
                      value={certification.issuanceDate}
                      onChange={(e) =>handleCertificationChange(index, 'issuanceDate', e.target.value)}
                    />
                  </div>
                </div>
              ))}
              <div className='d-flex justify-content-end'>
                <button className='btn submit-btn' type="button" onClick={addCertification}>
                  Add
                </button>
              </div>
            </div>
            <div className='mb-2'>
              <label>Skills:</label>
              {skills.map((skill, index) => (
                <div key={index} className='row mb-2'>
                  <div className="col-md-6">
                    <input
                    className='form-control mt-2'
                      type="text"
                      placeholder="Skill Name"
                      value={skill.skillName}
                      onChange={(e) => handleSkillChange(index, 'skillName', e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                    className='form-control mt-2'
                      type="text"
                      placeholder="Proficiency"
                      value={skill.proficiency}
                      onChange={(e) => handleSkillChange(index, 'proficiency', e.target.value)}
                    />
                  </div>
                </div>
              ))}
              <div className='d-flex justify-content-end'>
                <button className='btn submit-btn' type="button" onClick={addSkill}>
                  Add
                </button>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <div className='mb-2'>
                    <label htmlFor="additionalInformation">Additional Information:</label>
                    <input placeholder='About Me' className='form-control mt-2' type="text" id="additionalInformation" value={additionalInformation} onChange={(e) => setAdditionalInformation(e.target.value)} />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='mb-2'>
                    <label htmlFor="resume">Resume:</label>
                    <input className='form-control mt-2' type="file" id="resume" onChange={handleFileChange} />
                </div >
              </div>
              <div className='d-grid mt-3 mb-3'>
                <button className='btn submit-btn mt-2' type="submit">Submit</button>
              </div>
              </div>   
            </form>
        </div>
    </div>    
    );
};

export default JobSeekerDetails;
