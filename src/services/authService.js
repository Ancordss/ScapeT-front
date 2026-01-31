/**
 * Authentication service
 * Handles user registration, login, logout
 */
import apiClient from './api';

const authService = {
  /**
   * Register a new user
   * @param {string} email - User email
   * @param {string} password - User password (min 8 characters)
   * @param {string} full_name - User full name
   * @returns {Promise<object>} { access_token, token_type, expires_in }
   */
  async register(email, password, full_name) {
    const response = await apiClient.post('/auth/register', {
      email,
      password,
      full_name,
    });
    return response.data;
  },

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<object>} { access_token, token_type, expires_in }
   */
  async login(email, password) {
    const response = await apiClient.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  /**
   * Logout user (clears local storage)
   */
  logout() {
    localStorage.removeItem('scapet_token');
    localStorage.removeItem('scapet_user');
  },
};

export default authService;
