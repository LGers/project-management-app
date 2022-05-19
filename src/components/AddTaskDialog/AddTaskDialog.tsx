import * as React from 'react';
import { TextareaAutosize, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

type Props = {
  placeholder: string;
};

export const AddTaskDialog = (props: Props) => {
  const { t } = useTranslation();
  return (
    <div>
      <p>bnbnbn</p>
      <p>{props.placeholder}</p>
      <TextField placeholder={t('Enter a title for this task..')} />
    </div>
  );
};
