import * as React from 'react';
import { Box, Button, Card, IconButton, Paper, Typography } from '@mui/material';
import { TaskBeautiful } from '../../redux/boards/boards.types';
import { store } from '../../redux';
import { fetchBoard, fetchDeleteTask, fetchUpdateTack } from '../../redux/board/board.thunk';
import { ConfirmationDialog } from '../ConfirmationDialog';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { TaskContent } from '../TaskCard/TaskContent';
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
  const [open, setOpen] = useState(false);
  const taskId = task.id;
  const onDelTask = () => {
    // console.log('boardId', boardId);
    // console.log('columnId', columnId);
    // console.log('taskId', taskId);
    // console.log('task', task);
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
    // console.log(item, boardId, columnId);
    // console.log(task, boardId, columnId);
  };

  const handleClose = () => {
    setOpenContent(false);
  };

  // const taskId = item.task.id;
  // const userId = item.task.userId;
  const userId = task.userId;
  const order = task.order;
  // console.log('userId', userId);
  // console.log('order', order);
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

  // duplicate --- next code
  // const onDelTask = () => {
  //   store.dispatch(fetchDeleteTask({ boardId, columnId, taskId })).then(() => {
  //     store.dispatch(fetchBoard(boardId));
  //   });
  // };
  //----
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          {/*<Card sx={{ height: 20, cursor: 'pointer' }} onClick={handleClickOpen}>
            Task drag me
          </Card>*/}
          <Card
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              pt: '10px',
              pb: '10px',
              pl: '10px',
              bgcolor: '#e1e1e1', // todo del it
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
                {/*{item.name}*/}
              </Typography>
              <Typography variant={'caption'} component="div" sx={{ color: 'GrayText' }}>
                {/*{item.task.description}*/}
                {task.description}
              </Typography>
            </Card>
            <IconButton color="error" onClick={openDelDialog}>
              <DeleteForeverIcon fontSize="large" />
            </IconButton>
          </Card>
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
        </div>
        // <Card
        //   sx={{ p: 0.5, mb: 1.5 }}
        //   {...provided.draggableProps}
        //   {...provided.dragHandleProps}
        //   ref={provided.innerRef}
        // >
        //   <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        //     <Button variant={'contained'} onClick={() => setOpen(true)}>
        //       {t('Delete Task')}
        //     </Button>
        //     <Button onClick={onClick} sx={{ width: '100%' }}>
        //       <Paper
        //         elevation={0}
        //         sx={{
        //           display: 'flex',
        //           flexDirection: 'column',
        //           alignItems: 'flex-start',
        //           justifyContent: 'flex-start',
        //           width: '100%',
        //         }}
        //       >
        //         <Typography variant={'h6'} component="div">
        //           title: {title}
        //         </Typography>
        //         <Typography>Desc: {description}</Typography>
        //       </Paper>
        //     </Button>
        //   </Box>
        //   <ConfirmationDialog
        //     open={open}
        //     setOpen={setOpen}
        //     itemName={'task'}
        //     itemTitle={title}
        //     deleteItem={onDelTask}
        //   />
        // </Card>
      )}
    </Draggable>
  );
};
