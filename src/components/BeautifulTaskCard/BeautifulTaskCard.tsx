import * as React from 'react';
import { Box, Button, Card, Paper, Typography } from '@mui/material';
import { TaskBeautiful } from '../../redux/boards/boards.types';
import { store } from '../../redux';
import { fetchBoard, fetchDeleteTask } from '../../redux/board/board.thunk';
import { ConfirmationDialog } from '../ConfirmationDialog';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

type Props = {
  task: TaskBeautiful;
  onClick: () => void;
};

export const BeautifulTaskCard = ({ task, onClick }: Props) => {
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
    <Card sx={{ p: 0.5, mb: 0.5 }}>
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
  );
};
