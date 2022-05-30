import axios from 'axios';

export const instance = axios.create({
  // baseURL: 'http://localhost:4000/',
  // baseURL: 'https://lemasello-api.herokuapp.com/',
  baseURL: 'https://lema-api.herokuapp.com/',
});

instance.interceptors.request.use(async (request) => {
  request.headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  };
  return request;
});
