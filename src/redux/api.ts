import axios from "axios";
 
export const URL = "http://localhost:4000/api/v1";
// Create axios instance
export const instance:any = axios.create({
// const instance:any = axios.create({
  baseURL: URL
});
// Helper function to read data from localStorage
const readData = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

// Logout process function
const initiateLogoutProcess = () => {
  localStorage.removeItem('LoginDetails');
  // You can add additional logout logic here
  console.log('Logout process initiated');
  // Redirect to login page if needed
  window.location.href = '/LoginScreen';
};

// Alert function
const ShowAlert = (message: string) => {
  alert(message);
};

// Request interceptor
instance.interceptors.request.use(
  async (config:any) => {
    config.headers['Content-Type'] = 'application/json';
    let LoginDetails = await readData("LoginDetails");
    if (LoginDetails?.token) {
      config.headers.Authorization = `Bearer ${LoginDetails.token}`;
    }
    return config;
  },
  (error:any) => {
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response:any) => {
    return response;
  },
  async (error:any) => {
    if (error.response?.status === 403) {
      ShowAlert('Session expired. Please login again.');
      setTimeout(() => {
        initiateLogoutProcess();
      }, 500);
    }
    return Promise.reject(error);
  }
);

