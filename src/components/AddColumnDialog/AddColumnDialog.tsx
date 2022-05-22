import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Close } from '@mui/icons-material';
import * as React from 'react';
import { ChangeEvent, useState } from 'react';

export type Props = {
  itemName: string;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  addColumn: (title: string) => void;
};

export const AddColumnDialog = ({ itemName, open, setOpen, addColumn }: Props) => {
  const { t } = useTranslation();
  const [columnTitle, setColumnTitle] = useState('');

  const handleClose = () => {
    setOpen(false);
    setColumnTitle('');
  };

  const handleAddColumn = () => {
    setOpen(false);
    addColumn(columnTitle);
    setColumnTitle('');
  };

  const handleColumnTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColumnTitle(e.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="add-item-dialog-title">
      <DialogTitle style={{ cursor: 'move' }} id="add-item-dialog-title">
        {t('Add ' + itemName)}
      </DialogTitle>
      <DialogContent sx={{ minWidth: '340px' }}>
        <TextField
          placeholder={t('Enter column title')}
          value={columnTitle}
          onChange={handleColumnTitleChange}
        />
      </DialogContent>
      <DialogActions>
        <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
          <Button variant={'contained'} onClick={handleAddColumn}>
            {t('Add ' + itemName)}
          </Button>
          <IconButton aria-label="cancel" size={'medium'} onClick={handleClose}>
            <Close />
          </IconButton>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
