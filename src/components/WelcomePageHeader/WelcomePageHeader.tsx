import { AppBar, Button, Slide, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { PATH } from '../../constants/common.dictionary';
import { useTranslation } from 'react-i18next';
import { LanguageSelect } from '../LanguageSelect/LanguageSelect';
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

const GoToMainPageButton = () => {
  const { t } = useTranslation();
  return (
    <Button variant="outlined" component={RouterLink} to={PATH.HOME} sx={{ margin: 1 }}>
      {t('Go to Main page')}
    </Button>
  );
};

export const WelcomePageHeader = ({ hide = true }: { hide?: boolean }) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const header = (
    <Toolbar>
      <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
        Lemasello
      </Typography>
      {isAuth ? <GoToMainPageButton /> : <AuthButtons />}
      <LanguageSelect />
    </Toolbar>
  );

  return (
    <>
      <Slide appear={false} direction="down" in={!hide}>
        <AppBar
          position="static"
          color="inherit"
          sx={{
            backgroundColor: '#cfe8fc',
          }}
        >
          {header}
        </AppBar>
      </Slide>

      <Slide appear={false} direction="down" in={hide}>
        <div style={{ marginTop: -64 }}>{header}</div>
      </Slide>
    </>
  );
};
