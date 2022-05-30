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
  const [itemTitle, setItemTitle] = useState<string>('');
  const [itemDescription, setItemDescription] = useState<string>('');

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleCreateBoard = () => {
    setOpen(false);
    setItemTitle('');
    setItemDescription('');
    createItem(itemTitle, itemDescription);
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog}>
      <DialogTitle>
        <p>{t(`Create new ${itemName}`)}</p>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <p>{t(`Please enter ${itemName} name here`)}</p>
        </DialogContentText>
        <TextField
          autoFocus
          placeholder={t(`${itemName} title`)}
          margin="dense"
          id="item-title"
          type="text"
          fullWidth
          value={itemTitle}
          variant="standard"
          onChange={(event) => setItemTitle(event?.target.value)}
          sx={{ minWidth: '300px' }}
        />
        <TextField
          placeholder={t(`${itemName} description`)}
          margin="dense"
          id="item-description"
          type="text"
          fullWidth
          value={itemDescription}
          variant="standard"
          onChange={(event) => setItemDescription(event?.target.value)}
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
