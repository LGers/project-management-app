import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllBoards } from '../../api/boards';
import { Board, MyKnownError } from './boards.types';

export const fetchBoards = createAsyncThunk<Array<Board>>(
  'boards/fetchBoards',
  async (props, thunkAPI) => {
    try {
      const res = await getAllBoards();
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as MyKnownError).response.data);
    }
  }
);
