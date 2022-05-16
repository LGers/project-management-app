import { Box, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { Wrapper, Content, FooterWrapper, BodyWrapper } from '../../components/CommonComponents';
import { Footer } from '../../components/Footer';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../redux/store';
import { useTranslation } from 'react-i18next';
import { BoardCard } from '../../components/BoardCard';
import { MainHeader } from '../../components/MainHeader';
import { fetchBoards } from '../../redux/boards/boards.thunk';

export const Boards = () => {
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
            <h1>{t('Board Name ')}</h1>
          </Box>
          <p>Board</p>
          {boards.boards.map((board) => {
            return <BoardCard key={board.id} id={board.id} title={board.title} />;
          })}
        </Content>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </Wrapper>
    </BodyWrapper>
  );
};
