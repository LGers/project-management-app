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
import { Board } from '../../components/Board/Board';

export const MainPage = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const boards = useSelector((state: RootState) => state.boards);
  const { t } = useTranslation();
  return (
    <BodyWrapper>
      <Wrapper>
        <WelcomePageHeader />
        <Content>
          <Box sx={{ bgcolor: '#cfe8fc' }}>
            <h1>{t('MainPage Title')}</h1>
          </Box>
          <Link to={PATH.WELCOME_PAGE}>Welcome Page</Link>
          <Link to={PATH.COLUMNS}>columns</Link>
          <Link to={PATH.BOARDS}>Boards</Link>
          <p>Is Auth?: </p>
          {auth.isAuth ? <p>Is Auth</p> : <p>NOT Auth</p>}
          <p>{JSON.stringify(boards.boards)}</p>
          <Board boards={boards.boards} />
        </Content>
        <FooterWrapper>
          <p>Footer</p>
        </FooterWrapper>
      </Wrapper>
    </BodyWrapper>
  );
};
