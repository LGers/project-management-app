import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import { Wrapper, Content, FooterWrapper, BodyWrapper } from '../../components/CommonComponents';
import { PATH } from '../../constants/common.dictionary';
import { Link } from 'react-router-dom';
import { Footer } from '../../components/Footer';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../redux/store';
import { useTranslation } from 'react-i18next';
import { BoardCard } from '../../components/BoardCard';
import { MainHeader } from '../../components/MainHeader';
import { fetchBoards, fetchCreateBoard } from '../../redux/boards/boards.thunk';

import { useScroll } from './useScroll';
import { DragBoard } from '../Boards/DragBoard/DragBoard';
import { Task } from '../../components/Task/Task';

export const MainPage = () => {
  const boards = useSelector((state: RootState) => state.boards);
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const [boardName, setBoardName] = useState('');

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBoardName(event.target.value);
  };

  const handleClose = () => {
    setBoardName('');
    setOpen(false);
  };

  const handleCreateNewBoard = () => {
    setBoardName('');
    store.dispatch(fetchCreateBoard({ title: boardName }));
    setOpen(false);
  };

  useEffect(() => {
    store.dispatch(fetchBoards());
  }, []);
  const ref = useRef();
  const trigger = useScroll(ref);

  return (
    <BodyWrapper>
      <Wrapper>
        <MainHeader hide={trigger} />
        <Content ref={ref as unknown as LegacyRef<HTMLDivElement>}>
          <Box sx={{ bgcolor: '#cfe8fc' }}>
            <h1>{t('Boards')}</h1>
          </Box>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{ marginLeft: 5 }}
          >
            <p> {t('Create new board')}</p>
          </Button>
          <DragBoard />
          {boards.boards.map((board) => {
            console.log('board:', board);
            return <BoardCard key={board.id} id={board.id} title={board.title} />;
          })}
          <Link to={PATH.WELCOME_PAGE}>Welcome Page</Link>
          <Link to={PATH.COLUMNS}>columns</Link>
          <Link to={PATH.BOARD}>Boards</Link>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your email address here. We will send
                updates occasionally.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                value={boardName}
                onChange={onTitleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleCreateNewBoard}>Create</Button>
            </DialogActions>
          </Dialog>
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
