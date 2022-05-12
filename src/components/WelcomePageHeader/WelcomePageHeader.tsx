import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { PATH } from '../../constants/common.dictionary';

export const WelcomePageHeader = () => {
  return (
    <AppBar position="static" color="inherit" sx={{ gap: '2opx' }}>
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Lemasello
        </Typography>
        <Button variant="outlined" component={RouterLink} to={PATH.LOG_IN} sx={{ margin: 1 }}>
          Login
        </Button>
        <Button variant="contained" component={RouterLink} to={PATH.SIGN_UP} sx={{ margin: 1 }}>
          Sign UP
        </Button>
      </Toolbar>
    </AppBar>
  );
};
