import axios from 'axios';
import { store } from '../store';
import { logout } from '../store/slices/authSlice';

// Create a reusable Axios instance with base configuration
const API = axios.create({
  // baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // allows cookies if backend uses them
});

//  REQUEST INTERCEPTOR
// - Runs before every request
// - Attaches Authorization header if token exists
API.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
// - If backend returns 401 (token expired or invalid)
//   → auto-logout user
API.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default API;
