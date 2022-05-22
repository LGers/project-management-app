import { instance } from './instance';

export const URL = {
  createTask: (boardId: string, columnId: string) => `boards/${boardId}/columns/${columnId}/tasks`,
  updateTask: (boardId: string, columnId: string, taskId: string) =>
    `boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
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
export const updateTask = (
  boardId: string,
  columnId: string,
  taskId: string,
  title: string,
  description: string,
  userId: string,
  order: number
) => {
  return instance.put(URL.updateTask(boardId, columnId, taskId), {
    title,
    description,
    userId,
    boardId,
    order,
  });
};
