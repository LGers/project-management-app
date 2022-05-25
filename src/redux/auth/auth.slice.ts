import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchLogin, fetchSignUp, fetchUsers } from './auth.thunk';
import { AuthState, Languages, MyKnownError, TokenData } from './auth.types';
import jwt_decode from 'jwt-decode';

const initialState: AuthState = {
  isAuth: true,
  isSignUp: false,
  language: 'en',
  isFetching: false,
  userId: '',
  users: [],
  error: {
    message: '',
    statusCode: 0,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setLanguage: (state, action: PayloadAction<Languages>) => {
      state.language = action.payload;
    },
    resetErrorMessage: (state) => {
      state.error = initialState.error;
    },
    resetIsSignUp: (state) => {
      state.isSignUp = false;
    },
    setUserId: (state) => {
      const token = localStorage.getItem('authToken') ?? '';
      try {
        state.userId = (jwt_decode(token) as TokenData).userId;
      } catch (e) {
        state.error.message = 'Authorization error';
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.isFetching = true;
      state.error = initialState.error;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      localStorage.setItem('authToken', action.payload.token);
      localStorage.setItem('login', action.meta.arg.login);
      state.userId = (jwt_decode(action.payload.token) as TokenData).userId;
      state.isFetching = false;
      state.isAuth = true;
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload as MyKnownError;
    });

    builder.addCase(fetchSignUp.pending, (state) => {
      state.isFetching = true;
      state.error = initialState.error;
    });
    builder.addCase(fetchSignUp.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSignUp = true;
    });
    builder.addCase(fetchSignUp.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload as MyKnownError;
    });

    builder.addCase(fetchUsers.pending, (state) => {
      state.isFetching = true;
      state.error = initialState.error;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isAuth = true;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isFetching = false;
      state.isAuth = false;
    });
  },
});

export const { setAuth, resetErrorMessage, resetIsSignUp, setLanguage, setUserId } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
