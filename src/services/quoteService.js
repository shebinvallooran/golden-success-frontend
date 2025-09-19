import { apiClient } from '../api/axiosInstance';

const createQuoteRequest = async (quoteData) => {
  try {
    const response = await apiClient.post('/quotes', quoteData);
    return response.data;
  } catch (error) {
    console.error('Error creating quote request:', error);
    throw error.response?.data || error.message;
  }
};

export const quoteService = {
  createQuoteRequest,
};
