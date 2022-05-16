import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBoardById } from '../../api/boards';
import { Board, MyKnownError } from '../boards/boards.types';

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
