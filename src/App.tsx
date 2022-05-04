import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WelcomePage } from './pages/WelcomePage';
import { PATH } from './constants/common.dictionary';
import { Page404 } from './pages/Page404';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.HOME} element={<WelcomePage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};
