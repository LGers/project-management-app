import { _Board1, Board } from '../boards/boards.types';

export interface BoardState {
  isFetching: boolean;
  error: {
    message: string;
    statusCode: number;
  };
  // boardData: Board | undefined;
  boardData: Board;
}

export const emptyBoard1: Board = _Board1;
export const emptyBoard: Board = {
  id: 'undefined',
  title: 'undefined',
  columns: [],
};
