import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://golden-success-backend.onrender.com';

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`, // Replace with your API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Utility function to get full image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath; // Already a full URL
  return `${API_BASE_URL}${imagePath}`; // Add base URL to relative path
};

// Add request interceptor to include language in headers if needed
apiClient.interceptors.request.use((config) => {
  const language = localStorage.getItem('i18nextLng') || 'en';
  config.headers['Accept-Language'] = language;
  return config;
});

export const getCategories = async () => {
  try {
    const response = await apiClient.get('/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Get categories for home page (only required fields, no pagination)
export const getCategoriesForHome = async () => {
  try {
    const response = await apiClient.get('/categories/home');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories for home:', error);
    throw error;
  }
};

// Get simple categories list (only required fields, no pagination)
export const getCategoriesList = async (params = {}) => {
  try {
    const response = await apiClient.get('/categories/list', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching categories list:', error);
    throw error;
  }
};

// Get paginated products (for admin/management)
export const getProducts = async (params = {}) => {
  try {
    const response = await apiClient.get('/products/list', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get all products without pagination (for website display)
export const getProductList = async () => {
  try {
    const response = await apiClient.get('/products/list');
    return response.data;
  } catch (error) {
    console.error('Error fetching product list:', error);
    throw error;
  }
};

const apiService = {
  getCategories,
  getCategoriesForHome,
  getCategoriesList,
  getProducts,
  getProductList,
};

export default apiService;