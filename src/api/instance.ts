import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://lemasello-api.herokuapp.com/',
});
