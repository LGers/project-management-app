import { Box, Button, Card, CircularProgress, Paper, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Wrapper, Content, FooterWrapper, BodyWrapper } from '../../components/CommonComponents';
import { Footer } from '../../components/Footer';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../redux/store';
import { useTranslation } from 'react-i18next';
import { MainHeader } from '../../components/MainHeader';
import { fetchBoard, fetchCreateColumn, fetchUpdateBoard } from '../../redux/board/board.thunk';
import { useParams } from 'react-router-dom';
import { DragBoard } from './DragBoard/DragBoard';
import { BoardTitleField } from '../../components/BoardTitleField';
import { AddColumnDialog } from '../../components/AddColumnDialog';
import { ColumnSkeleton } from '../../components/ColumnSkeleton';
import { ErrorMessage } from '../../components/ErrorMessage';
import { TitleField } from '../../components/TitleField';
import { BeautifulDragBoard } from './BeautifulDragBoard';

export const Board = () => {
  const board = useSelector((state: RootState) => state.board.boardData);
  const isFetching = useSelector((state: RootState) => state.board.isFetching);
  const errorMessage = useSelector((state: RootState) => state.board.error.message);
  const { t } = useTranslation();
  const { id } = useParams();
  const [showAddColumnDialog, setShowAddColumnDialog] = useState(false);
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

  const addColumn = async (title: string) => {
    await store.dispatch(fetchCreateColumn({ boardId: board.id, title: title }));
    store.dispatch(fetchBoard(board.id));
  };

  return (
    <BodyWrapper>
      <Wrapper>
        <Content>
          <MainHeader />
          <Paper sx={{ bgcolor: '#ebebeb', opacity: 0.8, pl: 2, ml: 1, mr: 1, padding: 1 }}>
            <TitleField title={board.description} setField={setBoardDescription} />
            <Stack direction={'row'}>
              <BoardTitleField title={board.title} setField={setBoardTitle} />
              {isFetching && <CircularProgress />}
            </Stack>
            <BoardTitleField title={board.description} setField={setBoardDescription} />
          </Paper>
          {!board.title && <ColumnSkeleton />}
          <BeautifulDragBoard />
          {/*<DragBoard />*/}
          {/*<Button onClick={() => setShowAddColumnDialog(true)}>{t('Add column')}</Button>
          <AddColumnDialog
            itemName={t('column')}
            open={showAddColumnDialog}
            setOpen={setShowAddColumnDialog}
            addColumn={addColumn}
          />*/}
          <ErrorMessage errorMessage={errorMessage} />
          <FooterWrapper>
            <Footer />
          </FooterWrapper>
        </Content>
      </Wrapper>
    </BodyWrapper>
  );
};
