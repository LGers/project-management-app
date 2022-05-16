import { instance } from './instance';

export const URL = {
  boards: () => 'boards',
  boardsId: (id: string) => `boards/${id}`,
};

export const getAllBoards = () => {
  return instance.get(URL.boards());
};

export const createBoard = (title: string) => {
  return instance.post(URL.boards(), { title });
};

export const getBoardById = (boardId: string) => {
  return instance.get(URL.boardsId(boardId));
};

export const deleteBoard = (boardId: string) => {
  return instance.delete(URL.boardsId(boardId));
};

export const updateBoard = (boardId: string, title: string) => {
  return instance.put(URL.boardsId(boardId), { title });
};
