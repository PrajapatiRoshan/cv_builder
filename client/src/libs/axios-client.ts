import { CustomError } from '@/types/custom-error.type';
import axios from 'axios';
import baseURL from './base-url';

const options = {
  baseURL,
  withCredentials: true,
  timeout: 10000,
};

const API = axios.create(options);

API.interceptors.request.use(
  (config) => {
    const token = localStorage?.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { data } = error.response;
    const customeError: CustomError = {
      ...error,
      errorCode: data?.errorCode || 'UNKNOWN_ERROR',
    };
    return Promise.reject(customeError);
  }
);

export default API;

