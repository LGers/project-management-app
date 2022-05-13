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
import { Languages, setLanguage } from './redux/auth/auth.slice';
import { useTranslation } from 'react-i18next';
import { fetchBoards } from './redux/boards/boards.thunk';

const ProtectedRoute = ({ isAuth }: ProtectedRouteProps): ReactJSXElement => {
  if (!isAuth) {
    return <Navigate to={PATH.HOME} replace />;
  }
  return <MainPage />;
};

const homePage = (isAuth: boolean): ReactJSXElement => {
  if (isAuth) return <MainPage />;
  return <WelcomePage />;
};

export const App = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (localStorage.getItem('language')) {
      i18n.changeLanguage(localStorage.getItem('language') as Languages);
      dispatch(setLanguage(localStorage.getItem('language') as Languages));
      store.dispatch(fetchBoards({ login: 'data.userLogin', password: 'data.password' }));
    }
  }, []);

  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <Route path={PATH.HOME} element={homePage(auth.isAuth)} />
        <Route path={PATH.LOG_IN} element={<Auth formName={'signIn'} />} />
        <Route path={PATH.SIGN_UP} element={<Auth formName={'signUp'} />} />
        <Route element={<ProtectedRoute isAuth={auth.isAuth} />}>
          <Route path={PATH.HOME} element={<MainPage />} />
          <Route path={PATH.COLUMNS} element={<MainPage />} />
          <Route path={PATH.BOARDS} element={<MainPage />} />
          <Route path={PATH.PROFILE} element={<MainPage />} />
        </Route>

        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};
