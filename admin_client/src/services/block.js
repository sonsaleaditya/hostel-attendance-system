// block.js
import api from './api'

// Fetch block-wise present students for today
export const getPresentStudentsByBlock = async (block) => {
  try {
    const response = await api.get(`/api/blocks/${block}/present`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch block-wise absent students for today
export const getAbsentStudentsByBlock = async (block) => {
  try {
    const response = await api.get(`/api/blocks/${block}/absent`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBlockPresent = async (block) => {
  try {
    const response = await api.get(`/api/blocks/${block}/present`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch absent students for the block
export const getBlockAbsent = async (block) => {
  try {
    const response = await api.get(`/api/blocks/${block}/absent`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {getBlockAbsent, getBlockPresent, getPresentStudentsByBlock, getAbsentStudentsByBlock };
