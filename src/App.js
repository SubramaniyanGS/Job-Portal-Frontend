import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserLogin from './pages/Login/Users/userLogin';
import OTPverify from './pages/OTP/otp';
import UserSignup from './pages/Login/Users/userSignup';
import Adminlogin from './pages/Login/Admin/Adminlogin';
import EmployerDetails from './pages/Login/Employers/EmployerDetails';
import JobSeekerDetails from './pages/Login/JobSeeker/JobSeekerDetails';
import Navbar from './components/Navbar/Navbar';
import Shownavbar from './components/Navbar/Shownavbar';
import Home from './pages/Home/Home';
import Jobs from './pages/Jobs/Jobs';
import JobDetails from './pages/Jobs/JobDetails';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import JobSeekerProfile from './pages/Profile/JobSeeker/JobSeekerProfile';
import EmployerProfile from './pages/Profile/Employer/EmployerProfile';
import Footer from './components/Footer/Footer';
import Showfooter from './components/Footer/Showfooter';
import { AuthProvider } from './AuthContext';
import Dashboard from './pages/Admin/dashboard';
import Applications from './pages/Profile/Employer/Applications';

function App() {

  return (

    <Router>
      <AuthProvider>

        <Shownavbar>
          <Navbar />
        </Shownavbar>
        <Routes>
          <Route path='/' element={<UserLogin />} />
          <Route path='/verify' element={<OTPverify />} />
          <Route path='/usersignup' element={<UserSignup />} />
          <Route path='/adminlogin' element={<Adminlogin />} />

          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/employerdetails' element={<EmployerDetails />} />
          <Route path='/jobseekerdetails' element={<JobSeekerDetails />} />
          <Route path="/home" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path='/jobdetails/:id' element={<JobDetails />} />
          <Route path="/about" element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path="/jobseekerprofile" element={<JobSeekerProfile />} />
          <Route path="/employerprofile" element={<EmployerProfile />} />
          <Route path="/job/:jobId/applications" element={<Applications />} />
        </Routes>
        <Showfooter>
          <Footer />
        </Showfooter>
      </AuthProvider>
    </Router>

  );
}

export default App;

