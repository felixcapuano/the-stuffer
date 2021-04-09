import axios from 'axios';
import { getToken } from './token';

const addAuthHeader = (data, headers) => {
    headers.Authorization = `Bearer ${getToken()}`
    return data;
  }

const AUTH_HOST = process.env.REACT_APP_AUTH_HOST;
const AUTH_PORT = process.env.REACT_APP_AUTH_PORT;

export const authInstance = axios.create({
  baseURL: `http://${AUTH_HOST}:${AUTH_PORT}/`,
  withCredentials: true,
  transformRequest: [ addAuthHeader, ...axios.defaults.transformRequest]
})

const STUFF_HOST = process.env.REACT_APP_STUFF_HOST;
const STUFF_PORT = process.env.REACT_APP_STUFF_PORT;

export const stuffInstance = axios.create({
  baseURL: `http://${STUFF_HOST}:${STUFF_PORT}/`,
  withCredentials: true,
  transformRequest: [ addAuthHeader, ...axios.defaults.transformRequest]
})