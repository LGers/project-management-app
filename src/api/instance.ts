import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:4000',
});

instance.interceptors.request.use(async (request) => {
  request.headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  };
  return request;
});
