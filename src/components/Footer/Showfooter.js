import React from 'react';
import { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';

const Showfooter=({children})=> {

    const location=useLocation();

    const [showFooter,setShowFooter]=useState(false);
     
    useEffect(()=>{
        if(location.pathname === '/' ||
        location.pathname === '/usersignup' ||
        location.pathname === '/employerdetails' ||
        location.pathname === '/jobseekerdetails' ||
        location.pathname === '/adminlogin' ||
        location.pathname === '/dashboard' ||
        location.pathname === '/verify'){
            setShowFooter(false);
        }else{
            setShowFooter(true);
        }
    },[location])   
  return (
    <div>{showFooter && children}</div>
  )
}

export default Showfooter;