import React, { useState } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { TaskCardProps } from './TaskCardtypes';
import { TaskContent } from './TaskContent';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ConfirmationDialog } from '../ConfirmationDialog';
import { store } from '../../redux';
import { fetchBoard, fetchDeleteTask, fetchUpdateTack } from '../../redux/board/board.thunk';

export const TaskCard = ({ item, boardId, columnId }: TaskCardProps) => {
  const [openContent, setOpenContent] = useState<boolean>(false);
  const [openDel, setOpenDel] = useState<boolean>(false);

  const openDelDialog = () => {
    setOpenDel(true);
  };

  const handleClickOpen = () => {
    setOpenContent(true);
    console.log(item, boardId, columnId);
  };

  const handleClose = () => {
    setOpenContent(false);
  };

  const taskId = item.task.id;
  const userId = item.task.userId;
  const order = item.task.order;
  const onDelTask = () => {
    store.dispatch(fetchDeleteTask({ boardId, columnId, taskId })).then(() => {
      store.dispatch(fetchBoard(boardId));
    });
  };

  const onUpdateTask = (title: string, description: string) => {
    store
      .dispatch(
        fetchUpdateTack({
          boardId,
          columnId,
          taskId,
          title,
          description,
          userId,
          order,
        })
      )
      .then(() => {
        store.dispatch(fetchBoard(boardId));
      });
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}
        >
          <Typography variant={'h6'} component="div">
            {item.name}
          </Typography>
          <Typography variant={'caption'} component="div" sx={{ color: 'GrayText' }}>
            {item.task.description}
          </Typography>
        </Button>
        <IconButton color="error" onClick={openDelDialog}>
          <DeleteForeverIcon fontSize="large" />
        </IconButton>
      </Box>
      <TaskContent
        open={openContent}
        onClose={handleClose}
        openDelDialog={openDelDialog}
        onUpdateTask={onUpdateTask}
        item={item}
        boardId={boardId}
        columnId={columnId}
      />
      <ConfirmationDialog
        open={openDel}
        setOpen={setOpenDel}
        itemName={'task'}
        itemTitle={item.name}
        deleteItem={onDelTask}
      />
    </div>
  );
};
