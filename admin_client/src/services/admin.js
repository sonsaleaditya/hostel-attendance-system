// src/services/admin.js
import api from './api';

// Admin login
export const loginAdmin = async (credentials) => {
  try {
    const response = await api.post('/api/admin/login', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Admin registration
export const registerAdmin = async (adminData) => {
  try {
    const response = await api.post('/api/admin/signup', adminData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Admin logout
export const logoutAdmin = () => {
  localStorage.removeItem('adminToken'); // Remove token
};

export default { loginAdmin, registerAdmin, logoutAdmin };
