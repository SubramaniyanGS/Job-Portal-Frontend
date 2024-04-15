import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [forceRender, setForceRender] = useState(false); // Dummy state for force render

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');

    if (storedToken) {
      const decodedToken = decodeToken(storedToken);

      if (decodedToken) {
        setUser(decodedToken);
      } else {
        // If decoding fails, clear localStorage and reset user
        logout();
      }
    }
  }, []);

  const login = async (token) => {
    try {
      // Simulate an asynchronous operation (e.g., fetching user details from an API)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Clear local storage before setting the new user information
      localStorage.removeItem('authToken');

      const decodedToken = decodeToken(token);

      if (decodedToken) {
        setUser(decodedToken);
        localStorage.setItem('authToken', token);
        setForceRender(prev => !prev); // Dummy state to force rerender
      } else {
        console.error('Failed to decode token. Token is invalid.');
        // Handle the case where decoding fails during login
        // You might want to show an error message or take other actions
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle the case where an error occurs during login
      // You might want to show an error message or take other actions
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    navigate('/'); 
    setForceRender(prev => !prev); // Dummy state to force rerender
  };

  const decodeToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log(payload);
      return payload;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
