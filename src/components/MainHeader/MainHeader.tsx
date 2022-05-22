import React, { useState } from 'react';
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
} from '@mui/material';
import { JustifySpaceBetween, MainHeaderWrapper } from './MainHeader.styles';
import { AlignCenter } from '../CommonComponents/CommonComponents';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../constants/common.dictionary';
import { LanguageSelect } from '../LanguageSelect/LanguageSelect';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../redux/auth/auth.slice';
import { fetchCreateBoard } from '../../redux/boards/boards.thunk';
import { store } from '../../redux/store';

export const MainHeader = ({ hide = true }: { hide?: boolean }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const editProfileHandler = (): void => {
    navigate(PATH.PROFILE);
  };

  const newBoardHandler = (): void => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setTitle('');
    setDescription('');
    setOpen(false);
  };

  const handleCreateBoard = () => {
    setOpen(false);
    store.dispatch(fetchCreateBoard({ title, description }));
    handleCloseDialog();
  };

  const logoutHandler = (): void => {
    localStorage.removeItem('authToken');
    dispatch(setAuth(false));
  };

  const header = (
    <>
      <MainHeaderWrapper>
        <JustifySpaceBetween>
          <AlignCenter>
            <Button color="primary" variant="contained" onClick={editProfileHandler}>
              <p>{t('Edit profile')}</p>
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={newBoardHandler}
              sx={{ marginLeft: 5 }}
            >
              <p> {t('Create new board')}</p>
            </Button>
            <LanguageSelect />
          </AlignCenter>
          <Button color="primary" variant="contained" onClick={logoutHandler}>
            <p>{t('Sign Out')}</p>
          </Button>
        </JustifySpaceBetween>
      </MainHeaderWrapper>
      <div>
        <Dialog open={open} onClose={handleCloseDialog}>
          <DialogTitle>
            <p>{t('Create New Board')}</p>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <p>{t('To create a new board, please enter board name here')}</p>
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              type="text"
              fullWidth
              value={title}
              variant="standard"
              onChange={(event) => setTitle(event?.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              type="text"
              fullWidth
              value={description}
              variant="standard"
              onChange={(event) => setDescription(event?.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>{t('Cancel')}</Button>
            <Button onClick={handleCreateBoard}>{t('Create')}</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );

  return (
    <>
      <Slide appear={false} direction="down" in={!hide}>
        <AppBar>{header}</AppBar>
      </Slide>
      <Slide appear={false} direction="down" in={hide}>
        <div>{header}</div>
      </Slide>
    </>
  );
};
