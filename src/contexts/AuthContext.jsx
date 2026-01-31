/**
 * Authentication Context
 * Manages authentication state and user data across the app
 */
import { createContext, useContext, useState, useEffect } from 'react';
import authService from '@/services/authService';
import profileService from '@/services/profileService';
import { getErrorMessage } from '@/utils/errorMessages';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('scapet_token');
      const savedUser = localStorage.getItem('scapet_user');

      if (savedToken && savedUser) {
        try {
          setToken(savedToken);
          setUser(JSON.parse(savedUser));
          setIsAuthenticated(true);
          
          // Refresh user data from server
          const userData = await profileService.getMe();
          setUser(userData);
          localStorage.setItem('scapet_user', JSON.stringify(userData));
        } catch (error) {
          console.error('Failed to refresh user data:', error);
          // If token is invalid, clear auth state
          logout();
        }
      }
      
      setIsLoading(false);
    };

    initAuth();
  }, []);

  /**
   * Login user
   */
  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      
      // Save token
      const { access_token } = response;
      localStorage.setItem('scapet_token', access_token);
      setToken(access_token);
      
      // Fetch user profile
      const userData = await profileService.getMe();
      localStorage.setItem('scapet_user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      const errorMsg = getErrorMessage(error.message);
      return { success: false, error: errorMsg };
    }
  };

  /**
   * Register new user
   */
  const register = async (email, password, full_name) => {
    try {
      const response = await authService.register(email, password, full_name);
      
      // Save token
      const { access_token } = response;
      localStorage.setItem('scapet_token', access_token);
      setToken(access_token);
      
      // Fetch user profile
      const userData = await profileService.getMe();
      localStorage.setItem('scapet_user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      const errorMsg = getErrorMessage(error.message);
      return { success: false, error: errorMsg };
    }
  };

  /**
   * Logout user
   */
  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  /**
   * Refresh user profile data
   */
  const refreshProfile = async () => {
    try {
      const userData = await profileService.getMe();
      localStorage.setItem('scapet_user', JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error('Failed to refresh profile:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook to use auth context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
