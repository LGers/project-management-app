import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginInterface, SignUpInterface } from '../../api';
import axios from 'axios';
import { signIn, signUp } from '../../api';
import { boards } from '../../api/boards';
import { users } from '../../api/users';

interface SignInData {
  token: string;
}

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
export const fetchUsers = createAsyncThunk<Array<Record<string, string>>>(
  'auth/fetchUsers',
  async (props, thunkAPI) => {
    try {
      const res = await users();
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

/*
  thunk
 */
export const fetchLoginWorks = createAsyncThunk(
  'auth/fetchLogin',
  async ({ login, password }: LoginInterface, thunkAPI) => {
    try {
      const res = await axios.post(`https://lemasello-api.herokuapp.com/signin`, {
        login,
        password,
      });
      return res.data;
    } catch (err) {
      const error = err as MyKnownError;
      return thunkAPI.rejectWithValue(error.response.data.message);
      return thunkAPI.rejectWithValue((err as MyKnownError).response.data.message);
    }
  }
);

// todo clear unused thunks
export const _fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async ({ login, password }: LoginInterface, thunkAPI) => {
    const res = await axios.post(`https://lemasello-api.herokuapp.com/signin`, {
      login,
      password,
    });
    return res.data;
  }
);

export const fetchLogin4 = createAsyncThunk(
  'auth/fetchLogin',
  async ({ login, password }: LoginInterface, thunkAPI) => {
    const res = await axios
      .post(`https://lemasello-api.herokuapp.com/signin`, {
        login,
        password,
      })
      .then((res) => {
        console.log(res);
        // return res;
      })
      .catch((e) => {
        console.log(e);
        return e;
      });
    console.log(res);
    return res;

    // return thunkAPI.rejectWithValue(error.response.data.message);
  }
);

interface MyData {
  token: string;
}

export const fetchLogin5 = createAsyncThunk<
  MyData,
  LoginInterface,
  {
    rejectValue: MyKnownError;
  }
>('auth/fetchLogin', async ({ login, password }: LoginInterface, thunkAPI) => {
  try {
    const res = await axios.post(`https://lemasello-api.herokuapp.com/signin`, {
      login,
      password,
    });
    return res.data;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return thunkAPI.rejectWithValue(error.response.data.message as MyKnownError);
  }
});

export const fetchLogin2 = createAsyncThunk(
  'auth/fetchLogin',
  async ({ login, password }: LoginInterface, thunkAPI) => {
    const res = await axios.get(`https://lemasello-api.herokuapp.com`, {});
    console.log(res);
    return res.data;
  }
);

export const fetchSignUp2 = createAsyncThunk(
  'auth/fetchLogin',
  async ({ name, login, password }: SignUpInterface, thunkAPI) => {
    const res = await axios.post(`https://young-peak-88549.herokuapp.com/signup/`, {
      name: 'name',
      login: 'sdf',
      password: 'sdf',
    });
    console.log(res);
    return res.data;
  }
);
