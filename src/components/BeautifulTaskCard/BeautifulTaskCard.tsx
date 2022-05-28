import * as React from 'react';
import { Box, Button, Card, Paper, Typography } from '@mui/material';
import { TaskBeautiful } from '../../redux/boards/boards.types';
import { store } from '../../redux';
import { fetchBoard, fetchDeleteTask } from '../../redux/board/board.thunk';
import { ConfirmationDialog } from '../ConfirmationDialog';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
  task: TaskBeautiful;
  onClick: () => void;
  index: number;
};

export const BeautifulTaskCard = ({ task, onClick, index }: Props) => {
  const { columnId, boardId, title, description } = task;
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const taskId = task.id;
  const onDelTask = () => {
    store.dispatch(fetchDeleteTask({ boardId, columnId, taskId })).then(() => {
      store.dispatch(fetchBoard(boardId));
    });
  };
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Card
          sx={{ p: 0.5, mb: 0.5 }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Button variant={'contained'} onClick={() => setOpen(true)}>
              {t('Delete Task')}
            </Button>
            <Button onClick={onClick} sx={{ width: '100%' }}>
              <Paper
                elevation={0}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  width: '100%',
                }}
              >
                <Typography variant={'h6'} component="div">
                  title: {title}
                </Typography>
                <Typography>Desc: {description}</Typography>
              </Paper>
            </Button>
          </Box>
          <ConfirmationDialog
            open={open}
            setOpen={setOpen}
            itemName={'task'}
            itemTitle={title}
            deleteItem={onDelTask}
          />
        </Card>
      )}
    </Draggable>
  );
};
