import React from 'react';
import { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';

const Shownavbar=({children})=> {

    const location=useLocation();

    const [showNavbar,setShowNavbar]=useState(false);
     
    useEffect(()=>{
        if(location.pathname === '/' ||
         location.pathname === '/usersignup' ||
         location.pathname === '/employerdetails' ||
         location.pathname === '/jobseekerdetails' ||
         location.pathname === '/adminlogin' ||
         location.pathname === '/dashboard' ||
         location.pathname === '/verify'){
            setShowNavbar(false);
        }else{
            setShowNavbar(true);
        }
    },[location])   
  return (
    <div>{showNavbar && children}</div>
  )
}

export default Shownavbar;