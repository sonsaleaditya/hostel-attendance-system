//attendance.js
import api from './api'; // Import the axios instance

// Fetch present students for a block
export const getBlockPresent = async (block) => {
  try {
    const response = await api.get(`/api/blocks/${block}/present`);
    return response.data; // Return the present students data
  } catch (error) {
    throw error;
  }
};

// Fetch absent students for a block
export const getBlockAbsent = async (block) => {
  try {
    const response = await api.get(`/api/blocks/${block}/absent`);
    return response.data; // Return the absent students data
  } catch (error) {
    throw error;
  }
};

// Fetch present students for a specific block on a specific date
export const getDatePresent = async (block, date) => {
  const response = await api.get(`/api/blocks/${block}/present/${date}`);
  return response.data;
};

// Fetch absent students for a specific block on a specific date
export const getDateAbsent = async (block, date) => {
  const response = await api.get(`/api/blocks/${block}/absent/${date}`);
  return response.data;
};

// Export functions for use in components
export default { 
  getBlockPresent, 
  getBlockAbsent, 
  getDatePresent, 
  getDateAbsent 
};
