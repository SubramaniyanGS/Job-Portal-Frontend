import { Link} from 'react-router-dom';
import {React,useState} from 'react';
import {FaBars,FaTimes} from 'react-icons/fa'
import "./Navbar.css";
import { useAuth } from '../../AuthContext';

const Navbar = () => {

  const { user } = useAuth();

  const [icon,setIcon] = useState(false);
  

  const closeSideDrawer = () =>{
    setIcon(false)
  }

  const handleClick=()=>{
    setIcon(!icon)
  }

  return (
    <>
    <nav className='nav'>
      <Link to ='/home' className='nav-logo' onClick={closeSideDrawer}>
        JOB <span>PORTAL</span>
      </Link>
      <div className='menu-icon' onClick={handleClick}>
        {
          icon ? <FaTimes className='fa-Times' /> : <FaBars className='fa-bars' />
        }
      </div>
      <ul className={
        icon ? 'nav-menu active' : 'nav-menu'
      }>
        <li>
          <Link to = '/home' className='nav-links' onClick={closeSideDrawer}>Home</Link>
        </li>
        <li>
          <Link to = '/jobs' className='nav-links' onClick={closeSideDrawer}>Jobs</Link>
        </li>
        <li>
          <Link to = '/about' className='nav-links' onClick={closeSideDrawer}>About Us</Link>
        </li>
        <li>
          <Link to = '/contact' className='nav-links' onClick={closeSideDrawer}>Contact</Link>
        </li>
        {user && (
        <li>
        {user.role === 'jobSeeker' ? (
            <Link to="/jobseekerprofile" className="nav-links">
              <img src="/user-1177568-1@2x.png" className='profile-logo' alt="Profile" />
            </Link>
            ) : (
              <Link to="/employerprofile" className="nav-links">
              <img src="/user-1177568-1@2x.png" className='profile-logo' alt="Profile" />
            </Link> 
            )}
          </li>
          )}
      </ul>
    </nav>
    </>
    
  );
};

export default Navbar;