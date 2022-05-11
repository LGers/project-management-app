import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchLogin, fetchSignUp, MyKnownError } from './auth.thunk';

export type Languages = 'en' | 'ru';

export interface AuthState {
  isAuth: boolean;
  isSignUp: boolean;
  language: Languages;
  error: {
    message: string;
    statusCode: number;
  };
}

const initialState: AuthState = {
  isAuth: false,
  isSignUp: false,
  language: 'en',
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
      console.log('pending');
      state.error = initialState.error;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      console.log('fulfilled');
      console.log('action: ', action);
      localStorage.setItem('authToken', action.payload.token);
      state.isAuth = true;
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      console.log('rejected');
      console.log('action: ', action);
      console.log('action.payload: ', action.payload);
      state.error = action.payload as MyKnownError;
    });

    builder.addCase(fetchSignUp.pending, (state) => {
      console.log('pending');
      state.error = initialState.error;
    });
    builder.addCase(fetchSignUp.fulfilled, (state, action) => {
      console.log('fulfilled');
      console.log('action: ', action);
      state.isSignUp = true;
    });
    builder.addCase(fetchSignUp.rejected, (state, action) => {
      console.log('rejected');
      console.log('action: ', action);
      console.log('action.payload: ', action.payload);
      state.error = action.payload as MyKnownError;
    });
  },
});

export const { setAuth, resetErrorMessage, resetIsSignUp, setLanguage } = authSlice.actions;

export const authReducer = authSlice.reducer;
