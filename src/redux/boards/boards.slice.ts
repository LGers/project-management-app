import { createSlice } from '@reduxjs/toolkit';
import { fetchUpdateBoard } from '../board/board.thunk';
import { fetchBoards, fetchCreateBoard, fetchDeleteBoard } from './boards.thunk';
import { BoardsState, MyKnownError } from './boards.types';

const initialState: BoardsState = {
  isFetching: false,
  error: {
    message: '',
    statusCode: 0,
  },
  boards: [],
};

const pending = (state: BoardsState) => {
  state.isFetching = true;
  state.error = initialState.error;
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.pending, (state) => {
      pending(state);
    });
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      state.isFetching = false;
      state.boards = action.payload.reverse();
    });
    builder.addCase(fetchBoards.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload as MyKnownError;
    });

    builder.addCase(fetchCreateBoard.pending, (state) => {
      pending(state);
    });
    builder.addCase(fetchCreateBoard.fulfilled, (state, action) => {
      state.isFetching = false;
      state.boards = [...state.boards, action.payload];
    });
    builder.addCase(fetchCreateBoard.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload as MyKnownError;
    });

    builder.addCase(fetchUpdateBoard.pending, (state) => {
      pending(state);
    });
    builder.addCase(fetchUpdateBoard.fulfilled, () => {});
    builder.addCase(fetchUpdateBoard.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload as MyKnownError;
    });

    builder.addCase(fetchDeleteBoard.pending, (state) => {
      pending(state);
    });
    builder.addCase(fetchDeleteBoard.fulfilled, () => {});
    builder.addCase(fetchDeleteBoard.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload as MyKnownError;
    });
  },
});

export const {} = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
