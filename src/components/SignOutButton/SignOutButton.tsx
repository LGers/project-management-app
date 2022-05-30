import * as React from 'react';
import { Button } from '@mui/material';
import { setAuth } from '../../redux/auth/auth.slice';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

export const SignOutButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const logoutHandler = (): void => {
    localStorage.removeItem('authToken');
    dispatch(setAuth(false));
  };

  return (
    <div>
      <Button
        size={'small'}
        color="primary"
        variant="contained"
        onClick={logoutHandler}
        sx={{ height: '40px' }}
      >
        <p>{t('Sign Out')}</p>
      </Button>
    </div>
  );
};
