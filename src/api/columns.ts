import { instance } from './instance';

export const URL = {
  boardsBoardIdColumns: (boardId: string) => `boards/${boardId}/columns`,
  boardsBoardIdColumnsColumnId: (boardId: string, columnId: string) =>
    `boards/${boardId}/columns/${columnId}`,
};

export const getAllColumns = (boardId: string) => {
  return instance.get(URL.boardsBoardIdColumns(boardId));
};

export const createColumn = (boardId: string, title: string, order: number) => {
  return instance.post(URL.boardsBoardIdColumns(boardId), { title, order });
};

export const getColumnById = (boardId: string) => {
  return instance.get(URL.boardsBoardIdColumns(boardId));
};

export const updateColumn = (boardId: string, columnId: string) => {
  return instance.put(URL.boardsBoardIdColumnsColumnId(boardId, columnId));
};

export const deleteColumn = (boardId: string, columnId: string) => {
  return instance.delete(URL.boardsBoardIdColumnsColumnId(boardId, columnId));
};
