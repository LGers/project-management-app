import { Box } from '@mui/material';
import React from 'react';
import {
  Wrapper,
  Content,
  FooterWrapper,
  BodyWrapper,
} from '../../components/CommonComponents/CommonComponents';
import { PATH } from '../../constants/common.dictionary';
import { WelcomePageHeader } from '../../components/WelcomePageHeader';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTranslation } from 'react-i18next';

export const MainPage = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation();
  return (
    <BodyWrapper>
      <Wrapper>
        <WelcomePageHeader />
        <Content>
          <Box sx={{ bgcolor: '#cfe8fc' }}>
            <h1>{t('mainPage.title')}</h1>
          </Box>
          <Link to={PATH.WELCOME_PAGE}>Welcome Page</Link>
          <Link to={PATH.COLUMNS}>columns</Link>
          <Link to={PATH.BOARDS}>Boards</Link>
          <p>Is Auth?: </p>
          {auth.isAuth ? <p>Is Auth</p> : <p>NOT Auth</p>}
        </Content>
        <FooterWrapper>
          <p>Footer</p>
        </FooterWrapper>
      </Wrapper>
    </BodyWrapper>
  );
};
