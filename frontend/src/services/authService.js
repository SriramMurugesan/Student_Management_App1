import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL.replace('/students', '/auth');

/**
 * Authentication Service
 * Handles login, signup, and logout logic.
 */
export const authService = {
  // LOGIN
  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  // SIGNUP
  signup: async (name, email, password) => {
    const response = await axios.post(`${API_URL}/signup`, { name, email, password });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  // LOGOUT
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },

  // GET CURRENT USER
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },

  // GET TOKEN
  getToken: () => {
    return localStorage.getItem('token');
  }
};
