import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

type Props = {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  itemTitle: string;
  itemName: string;
  deleteItem: () => void;
};

export const ConfirmationDialog = ({ open, setOpen, itemTitle, itemName, deleteItem }: Props) => {
  const { t } = useTranslation();
  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteItem = () => {
    setOpen(false);
    deleteItem();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle id="delete-dialog-title">
        {t('Are you shore to delete')} {t(itemName)} ?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">{itemTitle}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('No')}</Button>
        <Button color={'error'} onClick={handleDeleteItem} autoFocus>
          {t('Yes')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
