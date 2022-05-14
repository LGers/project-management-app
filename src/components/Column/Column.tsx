import { CardContent, Typography } from '@mui/material';
import React from 'react';
import { Column as ColumnProps } from '../../redux/boards/boards.types';
import { ColumnCard } from './Column.styles';

export const Column: React.FC<ColumnProps> = (props) => {
  return (
    <ColumnCard>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.id}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.order}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Tasks: {JSON.stringify(props.tasks)}
        </Typography>
      </CardContent>
    </ColumnCard>
  );
};
