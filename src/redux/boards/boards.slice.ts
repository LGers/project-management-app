import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchBoards, MyKnownError } from './boards.thunk';

export type Languages = 'en' | 'ru';

export interface BoardsState {
  isAuth: boolean;
  isSignUp: boolean;
  language: Languages;
  isFetching: boolean;
  error: {
    message: string;
    statusCode: number;
  };
  boards: Array<Record<string, string>>;
}

const initialState: BoardsState = {
  isAuth: false,
  isSignUp: false,
  language: 'en',
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
  reducers: {
    // setAuth: (state, action: PayloadAction<boolean>) => {
    //   state.isAuth = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.pending, (state) => {
      console.log('fetchBoards pending');
      state.isFetching = true;
      state.error = initialState.error;
    });
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      console.log('fetchBoards fulfilled');
      // console.log('action: ', action);
      state.isFetching = false;
      state.boards = action.payload;
    });
    builder.addCase(fetchBoards.rejected, (state, action) => {
      // console.log('fetchBoards rejected');
      state.isFetching = false;
      state.error = action.payload as MyKnownError;
    });
  },
});

// export const {  } = boardsSlice.actions;

export const boardsReducer = boardsSlice.reducer;
