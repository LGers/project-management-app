import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchLogin, fetchSignUp, fetchUsers } from './auth.thunk';
import { AuthState, Languages, MyKnownError } from './auth.types';

const initialState: AuthState = {
  isAuth: true,
  isSignUp: false,
  language: 'en',
  isFetching: false,
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.isFetching = true;
      state.error = initialState.error;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      localStorage.setItem('authToken', action.payload.token);
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
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isFetching = false;
      state.isAuth = false;
    });
  },
});

export const { setAuth, resetErrorMessage, resetIsSignUp, setLanguage } = authSlice.actions;

export const authReducer = authSlice.reducer;
