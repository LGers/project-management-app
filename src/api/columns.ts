import { instance } from './instance';

export const URL = {
  boardsBoardIdColumns: (boardId: string) => `boards/${boardId}/columns`,
  boards_BoardId_Columns_ColumnId: (
    boardId: string,
    columnId: string,
    title?: string,
    order?: number
  ) => `boards/${boardId}/columns/${columnId}`,
};

export const getAllColumns = (boardId: string) => {
  return instance.get(URL.boardsBoardIdColumns(boardId));
};

export const createColumn = (boardId: string, title: string, order: number) => {
  return instance.post(URL.boardsBoardIdColumns(boardId), { title, order });
};

export const getColumnById = (boardId: string, columnId: string) => {
  return instance.get(URL.boards_BoardId_Columns_ColumnId(boardId, columnId));
};

export const deleteColumn = (boardId: string, columnId: string) => {
  return instance.delete(URL.boards_BoardId_Columns_ColumnId(boardId, columnId));
};

export const updateColumn = (boardId: string, columnId: string, title: string, order: number) => {
  return instance.put(URL.boards_BoardId_Columns_ColumnId(boardId, columnId, title, order), {
    title,
    order,
  });
};
