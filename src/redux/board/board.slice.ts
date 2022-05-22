import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Column, MyKnownError } from '../boards/boards.types';
import { BoardState, emptyBoard } from './board.types';
import { fetchBoard, fetchCreateColumn, fetchDeleteColumn, fetchUpdateColumn } from './board.thunk';

const initialState: BoardState = {
  isFetching: false,
  error: {
    message: '',
    statusCode: 0,
  },
  boardData: emptyBoard,
};

const pending = (state: BoardState) => {
  state.isFetching = true;
  state.error = initialState.error;
};

export const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setColumns: (state, action: PayloadAction<Column[]>) => {
      state.boardData.columns = action.payload;
    },
    setAddColumn: (state, action: PayloadAction<Column>) => {
      state.boardData.columns = [...state.boardData.columns, action.payload];
    },
    setDeleteColumn: (state, action: PayloadAction<string>) => {
      state.boardData.columns = state.boardData.columns.filter(
        (column) => column.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.pending, (state) => {
      pending(state);
    });
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      state.isFetching = false;
      state.boardData = action.payload;
    });
    builder.addCase(fetchBoard.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload as MyKnownError;
    });

    builder.addCase(fetchUpdateColumn.pending, (state) => {
      pending(state);
    });
    builder.addCase(fetchUpdateColumn.fulfilled, (state, action) => {
      state.isFetching = false;
    });
    builder.addCase(fetchUpdateColumn.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload as MyKnownError;
    });

    builder.addCase(fetchCreateColumn.pending, (state) => {
      pending(state);
    });
    builder.addCase(fetchCreateColumn.fulfilled, (state, action: PayloadAction<Column>) => {
      state.isFetching = false;
    });
    builder.addCase(fetchCreateColumn.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload as MyKnownError;
    });

    builder.addCase(fetchDeleteColumn.pending, (state) => {
      pending(state);
    });
    builder.addCase(fetchDeleteColumn.fulfilled, (state) => {
      state.isFetching = false;
    });
    builder.addCase(fetchDeleteColumn.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload as MyKnownError;
    });
  },
});

export const { setColumns, setAddColumn, setDeleteColumn } = boardSlice.actions;
export const boardReducer = boardSlice.reducer;
