import { createAsyncThunk } from '@reduxjs/toolkit';
import { boards } from '../../api/boards';

export const fetchBoards = createAsyncThunk<Array<Record<string, string>>>(
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

export interface MyKnownError {
  message: string;
  statusCode: number;
  error: {
    message: string;
  };
  response: {
    data: {
      message: string;
    };
  };
}
