import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

type Props = {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  boardTitle: string;
  deleteItem: () => void;
};

export const ConfirmationDialog = ({ open, setOpen, boardTitle, deleteItem }: Props) => {
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
      <DialogTitle id="delete-dialog-title">Are you shore to delete board ?</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">{boardTitle}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button color={'error'} onClick={handleDeleteItem} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
