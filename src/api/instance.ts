import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://lemasello-api.herokuapp.com/',
});

instance.interceptors.request.use(async (request) => {
  request.headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  };
  return request;
});
