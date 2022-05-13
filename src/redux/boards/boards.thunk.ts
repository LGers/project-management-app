import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginInterface, SignUpInterface } from '../../api';
import { signIn, signUp } from '../../api';
import { boards } from '../../api/boards';

interface SignInData {
  token: string;
}

export const fetchBoards = createAsyncThunk<Array<Record<string, string>>, LoginInterface>(
  'boards/fetchBoards',
  async (_, thunkAPI) => {
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
