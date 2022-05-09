import { instance } from './instance';
import { LoginInterface, SignUpInterface } from './lemaselloApi.types';

export const URL = {
  signIn: () => 'signin',
  signUp: () => 'signup',
};

export const signIn = ({ login, password }: LoginInterface) => {
  return instance.post(URL.signIn(), {
    login,
    password,
  });
};

export const signUp = ({ name, login, password }: SignUpInterface) => {
  return instance.post(URL.signUp(), {
    name,
    login,
    password,
  });
};
