import { CircularProgress, Paper, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Wrapper, Content, FooterWrapper, BodyWrapper } from '../../components/CommonComponents';
import { Footer } from '../../components/Footer';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../redux/store';
import { useTranslation } from 'react-i18next';
import { MainHeader } from '../../components/MainHeader';
import { fetchBoard, fetchUpdateBoard } from '../../redux/board/board.thunk';
import { useParams } from 'react-router-dom';
import { BoardTitleField } from '../../components/BoardTitleField';
import { ColumnSkeleton } from '../../components/ColumnSkeleton';
import { ErrorMessage } from '../../components/ErrorMessage';
import { BeautifulDragBoard } from './BeautifulDragBoard';

export const Board = () => {
  const board = useSelector((state: RootState) => state.board.boardData);
  const isFetching = useSelector((state: RootState) => state.board.isFetching);
  const errorMessage = useSelector((state: RootState) => state.board.error.message);
  const { t } = useTranslation();
  const { id } = useParams();
  useEffect(() => {
    store.dispatch(fetchBoard(id ?? ''));
  }, []);

  const setBoardTitle = (title: string) => {
    store
      .dispatch(fetchUpdateBoard({ boardId: board.id, title, description: board.description }))
      .then(() => {
        store.dispatch(fetchBoard(board.id));
      });
  };

  const setBoardDescription = (description: string) => {
    store
      .dispatch(fetchUpdateBoard({ boardId: board.id, title: board.title, description }))
      .then(() => {
        store.dispatch(fetchBoard(board.id));
      });
  };

  return (
    <BodyWrapper>
      <Wrapper>
        <Content>
          <MainHeader />
          <Paper sx={{ bgcolor: '#ebebeb', opacity: 0.8, pl: 2, ml: 1, mr: 1, padding: 1 }}>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
              <Typography variant={'h4'} sx={{ width: 220 }}>
                {t('Board')}:{' '}
              </Typography>
              <BoardTitleField title={board.title} setField={setBoardTitle} />
              {isFetching && <CircularProgress />}
            </Stack>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
              <Typography variant={'h4'} sx={{ width: 220 }}>
                {t('Description')}:{' '}
              </Typography>
              <BoardTitleField title={board.description} setField={setBoardDescription} />
            </Stack>
          </Paper>
          {!board.title && <ColumnSkeleton />}
          <BeautifulDragBoard />
          <ErrorMessage errorMessage={errorMessage} />
          <FooterWrapper>
            <Footer />
          </FooterWrapper>
        </Content>
      </Wrapper>
    </BodyWrapper>
  );
};
