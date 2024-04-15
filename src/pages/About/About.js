import React from 'react';
import { JobImg } from "../../assets";
import './About.css'

const About = () => {
  return (
    <div class="about-banner mx-auto d-flex flex-column gap-4 py-6 pt-5">
    <div className='container'>
    <div class="d-flex flex-column-reverse flex-md-row gap-4 items-center p-3">
      <div class="w-100 md:w-8/12 2xl:w-6/12">
        <h1 class="text-3xl font-weight-bold mb-4 about"><span className='ab'>About</span> Us</h1>
        <p class="text-justify fs-5">
          Discover exciting career opportunities with our job portal. At XYZ Job Portal, we are committed to connecting talented individuals with their dream jobs. Our platform provides a diverse range of job listings, from entry-level positions to executive roles, across various industries.
  
          Explore the possibilities, build your career, and take the next step towards professional success. Join us in shaping the future of employment and fostering a community where both employers and job seekers thrive.
  
          Start your journey with XYZ Job Portal today, where opportunities meet talent.
        </p>
      </div>
      <img src={JobImg} alt="About" className="about-img" />
    </div>
    <div class="fs-5 px-3 text-justify pb-5">
    <p class="text-justify fs-5">
      XYZ Job Portal is not just a job board; it's a gateway to your future. Our commitment goes beyond connecting job seekers with employers; we focus on creating meaningful connections that lead to long-lasting career satisfaction.

       <h3 className='about mt-3 mb-3'>Why choose XYZ Job Portal?</h3>
      <ul>
        <li className='mb-3'><strong className='about'>Comprehensive Job Listings:</strong> Access a wide array of job opportunities across various industries and sectors.</li>
        <li className='mb-3'><strong className='about'>Personalized Profiles:</strong> Build a standout profile that showcases your skills, experience, and aspirations.</li>
        <li className='mb-3'><strong className='about'>Career Resources:</strong> Explore valuable resources, tips, and insights to boost your career growth.</li>
        <li className='mb-3'><strong className='about'>Employer Partnerships:</strong> We collaborate with leading companies to bring you exclusive job opportunities.</li>
      </ul>

      <p class="text-justify fs-5">
        Join the XYZ Job Portal community and embark on a journey of professional growth. Your dream job awaits!

        <h3 className='about mt-3 mb-3'>Additional Details:</h3>
        <ul>
         <li className='mb-3'><strong className='about'>Location:</strong> We have job listings nationwide, providing opportunities in various cities and regions.</li>
         <li className='mb-3'><strong className='about'>Industry Focus:</strong> XYZ Job Portal caters to a wide range of industries, ensuring diverse job options for all professionals.</li>
         <li className='mb-3'><strong className='about'>Support and Guidance:</strong> Our team is dedicated to supporting you throughout your job search journey, providing guidance and assistance when needed.</li>
        </ul>
      </p>
    </p>
  </div>
  </div> 
  </div>
  

  );
};

export default About;