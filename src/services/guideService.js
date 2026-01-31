/**
 * Guide generation service
 * Handles travel guide generation
 */
import apiClient from './api';
import { transformToApiRequest } from '@/utils/dataTransformers';

const guideService = {
  /**
   * Generate travel guide
   * @param {object} formData - Frontend form data or transformed API request
   * @returns {Promise<object>} Guide response with itinerary
   */
  async generateGuide(formData) {
    // If formData has 'destination' field, it's frontend format - transform it
    let requestData = formData;
    if (formData.destination) {
      requestData = transformToApiRequest(formData);
    }
    
    // Guide generation can take a long time (AI processing)
    // Set a longer timeout (5 minutes = 300000ms)
    const response = await apiClient.post('/generate-guide', requestData, {
      timeout: 300000, // 5 minutes
    });
    return response.data;
  },
};

export default guideService;
