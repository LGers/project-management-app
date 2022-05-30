import * as React from 'react';
import { Box, Button, Card, Container, Paper, Typography } from '@mui/material';
import { DragItem } from '../../redux/boards/boards.types';
import { store } from '../../redux';
import { fetchBoard, fetchDeleteTask } from '../../redux/board/board.thunk';
import { ConfirmationDialog } from '../ConfirmationDialog';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

type Props = {
  item: DragItem;
  boardId: string;
  columnId: string;
  onClick: () => void;
};

export const FakeTaskCard = ({ item, boardId, columnId, onClick }: Props) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const taskId = item.task.id;
  const onDelTask = () => {
    store.dispatch(fetchDeleteTask({ boardId, columnId, taskId })).then(() => {
      store.dispatch(fetchBoard(boardId));
    });
  };
  return (
    <Card sx={{ p: 0.5, mb: 0.5 }}>
      {!item.isHeader && !item.isEnd && (
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
                title: {item.name}
              </Typography>
              <Typography>Desc: {item.task.description}</Typography>
            </Paper>
          </Button>
        </Box>
      )}
      <ConfirmationDialog
        open={open}
        setOpen={setOpen}
        itemName={'task'}
        itemTitle={item.name}
        deleteItem={onDelTask}
      />
    </Card>
  );
};
