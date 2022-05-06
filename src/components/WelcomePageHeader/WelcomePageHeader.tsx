import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';

export const WelcomePageHeader = () => {
  return (
    <AppBar position="static" color="inherit">
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Lemasello
        </Typography>
        <Button color="inherit">Log in</Button>
        <Button color="primary" variant="contained">
          Sign UP
        </Button>
      </Toolbar>
    </AppBar>
  );
};
