import { instance } from './instance';

export const URL = {
  boards: () => 'boards',
  boardsId: (id: string) => `boards/${id}`,
};

export const boards = () => {
  return instance.get(URL.boards());
};

export const createBoard = (title: string) => {
  return instance.post(URL.boards(), { title });
};
