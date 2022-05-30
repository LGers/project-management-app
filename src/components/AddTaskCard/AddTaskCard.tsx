import * as React from 'react';
import { Button, IconButton, Stack, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Close } from '@mui/icons-material';
import { AddTaskCardProps } from './AddTaskCard.types';

export const AddTaskCard = ({ setOpen, addTask }: AddTaskCardProps) => {
  const { t } = useTranslation();
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (value) {
      addTask(value, '');
      setValue('');
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleBlurField = () => {
    setOpen(false);
    if (value) {
      addTask(value, '');
      setValue('');
    }
  };

  const handleFieldKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      handleCancel();
    }
  };

  const handleChangeField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <TextField
        fullWidth
        multiline
        minRows={3}
        autoFocus
        value={value}
        onChange={handleChangeField}
        onKeyDown={handleFieldKeyDown}
        placeholder={t('Enter a title for this task..')}
        onBlur={handleBlurField}
        sx={{ backgroundColor: '#fff' }}
      />
      <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
        <Button variant={'contained'} onClick={handleSubmit}>
          {t('Add task')}
        </Button>
        <IconButton aria-label="cancel" size={'medium'} onClick={handleCancel}>
          <Close />
        </IconButton>
      </Stack>
    </div>
  );
};
