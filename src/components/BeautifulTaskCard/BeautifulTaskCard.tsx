import * as React from 'react';
import { Card, IconButton, Typography } from '@mui/material';
import { TaskBeautiful } from '../../redux/boards/boards.types';
import { store } from '../../redux';
import { fetchBoard, fetchDeleteTask, fetchUpdateTack } from '../../redux/board/board.thunk';
import { ConfirmationDialog } from '../ConfirmationDialog';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { BeautifulTaskContent } from './BeautifulTaskContent';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

type Props = {
  task: TaskBeautiful;
  onClick: () => void;
  index: number;
  columnId: string;
};

export const BeautifulTaskCard = ({ task, onClick, index, columnId }: Props) => {
  // const { columnId, /*boardId,*/ title, description } = task;
  const board = useSelector((state: RootState) => state.board.boardData);
  const boardId = board.id;
  const { t } = useTranslation();
  // const [open, setOpen] = useState(false);
  const taskId = task.id;
  const onDelTask = () => {
    store.dispatch(fetchDeleteTask({ boardId, columnId, taskId })).then(() => {
      store.dispatch(fetchBoard(boardId));
    });
  };

  //----
  const [openContent, setOpenContent] = useState<boolean>(false);
  const [openDel, setOpenDel] = useState<boolean>(false);

  const openDelDialog = () => {
    setOpenDel(true);
  };

  const handleClickOpen = () => {
    setOpenContent(true);
  };

  const handleClose = () => {
    setOpenContent(false);
  };

  const userId = task.userId;
  const order = task.order;
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
  //----
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Card
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pt: '10px',
            pb: '10px',
            pl: '10px',
            bgcolor: '#e1e1e1',
            mb: 1,
          }}
        >
          <Card
            variant="outlined"
            onClick={handleClickOpen}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: '100%',
              cursor: 'pointer',
              bgcolor: '#e1e1e1',
              pl: 1,
            }}
          >
            <Typography variant={'h6'} component="div">
              {task.title}
            </Typography>
            <Typography variant={'caption'} component="div" sx={{ color: 'GrayText' }}>
              {task.description}
            </Typography>
            {/*<p>task order: {task.order}</p> /!*todo del it*!/*/}
            {/*<p>task id: {task.id}</p> /!*todo del it*!/*/}
          </Card>
          <IconButton color="error" onClick={openDelDialog}>
            <DeleteForeverIcon fontSize="large" />
          </IconButton>
          <BeautifulTaskContent
            open={openContent}
            onClose={handleClose}
            openDelDialog={openDelDialog}
            onUpdateTask={onUpdateTask}
            task={task}
            boardId={boardId}
            columnId={columnId}
          />
          <ConfirmationDialog
            open={openDel}
            setOpen={setOpenDel}
            itemName={'task'}
            itemTitle={'item.name'}
            deleteItem={onDelTask}
          />
        </Card>
      )}
    </Draggable>
  );
};
