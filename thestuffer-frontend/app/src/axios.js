import axios from 'axios';
import { getToken } from './token';

let authBaseUrl = window.location.origin + '/auth';
let stuffBaseUrl = window.location.origin + '/ressources';

if (process.env.NODE_ENV === 'development') {
  console.log('development configuration');
  authBaseUrl = 'http://localhost:3002/';
  stuffBaseUrl = 'http://localhost:3001/';
}

const addAuthHeader = (data, headers) => {
  headers.Authorization = `Bearer ${getToken()}`;
  return data;
};

export const authInstance = axios.create({
  baseURL: authBaseUrl,
  withCredentials: true,
  transformRequest: [addAuthHeader, ...axios.defaults.transformRequest],
});

export const stuffInstance = axios.create({
  baseURL: stuffBaseUrl,
  withCredentials: true,
  transformRequest: [addAuthHeader, ...axios.defaults.transformRequest],
});
