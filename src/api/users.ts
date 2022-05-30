import { instance } from './instance';

export const URL = {
  users: () => 'users',
  usersId: (id: string) => `users/${id}`,
};

export const getAllUsers = () => {
  return instance.get(URL.users());
};

export const getUserById = (userId: string) => {
  return instance.get(URL.usersId(userId));
};

export const deleteUser = (userId: string) => {
  return instance.delete(URL.usersId(userId));
};

export const updateUser = (userId: string, name: string, login: string, password: string) => {
  return instance.put(URL.usersId(userId), { name, login, password });
};
