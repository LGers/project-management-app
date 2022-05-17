import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Dialog, TextField, Typography } from '@mui/material';
import { CANCEL, SUBMIT } from '../../constants/common.dictionary';
import { useTranslation } from 'react-i18next';
// import { ITaskProp } from './Task.types';

export const Task = (/*props: ITaskProp*/) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isTitleBtnVisible, setIsTitleBtnVisible] = useState<boolean>(false);
  const [valueTaskTitle, setValueTaskTitle] = useState<string>('тут будет название таска');
  const [valueTaskPrevTitle, setValueTaskPrevTitle] = useState<string>('');
  const [isDescriptionBtnVisible, setIsDescriptionBtnVisible] = useState<boolean>(false);
  const [valueTaskDescription, setValueTaskDescription] = useState<string>(
    'тут будет описание таска'
  );
  const [valueTaskPrevDescription, setValueTaskPrevDescription] = useState<string>('');
  const { t } = useTranslation();

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const handleDeleteBtn = () => {
    console.log('delete task');
  };

  const handleSetTitle = () => {
    setIsTitleBtnVisible(false);
  };

  const handleCancelSetTitle = () => {
    setIsTitleBtnVisible(false);
    setValueTaskTitle(valueTaskPrevTitle);
  };

  const changeTaskTitle = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValueTaskTitle(event.target.value);
  };

  const focusTitle = () => {
    setIsTitleBtnVisible(true);
    setValueTaskPrevTitle(valueTaskTitle);
  };

  const handleSetDescription = () => {
    setIsDescriptionBtnVisible(false);
  };

  const handleCancelSetDescription = () => {
    setIsDescriptionBtnVisible(false);
    setValueTaskDescription(valueTaskPrevDescription);
  };

  const changeTaskDescription = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValueTaskDescription(event.target.value);
  };

  const focusDescription = () => {
    setIsDescriptionBtnVisible(true);
    setValueTaskPrevDescription(valueTaskDescription);
  };

  return (
    <Dialog onClose={handleCloseDialog} open={isOpen}>
      <Card sx={{ minWidth: '500px' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isTitleBtnVisible && (
              <Box sx={{ display: 'flex', width: '100%' }}>
                <Button variant="contained" onClick={handleSetTitle}>
                  {t(SUBMIT)}
                </Button>
                <Button variant="contained" onClick={handleCancelSetTitle}>
                  {t(CANCEL)}
                </Button>
              </Box>
            )}
            <TextField
              id="outlined-basic"
              variant="outlined"
              value={valueTaskTitle}
              onChange={changeTaskTitle}
              onFocus={focusTitle}
              sx={{ width: '100%' }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isDescriptionBtnVisible && (
              <Box sx={{ display: 'flex', width: '100%' }}>
                <Button variant="contained" onClick={handleSetDescription}>
                  {t(SUBMIT)}
                </Button>
                <Button variant="contained" onClick={handleCancelSetDescription}>
                  {t(CANCEL)}
                </Button>
              </Box>
            )}
            <TextField
              id="filled-basic"
              variant="filled"
              value={valueTaskDescription}
              onChange={changeTaskDescription}
              onFocus={focusDescription}
              sx={{ width: '100%' }}
            />
          </Box>

          <Button variant="contained" onClick={handleDeleteBtn} sx={{ marginTop: '2rem' }}>
            удалить
          </Button>
        </CardContent>
      </Card>
    </Dialog>
  );
};
