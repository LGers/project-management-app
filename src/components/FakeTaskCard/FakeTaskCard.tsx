import * as React from 'react';
import { Card, Typography } from '@mui/material';
import { DragItem } from '../../redux/boards/boards.types';

type Props = {
  name: string;
  id: string;
  isEnd: boolean | undefined;
  isHeader: boolean | undefined;
};
export const FakeTaskCard = (item: DragItem) => {
  return (
    <Card sx={{ p: 0.5, mb: 0.5 }}>
      {!item.isHeader && !item.isEnd && (
        <>
          <p>FakeTaskCard</p>
          <p>item.id: {item.id}</p>
          <p>Order: {item.task.order}</p>
          <Typography variant={'h6'} component="div">
            title: {item.name}
          </Typography>
        </>
      )}
    </Card>
  );
};
