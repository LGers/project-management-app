import * as React from 'react';
import { Button, Card, Typography } from '@mui/material';
import { DragItem } from '../../redux/boards/boards.types';
import { store } from '../../redux';
import { fetchBoard, fetchDeleteTask } from '../../redux/board/board.thunk';

type Props = {
  item: DragItem;
  boardId: string;
  columnId: string;
};

export const FakeTaskCard = ({ item, boardId, columnId }: Props) => {
  console.log('boardId', boardId);
  console.log('columnId', columnId);
  console.log(item);
  const taskId = item.task.id;
  const onDelTask = () => {
    store.dispatch(fetchDeleteTask({ boardId, columnId, taskId })).then(() => {
      store.dispatch(fetchBoard(boardId));
    });
  };
  return (
    <Card sx={{ p: 0.5, mb: 0.5 }}>
      {!item.isHeader && !item.isEnd && (
        <>
          <Button variant={'contained'} onClick={onDelTask}>
            Delete Fake Task Card
          </Button>
          <p>item.id: {item.id}</p>
          <p>Order: {item.task.order}</p>
          <Typography variant={'h6'} component="div">
            title: {item.name}
          </Typography>
          <p>Desc: {item.task.description}</p>
        </>
      )}
    </Card>
  );
};
