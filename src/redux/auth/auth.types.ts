export interface SignInData {
  token: string;
}

export type Languages = 'en' | 'ru';

export interface AuthState {
  isAuth: boolean;
  isSignUp: boolean;
  language: Languages;
  isFetching: boolean;
  error: {
    message: string;
    statusCode: number;
  };
}

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
