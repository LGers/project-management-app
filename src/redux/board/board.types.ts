import { Board } from '../boards/boards.types';

export interface BoardState {
  isFetching: boolean;
  error: {
    message: string;
    statusCode: number;
  };
  boardData: Board;
}

export const emptyBoard: Board = {
  id: '',
  title: '',
  columns: [],
};
