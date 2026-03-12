import { useState, useCallback } from 'react';

/**
 * useAuth Hook
 * Manages authentication state and token management
 */
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );

  const login = useCallback((token, userId) => {
    localStorage.setItem('token', token);
    if (userId) {
      localStorage.setItem('userId', userId);
    }
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
  }, []);

  const getToken = useCallback(() => {
    return localStorage.getItem('token');
  }, []);

  const getUserId = useCallback(() => {
    return localStorage.getItem('userId');
  }, []);

  return {
    isAuthenticated,
    login,
    logout,
    getToken,
    getUserId,
  };
};

export default useAuth;
