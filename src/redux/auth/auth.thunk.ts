import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginInterface, SignUpInterface } from '../../api';
import { signIn, signUp } from '../../api';
import { deleteUser, getAllUsers, updateUser } from '../../api/users';
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

export const fetchUsers = createAsyncThunk<User[]>('auth/fetchUsers', async (props, thunkAPI) => {
  try {
    const res = await getAllUsers();
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as MyKnownError).response.data);
  }
});

export const fetchDeleteUser = createAsyncThunk(
  'auth/fetchDeleteUser',
  async ({ userId }: { userId: string }, thunkAPI) => {
    try {
      const res = await deleteUser(userId);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as MyKnownError).response.data);
    }
  }
);

export const fetchUpdateUser = createAsyncThunk(
  'auth/fetchUpdateUser',
  async (
    {
      userId,
      name,
      login,
      password,
    }: { userId: string; name: string; login: string; password: string },
    thunkAPI
  ) => {
    try {
      const res = await updateUser(userId, name, login, password);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as MyKnownError).response.data);
    }
  }
);
