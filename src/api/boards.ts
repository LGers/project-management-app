import { instance } from './instance';
import { LoginInterface, SignUpInterface } from './lemaselloApi.types';

export const URL = {
  boards: () => 'boards',
};

export const boards = () => {
  return instance.get(URL.boards());
};
