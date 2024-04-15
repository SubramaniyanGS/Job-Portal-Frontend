import "./Footer.css";
import {Link} from 'react-router-dom';
import React from 'react';

const Footer = () => {
  return (
    <div className="Footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-5 col-12 ft-1">
          <Link to ='/home' className='footer-logo'>
          JOB <span>PORTAL</span></Link>
          <p>A job portal website is an online platform designed to connect job seekers with potential employers.
            It typically allows users to create profiles, upload resumes, and search for job opportunities based on various criteria. 
          </p>
          <div className="footer-icons">
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-x-twitter"></i>
          <i className="fa-brands fa-linkedin"></i>
          <i className="fa-brands fa-instagram"></i>
          </div>
          </div>
          
          <div className="col-md-6 col-lg-3 col-12 ft-2">
          <h3>Quick Links</h3>
          <ul>
          <li className="nav-item">
          <Link to = '/home' className='links' >Home</Link>
          </li>
          <li className="nav-item">
            <Link to = '/jobs' className='links' >Jobs</Link>
          </li>
          <li className="nav-item">
            <Link to = '/about' className='links'>About Us</Link>
          </li>
          <li className="nav-item">
          <Link to = '/contact' className='links'>Contact</Link>
          </li>
          </ul>
          </div>
       
          <div className="col-md-6 col-lg-4 col-12 ft-3">
            <h3>Contact Info</h3>
            <p><i className="fa-solid fa-phone-volume"></i>+91 9809894567</p>
            <p><i className="fa-solid fa-envelope"></i>jobportal@gmail.com</p>
            <p><i className="fa-solid fa-location-dot"></i>Chennai,India</p>
          </div>         
        </div>
      </div>
      <div className="last-Footer">
        <p>Designed By Unom Team 1</p>
      </div>
    </div>
  );
};

export default Footer;
