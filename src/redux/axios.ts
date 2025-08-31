import axios from 'axios';
 import {instance, URL} from './api';
// import instance from './api';


// Auth API functions using the instance from api.ts
export const UseLogin = async (credentials: { EMAIL: string; PASSWORD: string }) => {
  const response = await axios.post(URL+'/users/login', credentials);
  return response.data;
}

// export const UseLogin = async (credentials: { EMAIL: string; PASSWORD: string }) => {
//   const response = await axios.post('http://localhost:4000/api/v1/users/login', credentials);
//   return response.data;
// }


export const UseCreateAccount = async (userData: {
  FIRST_NAME: string;
  LAST_NAME: string;
  EMAIL: string;
  MOBILE: string;
  PASSWORD: string;
  ROLE: string;
}) => {
  const response = await instance.post('/users/signup', userData);
  return response.data;
}

export const getZerodhaProfile = async () => {
  const response = await instance.get('/zerodha/profile');
  return response.data;
}
