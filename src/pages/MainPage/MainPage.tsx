import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { Wrapper, Content, FooterWrapper, BodyWrapper } from '../../components/CommonComponents';
import { PATH } from '../../constants/common.dictionary';
import { Link } from 'react-router-dom';
import { Footer } from '../../components/Footer';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../redux/store';
import { useTranslation } from 'react-i18next';
import { BoardCard } from '../../components/BoardCard';
import { MainHeader } from '../../components/MainHeader';
import { fetchBoards } from '../../redux/boards/boards.thunk';

export const MainPage = () => {
  // const auth = useSelector((state: RootState) => state.auth);
  const boards = useSelector((state: RootState) => state.boards);
  const { t } = useTranslation();

  useEffect(() => {
    store.dispatch(fetchBoards());
  }, []);

  return (
    <BodyWrapper>
      <Wrapper>
        <MainHeader />
        <Content>
          <Box sx={{ bgcolor: '#cfe8fc' }}>
            <h1>{t('Boards')}</h1>
          </Box>
          {boards.boards.map((board) => {
            return <BoardCard key={board.id} id={board.id} title={board.title} />;
          })}
          <Link to={PATH.WELCOME_PAGE}>Welcome Page</Link>
          <Link to={PATH.COLUMNS}>columns</Link>
          <Link to={PATH.BOARD}>Boards</Link>
          <p>{JSON.stringify(boards.boards)}</p>
        </Content>
        <FooterWrapper>
          {/* <p>Footer</p> */}
          <Footer />
        </FooterWrapper>
      </Wrapper>
    </BodyWrapper>
  );
};
