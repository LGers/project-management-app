import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Dialog, TextareaAutosize } from '@mui/material';
import { StyledTitleField } from '../BoardTitleField/BoardTitleField.styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { DragItem } from '../../redux/boards/boards.types';
import { ITaskProp } from './TaskCardtypes';

const TaskContent = (props: ITaskProp) => {
  const { open, onClose, item } = props;
  const [valueTaskTitle, setValueTaskTitle] = useState<string>(item.name);
  const [valueTaskPrevTitle, setValueTaskPrevTitle] = useState<string>('');
  const [isDescriptionBtnVisible, setIsDescriptionBtnVisible] = useState<boolean>(false);
  const [valueTaskDescription, setValueTaskDescription] = useState<string>(item.task.description);
  const [valueTaskPrevDescription, setValueTaskPrevDescription] = useState<string>('');

  const [focussed, setFocussed] = useState(false);

  const handleCloseDialog = () => {
    onClose(false);
  };

  const handleDeleteBtn = () => {
    console.log('delete task');
  };

  const changeTaskTitle = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValueTaskTitle(event.target.value);
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

  const handleFieldKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.preventDefault();
      if (event.key === 'Enter') {
        setFocussed(false);
      } else {
        setFocussed(false);
        setValueTaskTitle(valueTaskPrevTitle);
      }
    }
  };

  const handlerOnFocusTitle = () => {
    setFocussed(true);
    setValueTaskPrevTitle(valueTaskTitle);
  };

  return (
    <Dialog onClose={handleCloseDialog} open={open}>
      <Card sx={{ minWidth: 600 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <StyledTitleField
            value={valueTaskTitle}
            onChange={changeTaskTitle}
            onKeyDown={handleFieldKeyDown}
            onFocus={handlerOnFocusTitle}
            size={'small'}
            multiline
            onBlur={() => setFocussed(false)}
            focused={focussed}
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
            <TextareaAutosize
              minRows={8}
              aria-label="maximum height"
              placeholder="Maximum 4 rows"
              style={{ width: '100%' }}
              value={valueTaskDescription}
              onChange={changeTaskDescription}
              onFocus={focusDescription}
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
export const TaskCard = (props: { item: DragItem }) => {
  const [openContent, setOpenContent] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpenContent(true);
  };

  const handleClose = () => {
    setOpenContent(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {props.item.name}
      </Button>
      <TaskContent open={openContent} onClose={handleClose} item={props.item} />
    </div>
  );
};
