import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [freeScreeningsLeft, setFreeScreeningsLeft] = useState(3);

  useEffect(() => {
    // Check for stored auth data on mount
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');
    const screenings = localStorage.getItem('freeScreeningsLeft');

    if (token && userData) {
      setUser(JSON.parse(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    if (screenings) {
      setFreeScreeningsLeft(parseInt(screenings));
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, user: userData } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (email, password, name) => {
    try {
      const response = await axios.post('/api/auth/register', { 
        email, 
        password, 
        name 
      });
      const { token, user: userData } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const useFreeScreening = () => {
    if (freeScreeningsLeft > 0) {
      const newCount = freeScreeningsLeft - 1;
      setFreeScreeningsLeft(newCount);
      localStorage.setItem('freeScreeningsLeft', newCount.toString());
      return true;
    }
    return false;
  };

  const canScreen = () => {
    return user?.isPremium || freeScreeningsLeft > 0;
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    freeScreeningsLeft,
    useFreeScreening,
    canScreen,
    isAuthenticated: !!user,
    isPremium: user?.isPremium || false
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};