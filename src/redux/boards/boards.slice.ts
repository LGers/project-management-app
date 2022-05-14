import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { fetchBoard, fetchBoards } from './boards.thunk';
import { fetchBoards } from './boards.thunk';
import { Board, BoardsState, MyKnownError } from './boards.types';
import { boardSlice } from '../board/board.slice';

const initialState: BoardsState = {
  isFetching: false,
  error: {
    message: '',
    statusCode: 0,
  },
  boards: [],
  // board: undefined,
};

const pending = (state: BoardsState) => {
  state.isFetching = true;
  state.error = initialState.error;
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    // setBoards: (state, action: PayloadAction<Board>) => {
    //   state.boards = [...state.boards, action.payload];
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.pending, (state) => {
      pending(state);
      // state.isFetching = true;
      // state.error = initialState.error;
    });
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      state.isFetching = false;
      state.boards = action.payload;
    });
    builder.addCase(fetchBoards.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload as MyKnownError;
    });

    // builder.addCase(fetchBoard.pending, (state) => {
    //   pending(state);
    //   // state.isFetching = true;
    //   // state.error = initialState.error;
    // });
    // builder.addCase(fetchBoard.fulfilled, (state, action) => {
    //   state.isFetching = false;
    //   state.board = action.payload;
    // });
    // builder.addCase(fetchBoard.rejected, (state, action) => {
    //   state.isFetching = false;
    //   state.error = action.payload as MyKnownError;
    // });
  },
});

export const {} = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
