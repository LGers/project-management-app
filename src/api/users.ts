import { instance } from './instance';

export const URL = {
  users: () => 'users',
};

export const users = () => {
  return instance.get(URL.users());
};
