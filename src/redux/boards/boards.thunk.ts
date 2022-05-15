import { createAsyncThunk } from '@reduxjs/toolkit';
import { boards } from '../../api/boards';
import { Board, MyKnownError } from './boards.types';

export const fetchBoards = createAsyncThunk<Array<Board>>(
  'boards/fetchBoards',
  async (props, thunkAPI) => {
    try {
      const res = await boards();
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as MyKnownError).response.data);
    }
  }
);
