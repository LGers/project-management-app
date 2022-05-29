import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { WelcomePage } from './pages/WelcomePage';
import { PATH } from './constants/common.dictionary';
import { Page404 } from './pages/Page404';
import { CssBaseline } from '@mui/material';
import { MainPage } from './pages/MainPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from './redux/store';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Auth } from './pages/Auth/Auth';
import { ProtectedRouteProps } from './App.types';
import { setLanguage, setUserId } from './redux/auth/auth.slice';
import { useTranslation } from 'react-i18next';
import { fetchUsers } from './redux/auth/auth.thunk';
import { Boards } from './pages/Boards';
import { Languages } from './redux/auth/auth.types';
import { Board } from './pages/Board';
import { EditProfilePage } from './pages/EditProfilePage/EditProfilePage';

const ProtectedRoute = ({ isAuth, children }: ProtectedRouteProps) => {
  if (!isAuth) {
    return <Navigate to={PATH.HOME} replace />;
  }
  return children;
};

const homePage = (isAuth: boolean): ReactJSXElement => {
  if (isAuth) return <MainPage />;
  return <WelcomePage />;
};

export const App = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (localStorage.getItem('language')) {
      i18n.changeLanguage(localStorage.getItem('language') as Languages);
      dispatch(setLanguage(localStorage.getItem('language') as Languages));
    }
    dispatch(setUserId());
    store.dispatch(fetchUsers());
  }, []);

  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <Route path={PATH.HOME} element={homePage(auth.isAuth)} />
        <Route path={PATH.LOG_IN} element={<Auth formName={'signIn'} />} />
        <Route path={PATH.SIGN_UP} element={<Auth formName={'signUp'} />} />
        <Route path={PATH.SIGN_OUT} element={<Auth formName={'singOut'} />} />
        <Route path={PATH.WELCOME_PAGE} element={<WelcomePage />} />
        <Route
          path={PATH.PROFILE}
          element={
            <ProtectedRoute isAuth={isAuth}>
              <EditProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path={PATH.BOARD + ':id'}
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Board />
            </ProtectedRoute>
          }
        />
        <Route
          path={PATH.COLUMNS + ':id'}
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Boards />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};
