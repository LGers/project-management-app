import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WelcomePage } from './pages/WelcomePage';
import { PATH } from './constants/common.dictionary';
import { Page404 } from './pages/Page404';
import { CssBaseline } from '@mui/material';
import { MainPage } from './pages/MainPage';

export const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <Route path={PATH.HOME} element={<MainPage />} />
        <Route path={PATH.WELCOME_PAGE} element={<WelcomePage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};
