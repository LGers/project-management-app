import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Board, Column, MyKnownError } from '../boards/boards.types';
import { BoardState, emptyBoard } from './board.types';
import { fetchBoard } from './board.thunk';

const initialState: BoardState = {
  isFetching: false,
  error: {
    message: '',
    statusCode: 0,
  },
  // boardData: {
  //   id: '',
  //   title: '',
  //   columns: [],
  // },
  // boardData: undefined,
  boardData: emptyBoard,
};

export const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setBoard: (state, action: PayloadAction<Board>) => {
      // state.boardData = action.payload;
      // state.boardData = {...state.boardData, action.payload};
    },
    setColumns: (state, action: PayloadAction<Column>) => {
      // state.boardData = action.payload;

      // state.boardData.columns = {
      //   ...state.boardData.columns,
      //   columns: [],
      // };
      state.boardData.columns = [...state.boardData.columns, action.payload];
      // {
      //   ...state.boardData.columns,
      //   columns: [],
      // };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.pending, (state) => {
      // pending(state);
      state.isFetching = true;
      state.error = initialState.error;
    });
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      state.isFetching = false;
      state.boardData = action.payload;
    });
    builder.addCase(fetchBoard.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload as MyKnownError;
    });
  },
});

export const { setColumns, setBoard } = boardSlice.actions;
export const boardReducer = boardSlice.reducer;
