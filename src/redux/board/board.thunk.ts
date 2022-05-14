import { createAsyncThunk } from '@reduxjs/toolkit';
import { boards, boardsId } from '../../api/boards';
import { Board, MyKnownError } from '../boards/boards.types';
// import { Board, MyKnownError } from './boards.types';

export const fetchBoard = createAsyncThunk<Board, string>(
  'board/fetchBoard',
  async (id, thunkAPI) => {
    try {
      const res = await boardsId(id);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as MyKnownError).response.data);
    }
  }
);
