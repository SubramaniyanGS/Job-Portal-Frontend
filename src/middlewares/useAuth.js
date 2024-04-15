import React from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const navigate = useNavigate();

    const isAuthenticated = () => {
        // Check if token exists in local storage
        const token = localStorage.getItem('token');
        console.log(token);
        return token !== null;
    };

    const requireAuth = () => {
        if (!isAuthenticated()) {
            // Redirect to login page if not authenticated
            navigate('/');
        }
    };

    return { isAuthenticated, requireAuth };
};

export default useAuth;
