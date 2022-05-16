import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { PATH } from '../../constants/common.dictionary';
import { useTranslation } from 'react-i18next';
import { LanguageSelect } from '../LanguageSelect/LanguageSelect';
import { SignOutButton } from '../SignOutButton/SignOutButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const AuthButtons = () => {
  const { t } = useTranslation();
  return (
    <>
      <Button variant="outlined" component={RouterLink} to={PATH.LOG_IN} sx={{ margin: 1 }}>
        {t('Sign In')}
      </Button>
      <Button variant="contained" component={RouterLink} to={PATH.SIGN_UP} sx={{ margin: 1 }}>
        {t('Sign Up')}
      </Button>
    </>
  );
};

export const WelcomePageHeader = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  return (
    <AppBar position="static" color="inherit" sx={{ gap: '2opx' }}>
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Lemasello
        </Typography>
        {isAuth ? <SignOutButton /> : <AuthButtons />}
        <LanguageSelect />
      </Toolbar>
    </AppBar>
  );
};
