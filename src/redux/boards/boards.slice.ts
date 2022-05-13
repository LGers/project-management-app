import { createSlice } from '@reduxjs/toolkit';
import { fetchBoards, MyKnownError } from './boards.thunk';

export interface BoardsState {
  isFetching: boolean;
  error: {
    message: string;
    statusCode: number;
  };
  boards: Array<Record<string, string>>;
}

const initialState: BoardsState = {
  isFetching: false,
  error: {
    message: '',
    statusCode: 0,
  },
  boards: [],
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.pending, (state) => {
      state.isFetching = true;
      state.error = initialState.error;
    });
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      state.isFetching = false;
      state.boards = action.payload;
    });
    builder.addCase(fetchBoards.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload as MyKnownError;
    });
  },
});

export const boardsReducer = boardsSlice.reducer;
