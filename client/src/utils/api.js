//api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Ensure cookies are sent with requests
});

export const fetchData = async (url, options = {}) => {
  try {
    const response = await api(url, options);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Log full error response for debugging
      console.error('API Error:', error.response);
      throw new Error(error.response.data.message || 'Something went wrong');
    } else {
      console.error('Network error:', error.message);
      throw new Error(error.message || 'Network error');
    }
  }
};

