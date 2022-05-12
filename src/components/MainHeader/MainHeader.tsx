import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { JustifySpaceBetween, MainHeaderWrapper } from './MainHeader.styles';
import { AlignCenter, ButtonPadding } from '../CommonComponents/CommonComponents';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../constants/common.dictionary';
import { useCreateBoardApi } from './useCreateBoardApi';

enum Language {
  RU = 'RU',
  EN = 'EN',
}

export const MainHeader = () => {
  const [language, setLanguage] = useState<Language>(Language.RU);
  const [open, setOpen] = useState<boolean>(false);
  const [boardName, setBoardName] = useState<string>('');
  const { createBoard } = useCreateBoardApi();

  const handleChange = (event: React.MouseEvent) => {
    const lang = (event.target as HTMLInputElement).value;
    setLanguage(lang as Language);
  };

  const navigate = useNavigate();

  const editProfileHandler = (): void => {
    navigate(PATH.PROFILE);
  };

  const newBoardHandler = (): void => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    setOpen(false);
    createBoard({ name: boardName });
  };

  const logoutHandler = (): void => {
    navigate(PATH.SIGN_OUT);
  };

  return (
    <>
      <MainHeaderWrapper>
        <JustifySpaceBetween>
          <AlignCenter>
            <ButtonPadding>
              <Button color="primary" variant="contained" onClick={editProfileHandler}>
                Edit profile
              </Button>
            </ButtonPadding>
            <ButtonPadding>
              <Button color="primary" variant="contained" onClick={newBoardHandler}>
                Create new board
              </Button>
            </ButtonPadding>
            <ButtonPadding>
              <ToggleButtonGroup color="primary" value={language} exclusive onChange={handleChange}>
                <ToggleButton value={Language.RU}>{Language.RU}</ToggleButton>
                <ToggleButton value={Language.EN}>{Language.EN}</ToggleButton>
              </ToggleButtonGroup>
            </ButtonPadding>
          </AlignCenter>
          <Button color="primary" variant="contained" onClick={logoutHandler}>
            Sign Out
          </Button>
        </JustifySpaceBetween>
      </MainHeaderWrapper>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create New Board</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a new board, please enter board name here.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Board Name"
              type="text"
              fullWidth
              value={boardName}
              variant="standard"
              onChange={(event) => setBoardName(event?.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleCreate}>Create</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};
