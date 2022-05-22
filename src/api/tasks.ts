import { instance } from './instance';

export const URL = {
  createTask: (boardId: string, columnId: string) => `boards/${boardId}/columns/${columnId}/tasks`,
};

export const createTask = (
  boardId: string,
  columnId: string,
  title: string,
  description: string,
  userId: string
) => {
  return instance.post(URL.createTask(boardId, columnId), { title, description, userId });
};
