import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBoardById, updateBoard } from '../../api/boards';
import { Board, Column, MyKnownError } from '../boards/boards.types';
import { createColumn, deleteColumn, updateColumn } from '../../api/columns';

export const fetchBoard = createAsyncThunk<Board, string>(
  'board/fetchBoard',
  async (id, thunkAPI) => {
    try {
      const res = await getBoardById(id);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as MyKnownError).response.data);
    }
  }
);

export const fetchUpdateBoard = createAsyncThunk<Board, { boardId: string; title: string }>(
  'board/fetchUpdateBoard',
  async ({ boardId, title }, thunkAPI) => {
    try {
      const res = await updateBoard(boardId, title);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as MyKnownError).response.data);
    }
  }
);

export const fetchUpdateColumn1 = createAsyncThunk<
  Column,
  { boardId: string; columnId: string; title: string; order: number }
>('board/fetchUpdateBoard', async ({ boardId, columnId, title, order }, thunkAPI) => {
  try {
    const res = await updateColumn(boardId, columnId, title, order);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as MyKnownError).response.data);
  }
});

export const fetchUpdateColumn = createAsyncThunk<
  Column,
  { boardId: string; columnId: string; order: number; title: string }
>('board/fetchUpdateColumnTitle', async ({ boardId, title, columnId, order }, thunkAPI) => {
  try {
    const res = await updateColumn(boardId, columnId, title, order);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as MyKnownError).response.data);
  }
});

export const fetchCreateColumn = createAsyncThunk<Column, { boardId: string; title: string }>(
  'board/fetchCreateColumn',
  async ({ boardId, title }, thunkAPI) => {
    try {
      const res = await createColumn(boardId, title);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as MyKnownError).response.data);
    }
  }
);

export const fetchDeleteColumn = createAsyncThunk<Column, { boardId: string; columnId: string }>(
  'board/fetchDeleteColumn',
  async ({ boardId, columnId }, thunkAPI) => {
    try {
      const res = await deleteColumn(boardId, columnId);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as MyKnownError).response.data);
    }
  }
);
