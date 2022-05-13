import { instance } from './instance';

export const URL = {
  boards: () => 'boards',
};

export const boards = () => {
  return instance.get(URL.boards());
};
