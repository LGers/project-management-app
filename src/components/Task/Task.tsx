import React, { useState } from 'react';
import { Button, Card, CardContent, Dialog, TextField, Typography } from '@mui/material';
import { TaskDescription, TaskTitle } from './TaskStyles';
// import { ITaskProp } from './Task.types';

export const Task = (/*props: ITaskProp*/) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [taskTitleChange, setTaskTitleChange] = useState<boolean>(true);
  const [taskDescriptionChange, setTaskDescriptionChange] = useState<boolean>(true);
  const [valueTaskTitle, setValueTaskTitle] = useState<string>('тут будет название таска');
  const [valueTaskDescription, setValueTaskDescription] = useState<string>(
    'тут будет описание таска'
  );

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDeleteBtn = () => {
    console.log('delete task');
  };

  // const changeTaskTitle = () => {
  //   console.log('changeTaskTitle()');
  // };

  const setTitle = () => {
    console.log('setTaskDescriptionDisabled(false)');
  };

  const setDescription = () => {
    console.log('setTaskDescriptionDisabled(false)');
  };

  const changeTaskTitle = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValueTaskTitle(event.target.value);
  };

  const changeTaskDescription = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValueTaskDescription(event.target.value);
  };

  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <Card sx={{ minWidth: '500px' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={valueTaskTitle}
            onChange={changeTaskTitle}
          />
          <TextField
            id="filled-basic"
            variant="filled"
            value={valueTaskDescription}
            onChange={changeTaskDescription}
          />
          {/* <TaskTitle value={'тут будет название таска'} onClick={setTitle} /> */}
          {/* <TaskDescription value={'тут будет описание таска'} onClick={setDescription} /> */}

          <Button variant="contained" onClick={handleDeleteBtn} sx={{ marginTop: '2rem' }}>
            удалить
          </Button>
        </CardContent>
      </Card>
    </Dialog>
  );
};
