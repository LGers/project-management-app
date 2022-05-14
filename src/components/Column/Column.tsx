import { Button, CardContent, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Column as ColumnProps } from '../../redux/boards/boards.types';
import { ColumnCard } from './Column.styles';
import { setColumns } from '../../redux/board/board.slice';

export const Column: React.FC<ColumnProps> = (props) => {
  const [showField, setShowField] = useState(false);
  const [inputName, setInputName] = useState('');

  const onFieldBlur = () => {
    setShowField(false);
  };

  const handleFieldKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setInputName('');
      setShowField(false);
    }
    if (event.key === 'Enter') {
      setInputName('');
      setShowField(false);
      if (inputName) {
        // dispatch(
        //   setColumns({ id: 'unknown', title: event.currentTarget.value, tasks: [], order: 999 })
        // );
      }
      // getCardsFromApi({
      //   name: searchString,
      //   filterBy: catalog.filterBy,
      //   page: 1,
      //   catalogLimit: catalog.catalogLimit,
      // });
    }
  };

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
        {showField && <input autoFocus={true} onBlur={onFieldBlur} onKeyUp={handleFieldKeyUp} />}
        <Button onClick={() => setShowField(true)}>Add Task</Button>
      </CardContent>
    </ColumnCard>
  );
};
