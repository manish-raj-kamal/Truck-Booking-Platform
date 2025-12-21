import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          // Decode token for basic info/validation
          const decoded = jwtDecode(token);

          // Fetch full user profile to ensure we have avatar and latest data
          // This is crucial because avatar is no longer in the JWT to keep it small
          const response = await api.get('/api/users/me');
          const fullUser = { ...decoded, ...response.data };

          setUser(fullUser);
          localStorage.setItem('user', JSON.stringify(fullUser));
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          // If 401, the interceptor might have already handled it, but good to be safe
          // Only logout if it's a token error
          if (error.response?.status === 401 || error.name === 'InvalidTokenError') {
            logout();
          }
        }
      }
    };

    fetchUser();
  }, [token]);

  function login(t) {
    setToken(t);
    localStorage.setItem('token', t);
    // User will be updated by the useEffect triggering on token change
  }

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  return <AuthContext.Provider value={{ token, user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

