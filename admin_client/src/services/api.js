import axios from 'axios';

// Create an Axios instance with default configurations
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000', // API base URL
  headers: {
    'Content-Type': 'application/json', // Default content type
  },
  withCredentials: true, // Include credentials (cookies, etc.) in requests
});

// Add a request interceptor to include the token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken'); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to Authorization header
    }
    return config;
  },
  (error) => Promise.reject(error) // Handle request errors
);

// Export the API instance for use throughout the app
export default api;
