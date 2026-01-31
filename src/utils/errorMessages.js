/**
 * User-friendly error messages mapping
 */
export const errorMessages = {
  // Authentication errors
  'Invalid credentials': 'Email o contraseña incorrectos.',
  'User already exists': 'Este email ya está registrado.',
  'Invalid token': 'Tu sesión ha expirado. Por favor inicia sesión nuevamente.',
  'Token has expired': 'Tu sesión ha expirado. Por favor inicia sesión nuevamente.',
  
  // Credits errors
  'Insufficient credits': 'No tienes suficientes créditos para generar este viaje.',
  'Not enough credits': 'No tienes suficientes créditos para generar este viaje.',
  
  // Validation errors
  'Invalid email format': 'Por favor ingresa un email válido.',
  'Password too short': 'La contraseña debe tener al menos 8 caracteres.',
  'City name too short': 'El nombre de la ciudad debe tener al menos 2 caracteres.',
  'Too many days': 'El viaje no puede ser mayor a 14 días.',
  
  // Server errors
  'Internal server error': 'Error del servidor. Por favor intenta más tarde.',
  'Service unavailable': 'El servicio no está disponible. Por favor intenta más tarde.',
  'Request timeout': 'La solicitud tardó demasiado. Por favor intenta nuevamente.',
  'Rate limit exceeded': 'Has enviado demasiadas solicitudes. Por favor intenta más tarde.',
  
  // Network errors
  'Network Error': 'Error de conexión. Por favor verifica tu internet.',
  'No response from server. Please check your connection.': 'No hay respuesta del servidor. Verifica tu conexión.',
};

/**
 * Get user-friendly error message
 * @param {string} errorKey - Error key from backend
 * @returns {string} User-friendly error message
 */
export const getErrorMessage = (errorKey) => {
  return errorMessages[errorKey] || errorKey || 'Ocurrió un error inesperado.';
};

/**
 * Format validation errors from backend
 * @param {object} validationErrors - Validation errors from 422 response
 * @returns {object} Formatted errors object
 */
export const formatValidationErrors = (validationErrors) => {
  const formatted = {};
  
  if (Array.isArray(validationErrors)) {
    validationErrors.forEach((error) => {
      const field = error.loc?.[error.loc.length - 1] || 'general';
      formatted[field] = error.msg || 'Validation error';
    });
  }
  
  return formatted;
};
