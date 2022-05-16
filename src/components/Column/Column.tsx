import { Button, CardContent, Typography } from '@mui/material';
import React, { ReactElement, useState } from 'react';
import { DragBucket } from '../../redux/boards/boards.types';
import { ColumnCard } from './Column.styles';
import { Droppable, Draggable } from 'react-virtualized-dnd';

interface ColumnProps {
  groupName: string;
  bucket: DragBucket;
  title: string;
  addTask: () => void;
}

export const Column = (props: ColumnProps): ReactElement => {
  const { groupName, bucket, addTask, title } = props;
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
      if (fieldData) {
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
    <Draggable dragAndDropGroup={groupName} draggableId={bucket.id}>
      <Droppable
        containerHeight={600}
        dragAndDropGroup={groupName}
        droppableId={bucket.droppableId}
        key={bucket.droppableId}
      >
        {bucket.items.map((item, i) => (
          <Draggable
            key={`key_${i}`}
            dragAndDropGroup={groupName}
            draggableId={item.id}
            isSectionHeader={item.isHeader || item.isEnd}
            disableMove={item.isEnd}
          >
            <div
              style={{
                border: !item.isEnd ? '1px solid black' : undefined,
                backgroundColor: item.isEnd ? '#EBEBEB' : 'white',
                height: item.isEnd ? 500 - bucket.items.length * 58 : 'inherit',
                fontWeight: item.isHeader ? 600 : 200,
              }}
            >
              <Typography variant={item.isHeader ? 'h5' : 'h6'} component="div">
                {item.name}
              </Typography>
              {i === 0 && <Button onClick={addTask}>Add Task</Button>}
            </div>
          </Draggable>
        ))}
      </Droppable>
    </Draggable>
  );
};
