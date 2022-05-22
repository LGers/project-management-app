import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginInterface, SignUpInterface } from '../../api';
import { signIn, signUp } from '../../api';
import { getAllUsers } from '../../api/users';
import { MyKnownError, SignInData, User } from './auth.types';

export const fetchLogin = createAsyncThunk<SignInData, LoginInterface>(
  'auth/fetchLogin',
  async ({ login, password }: LoginInterface, thunkAPI) => {
    try {
      const res = await signIn({ login, password });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as MyKnownError).response.data);
    }
  }
);

export const fetchSignUp = createAsyncThunk(
  'auth/fetchSignUp',
  async ({ name, login, password }: SignUpInterface, thunkAPI) => {
    try {
      const res = await signUp({ name, login, password });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as MyKnownError).response.data);
    }
  }
);

// todo types
export const fetchUsers = createAsyncThunk<User[]>('auth/fetchUsers', async (props, thunkAPI) => {
  try {
    const res = await getAllUsers();
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as MyKnownError).response.data);
  }
});
