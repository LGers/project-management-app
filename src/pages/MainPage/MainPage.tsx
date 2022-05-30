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
import { BoardCardSkeleton } from '../../components/BoardCardSkeleton';

export const MainPage = () => {
  const boards = useSelector((state: RootState) => state.boards);
  const { t } = useTranslation();

  useEffect(() => {
    store.dispatch(fetchBoards());
  }, []);
  const ref = useRef();
  const trigger = useScroll(ref);

  return (
    <BodyWrapper>
      <Wrapper>
        <MainHeader hide={trigger} />
        <Box sx={{ bgcolor: '#ebebeb', opacity: 0.8, pl: 2 }}>
          <h1>{t('Boards')}</h1>
        </Box>
        <Content ref={ref as unknown as LegacyRef<HTMLDivElement>}>
          {boards.isFetching && <BoardCardSkeleton />}
          {boards.boards.map((board) => {
            return <BoardCard key={board.id} {...board} />;
          })}
        </Content>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </Wrapper>
    </BodyWrapper>
  );
};
