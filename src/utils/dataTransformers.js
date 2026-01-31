/**
 * Data transformation utilities for frontend <-> backend communication
 */

/**
 * Interest mapping from UI-friendly names to backend enums
 */
export const interestMapping = {
  'Photography': 'culture',
  'Art & Museums': 'culture',
  'Beaches': 'nature',
  'Mountains': 'nature',
  'Wildlife': 'nature',
  'Architecture': 'history',
  'Local Cuisine': 'food',
  'Wine Tasting': 'food',
  'Hiking': 'nature',
  'Water Sports': 'nature',
  'Music & Concerts': 'culture',
  'Festivals': 'culture',
  'Historical Sites': 'history',
  'Street Food': 'food',
  'Yoga & Wellness': 'relaxation',
  'Shopping': 'shopping',
  'Nightlife': 'nightlife',
  'Adventure': 'adventure',
};

/**
 * Calculate number of days from date range
 * @param {object} dateRange - { from: Date, to: Date }
 * @returns {number} Number of days
 */
export const calculateDays = (dateRange) => {
  if (!dateRange?.from || !dateRange?.to) return 0;
  
  const timeDiff = dateRange.to - dateRange.from;
  const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end day
  return days;
};

/**
 * Calculate credit cost based on number of days
 * @param {number} days - Number of days
 * @returns {number} Credit cost
 */
export const calculateCreditCost = (days) => {
  if (days >= 15) return 350 + (days - 14) * 25; // 350 + extra for each day beyond 14
  if (days >= 10) return 250;
  return 100; // 1-9 days
};

/**
 * Transform questionnaire form data to backend API format
 * @param {object} formData - Frontend form data
 * @returns {object} Backend API format
 */
export const transformToApiRequest = (formData) => {
  const days = calculateDays(formData.dateRange);
  
  // Map selected interests to backend enums
  const mappedInterests = formData.selectedInterests
    .map(interest => interestMapping[interest])
    .filter(Boolean); // Remove undefined values
  
  // Combine with trip types (already in backend format)
  const allInterests = [...new Set([...mappedInterests, ...formData.tripTypes])];
  
  // Transform dislikes string to array
  let dislikesArray = null;
  if (formData.dislikes && formData.dislikes.trim()) {
    // Split by comma, semicolon, or newline and clean up
    dislikesArray = formData.dislikes
      .split(/[,;\n]+/)
      .map(item => item.trim())
      .filter(item => item.length > 0);
    
    // If empty after processing, set to null
    if (dislikesArray.length === 0) {
      dislikesArray = null;
    }
  }
  
  return {
    city: formData.destination,
    days: days,
    interests: allInterests.slice(0, 8), // Backend limit is 8
    budget: formData.budgetLevel || 'medium',
    travel_type: formData.travelType || 'solo',
    dislikes: dislikesArray,
  };
};

/**
 * Validate form data before submission
 * @param {object} formData - Frontend form data
 * @param {number} userCredits - User's available credits
 * @returns {object} { isValid: boolean, errors: object }
 */
export const validateQuestionnaire = (formData, userCredits) => {
  const errors = {};
  
  // Validate destination
  if (!formData.destination || formData.destination.trim().length < 2) {
    errors.destination = 'El destino debe tener al menos 2 caracteres';
  }
  if (formData.destination && formData.destination.length > 100) {
    errors.destination = 'El destino no puede tener más de 100 caracteres';
  }
  
  // Validate dates
  if (!formData.dateRange?.from || !formData.dateRange?.to) {
    errors.dateRange = 'Debes seleccionar las fechas del viaje';
  } else {
    const days = calculateDays(formData.dateRange);
    if (days > 14) {
      errors.dateRange = 'El viaje no puede ser mayor a 14 días';
    }
    if (days < 1) {
      errors.dateRange = 'El viaje debe ser de al menos 1 día';
    }
  }
  
  // Validate interests - count unique interests after mapping
  const mappedInterests = formData.selectedInterests
    .map(interest => interestMapping[interest])
    .filter(Boolean);
  const uniqueInterests = new Set([...mappedInterests, ...formData.tripTypes]);
  const totalUniqueInterests = uniqueInterests.size;
  
  if (totalUniqueInterests === 0) {
    errors.interests = 'Debes seleccionar al menos un interés';
  }
  if (totalUniqueInterests > 8) {
    errors.interests = `No puedes seleccionar más de 8 intereses únicos en total (tienes ${totalUniqueInterests})`;
  }
  
  // Validate budget
  if (!formData.budgetLevel && !formData.budget) {
    errors.budget = 'Debes seleccionar un presupuesto';
  }
  
  // Validate travel type
  if (!formData.travelType) {
    errors.travelType = 'Debes seleccionar el tipo de viaje';
  }
  
  // Validate credits
  if (formData.dateRange?.from && formData.dateRange?.to) {
    const days = calculateDays(formData.dateRange);
    const cost = calculateCreditCost(days);
    if (userCredits < cost) {
      errors.credits = `No tienes suficientes créditos. Necesitas ${cost} créditos, tienes ${userCredits}`;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
