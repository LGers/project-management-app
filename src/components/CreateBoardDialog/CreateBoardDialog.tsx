import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CreateBoardDialogProps } from './CreateBoardDialog.types';

export const CreateBoardDialog = ({
  itemName,
  open,
  setOpen,
  createBoard,
}: CreateBoardDialogProps) => {
  const { t } = useTranslation();
  const [boardTitle, setBoardTitle] = useState<string>('');
  const [boardDescription, setBoardDescription] = useState<string>('');

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleCreateBoard = () => {
    setOpen(false);
    setBoardTitle('');
    createBoard(boardTitle, boardDescription);
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog}>
      <DialogTitle>
        <p>{t(`Create new board`)}</p>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <p>{t('To create a new board, please enter board name here')}</p>
        </DialogContentText>
        <TextField
          placeholder={t('Board title')}
          autoFocus
          margin="dense"
          id="board-title"
          type="text"
          fullWidth
          value={boardTitle}
          variant="standard"
          onChange={(event) => setBoardTitle(event?.target.value)}
          sx={{ minWidth: '300px' }}
        />
        <TextField
          placeholder={t('Board description')}
          margin="dense"
          id="board-description"
          type="text"
          fullWidth
          value={boardDescription}
          variant="standard"
          onChange={(event) => setBoardDescription(event?.target.value)}
          sx={{ minWidth: '300px' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>{t('Cancel')}</Button>
        <Button onClick={handleCreateBoard}>{t('Create')}</Button>
      </DialogActions>
    </Dialog>
  );
};
