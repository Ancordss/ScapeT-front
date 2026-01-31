/**
 * Profile service
 * Handles user profile operations
 */
import apiClient from './api';

const profileService = {
  /**
   * Get current user profile
   * @returns {Promise<object>} User profile data
   */
  async getMe() {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  /**
   * Update user profile
   * @param {string} full_name - New full name
   * @returns {Promise<object>} Updated user profile
   */
  async updateProfile(full_name) {
    const response = await apiClient.put('/auth/me', {
      full_name,
    });
    return response.data;
  },

  /**
   * Change user password
   * @param {string} current_password - Current password
   * @param {string} new_password - New password
   * @returns {Promise<object>} Success message
   */
  async changePassword(current_password, new_password) {
    const response = await apiClient.post('/profile/change-password', {
      current_password,
      new_password,
    });
    return response.data;
  },
};

export default profileService;
