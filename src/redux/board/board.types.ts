import { Board } from '../boards/boards.types';

export interface BoardState {
  isFetching: boolean;
  error: {
    message: string;
    statusCode: number;
  };
  boardData: Board;
}

//todo del it
export const emptyBoard: Board = {
  id: 'undefined',
  title: 'undefined',
  columns: [],
};
