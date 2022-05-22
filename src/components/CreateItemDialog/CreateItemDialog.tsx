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
import { CreateItemDialogProps } from './CreateItemDialog.types';

export const CreateItemDialog = ({
  itemName,
  open,
  setOpen,
  createItem,
}: CreateItemDialogProps) => {
  const { t } = useTranslation();
  const [fieldValue, setFieldValue] = useState<string>('');

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleCreateBoard = () => {
    setOpen(false);
    setFieldValue('');
    createItem(fieldValue);
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog}>
      <DialogTitle>
        <p>{t(`Create New Board`)}</p>
        <p>{t(`Create New ${itemName}`)}</p>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <p>{t('To create a new board, please enter board name here')}</p>
          <p>{t(`Please enter ${itemName} name here`)}</p>
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          type="text"
          fullWidth
          value={fieldValue}
          variant="standard"
          onChange={(event) => setFieldValue(event?.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>{t('Cancel')}</Button>
        <Button onClick={handleCreateBoard}>{t('Create')}</Button>
      </DialogActions>
    </Dialog>
  );
};
