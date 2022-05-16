import { Button, CardContent, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Column as ColumnProps } from '../../redux/boards/boards.types';
import { ColumnCard } from './Column.styles';
import { TitleField } from '../TitleField';
import { store } from '../../redux';
import { fetchUpdateBoard } from '../../redux/board/board.thunk';

export const Column: React.FC<ColumnProps> = (props) => {
  const [showField, setShowField] = useState(false);
  const [fieldData, setFieldData] = useState('');

  const onFieldBlur = () => {
    setShowField(false);
  };

  const handleFieldKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setFieldData('');
      setShowField(false);
    }
    if (event.key === 'Enter') {
      setFieldData('');
      setShowField(false);
    }
  };

  const setField = (value: string) => {
    // todo fetch Update Column
    store.dispatch(fetchUpdateBoard({ boardId: props.id, title: value }));
    // store.dispatch(fetchBoards());
  };

  return (
    <ColumnCard>
      <CardContent>
        <TitleField title={props.title} setField={setField} />
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
