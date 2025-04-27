import api from './api.js';

// Login admin
export const loginAdmin = async (credentials) => {
  try {
    const response = await api.post('/api/admin/login', credentials); // Send login credentials
    return response.data; // Return login response
  } catch (error) {
    console.error('Login error:', error.message);
    throw error; // Propagate error for further handling
  }
};

// Register a new admin
export const registerAdmin = async (adminData) => {
  try {
    const response = await api.post('/api/admin/signup', adminData); // Send admin registration data
    return response.data; // Return registration response
  } catch (error) {
    console.error('Registration error:', error.message);
    throw error; // Propagate error for further handling
  }
};

// Fetch current admin details
export const getAdminDetails = async () => {
  try {
    const response = await api.get('/api/admin/details'); // GET request to fetch current admin details
    return response.data; // Return admin details
  } catch (error) {
    console.error('Error fetching admin details:', error.message);
    throw error; // Propagate error for further handling
  }
};
