import React, { useState } from 'react';
import { Box, Card, CardContent, Dialog } from '@mui/material';
import { StyledTitleField } from '../BoardTitleField/BoardTitleField.styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { BeautifulTaskProps } from './BeautifulTaskCardt.types';

export const BeautifulTaskContent = (props: BeautifulTaskProps) => {
  const { open, onClose, task, openDelDialog, onUpdateTask } = props;

  const [oldTaskTitle, setOldTaskTitle] = useState<string>(task.title);
  const [newTaskTitle, setNewTaskTitle] = useState<string>(task.title);
  const [focusTitle, setFocusTitle] = useState(false);

  const [isDescriptionBtnVisible, setIsDescriptionBtnVisible] = useState<boolean>(false);
  const [oldTaskDescription, setOldTaskDescription] = useState<string>(task.description);
  const [newTaskDescription, setNewTaskDescription] = useState<string>(task.description);
  const [focusDescription, setFocusDescription] = useState(false);

  const handleCloseTaskContent = () => {
    onClose(false);
    setOldTaskDescription(newTaskDescription);
  };

  const changeTaskTitle = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewTaskTitle(event.target.value);
  };

  const handleTitleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!newTaskTitle) {
        setNewTaskTitle(oldTaskTitle);
        setFocusTitle(false);
      } else {
        setOldTaskTitle(newTaskTitle);
        setNewTaskTitle(newTaskTitle);
        setFocusTitle(false);
        onUpdateTask(newTaskTitle, newTaskDescription);
      }
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      setFocusTitle(false);
      setNewTaskTitle(task.title);
    }
  };

  const onBlurTitleField = () => {
    if (newTaskTitle) {
      onUpdateTask(newTaskTitle, newTaskDescription);
    }
    setFocusTitle(false);
  };

  const changeTaskDescription = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIsDescriptionBtnVisible(true);
    setNewTaskDescription(event.target.value);
  };

  const onBlurDescriptionField = () => {
    setNewTaskDescription(newTaskDescription);
    if (newTaskDescription) {
      onUpdateTask(newTaskTitle, newTaskDescription);
    } else {
      setNewTaskDescription(oldTaskDescription);
    }
    setFocusDescription(false);
    setIsDescriptionBtnVisible(false);
  };

  const handleFocusDescription = () => {
    setOldTaskDescription(newTaskDescription);
    setIsDescriptionBtnVisible(true);
    setFocusDescription(true);
  };

  const handleSetDescription = () => {
    if (newTaskDescription) {
      onUpdateTask(newTaskTitle, newTaskDescription);
    } else {
      setNewTaskDescription(oldTaskDescription);
    }
    setIsDescriptionBtnVisible(false);
  };

  const handleCancelSetDescription = () => {
    setIsDescriptionBtnVisible(false);
    setNewTaskDescription(oldTaskDescription);
  };

  const handleDeleteBtn = () => {
    openDelDialog();
  };

  return (
    <Dialog onClose={handleCloseTaskContent} open={open}>
      <Card sx={{ minWidth: 600 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <StyledTitleField
            value={newTaskTitle}
            onChange={changeTaskTitle}
            onKeyDown={handleTitleKeyDown}
            onFocus={() => setFocusTitle(true)}
            size={'small'}
            multiline
            onBlur={onBlurTitleField}
            focused={focusTitle}
          />

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '2rem',
            }}
          >
            <StyledTitleField
              size={'small'}
              multiline
              value={newTaskDescription}
              onChange={changeTaskDescription}
              onFocus={handleFocusDescription}
              onBlur={onBlurDescriptionField}
              focused={focusDescription}
            />
            {isDescriptionBtnVisible && (
              <Box sx={{ display: 'flex', width: '100%' }}>
                <IconButton color="success" onClick={handleSetDescription}>
                  <CheckCircleOutlineIcon fontSize="large" />
                </IconButton>
                <IconButton color="warning" onClick={handleCancelSetDescription}>
                  <CancelIcon fontSize="large" />
                </IconButton>
              </Box>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <IconButton color="error" onClick={handleDeleteBtn} sx={{ marginTop: '2rem' }}>
              <DeleteForeverIcon fontSize="large" />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Dialog>
  );
};
