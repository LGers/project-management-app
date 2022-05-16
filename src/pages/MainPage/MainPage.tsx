import { Box } from '@mui/material';
import React, { LegacyRef, useEffect, useRef } from 'react';
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
import { useScroll } from './useScroll';
import { Task } from '../../components/Task/Task';

export const MainPage = () => {
  const boards = useSelector((state: RootState) => state.boards);
  const { t } = useTranslation();

  const ref = useRef();
  const trigger = useScroll(ref);

  useEffect(() => {
    store.dispatch(fetchBoards());
  }, []);

  return (
    <BodyWrapper>
      <Wrapper>
        <MainHeader hide={trigger} />
        <Content ref={ref as unknown as LegacyRef<HTMLDivElement>}>
          <Box sx={{ bgcolor: '#cfe8fc' }}>
            <h1>{t('Boards')}</h1>
          </Box>
          {boards.boards.map((board) => {
            console.log('board:', board);
            return <BoardCard key={board.id} id={board.id} title={board.title} />;
          })}
          <Link to={PATH.WELCOME_PAGE}>Welcome Page</Link>
          <Link to={PATH.COLUMNS}>columns</Link>
          <Link to={PATH.BOARD}>Boards</Link>
          <p>{JSON.stringify(boards.boards)}</p>
          <Task />
        </Content>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </Wrapper>
    </BodyWrapper>
  );
};
