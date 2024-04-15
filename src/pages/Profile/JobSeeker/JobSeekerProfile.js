import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import {PersonalInfo} from "./PersonalInfo";
import {ProfessionalInfo} from "./ProfessionalInfo";
import { ProjectsInfo } from './ProjectsInfo';
import { Skills } from './Skills';
import { Certifications } from './Certifications';
import '../Profile.css';


function JobSeekerProfile() {
  const [tab, setTab] = useState('personal-info');
  const [jobSeekerProfile, setJobSeekerProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleTab = (tab) => {
    setTab(tab);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
        } else {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp < currentTime) {
            navigate('/');
          }
        }

        const response = await fetch('https://job-portal-backend-u0t7.onrender.com/app/v1/profile/details', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setJobSeekerProfile(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProfileData();

    return () => {
      // Cleanup function (if necessary)
    };
  }, [navigate]); // Add navigate as a dependency

  return (
    
    <>
    <div className='profile'>
    {loading && <div class="d-flex justify-content-center align-items-center">
                  <div class="loader "></div>
                </div>}
      {error && <div>Error: {error}</div>}
      {jobSeekerProfile && (
            <div className="container-xxl py-5 ">
                <div className="container ">
                    <div className="row g-5 ">
                        <div className="col-lg-4 col-xl-4">
                            <div className="card-box text-center">
                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                     className="rounded-circle avatar-xl img-thumbnail" alt="profile-image"/>

                                <h4 className="mb-0">{jobSeekerProfile.data.firstName} {jobSeekerProfile.data.lastName}</h4>

                                {/*<button type="button"*/}
                                {/*        className="btn btn-success btn-xs waves-effect mb-2 waves-light">Follow*/}
                                {/*</button>*/}
                                {/*<button type="button"*/}
                                {/*        className="btn btn-danger btn-xs waves-effect mb-2 waves-light">Message*/}
                                {/*</button>*/}

                                <div className="mt-3">
                                    {/*<h4 className="font-13 text-uppercase">About Me :</h4>*/}
                                    <p className="text-muted font-13 mb-3">
                                    {jobSeekerProfile.data.additionalInformation} 
                                    </p>

                                </div>

                                <div>
                                    <button type="button"
                                      className="mb-1 btn btn-block btn-outline-secondary"
                                      onClick={() => handleTab('personal-info')}
                                    >
                                      Personal Information
                                    </button>
                                    <button type="button"
                                            className="mb-1 btn btn-block btn-outline-secondary"
                                            onClick={() => handleTab('professional-info')}>
                                        Professional Information
                                    </button>
                                    <button type="button"
                                            className="mb-1 btn btn-block btn-outline-secondary"
                                            onClick={() => handleTab('projects-info')}>
                                        Project Details
                                    </button>
                                    <br/>
                                    <button type="button"
                                            className="mb-1 btn btn-block btn-outline-secondary"
                                            onClick={() => handleTab('skills')}>
                                        Skills
                                    </button>
                                    <button type="button"
                                            className="mb-1 btn btn-block btn-outline-secondary"
                                            onClick={() => handleTab('certifications')}>
                                        Certifications
                                    </button>

                                    <button type="button"
                                            className="btn btn-block btn-outline-secondary"
                                            onClick={handleLogout}>
                                        Logout
                                    </button>
                                    
                                </div>
                            </div>

                            {/*<div className="card-box">*/}
                            {/*<h4 className="header-title">Skills</h4>*/}
                            {/*<p className="mb-3">Everyone realizes why a new common language would be desirable</p>*/}

                            {/*<div className="mt-2 pt-1">*/}
                            {/*    <h6 className="text-uppercase">ReactJs <span className="float-right">72%</span></h6>*/}
                            {/*    <div className="progress progress-sm m-0">*/}
                            {/*        <div className="progress-bar bg-purple" role="progressbar" aria-valuenow="72"*/}
                            {/*             aria-valuemin="0" aria-valuemax="100" style={{width: "72%"}}>*/}
                            {/*            <span className="sr-only">72% Complete</span>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*</div>*/}

                        </div>

                        <div className="col-lg-8 col-xl-8">
                            <div className="card-box">

                                {tab === 'personal-info' &&
                                    <PersonalInfo/>
                                }
                                {tab === 'professional-info' &&
                                    <ProfessionalInfo/>
                                }
                                {tab === 'projects-info' &&
                                    <ProjectsInfo/>
                                }
                                {tab === 'skills' &&
                                    <Skills/>
                                }
                                {tab === 'certifications' &&
                                    <Certifications/>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
      )}
      </div>
        </>
  )
}

export default JobSeekerProfile; 