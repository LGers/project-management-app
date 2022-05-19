import { Button, Typography } from '@mui/material';
import React, { ReactElement, useState } from 'react';
import { DragBucket } from '../../redux/boards/boards.types';
import { Droppable, Draggable } from 'react-virtualized-dnd';
import { store } from '../../redux';
import { fetchUpdateBoard } from '../../redux/board/board.thunk';
import { TitleField } from '../TitleField';
import { FakeTaskCard } from '../FakeTaskCard/FakeTaskCard';
import { ColumnCard, ColumnCardContent, ColumnTasks } from './Column.styles';

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
    }
  };

  const setField = (value: string) => {
    // todo fetch Update Column
    store.dispatch(fetchUpdateBoard({ boardId: bucket.id, title: value }));
    // store.dispatch(fetchBoards());
  };

  return (
    <Draggable dragAndDropGroup={groupName} draggableId={bucket.id}>
      <ColumnCard>
        <Droppable
          dragAndDropGroup={groupName}
          droppableId={bucket.droppableId}
          key={bucket.droppableId}
          outerScrollBar={true}
          containerHeight={950}
        >
          <TitleField title={title} setField={setFieldData} />
          <Button onClick={addTask}>Add Task</Button>
          {bucket.items.map((item, i) => (
            <Draggable
              key={`key_${i}`}
              dragAndDropGroup={groupName}
              draggableId={item.id}
              isSectionHeader={item.isHeader || item.isEnd}
              disableMove={item.isEnd}
              outerScrollBar={true}
            >
              {!item.isHeader && <FakeTaskCard {...item} />}
              {/*<div
              style={{
                // border: !item.isEnd ? '3px solid blue' : undefined,
                border: !item.isEnd ? '3px solid blue' : '3px solid red',
                height: !item.isEnd ? 'auto' : '50px',
                backgroundColor: item.isEnd ? '#EBEBEB' : 'white',
                // height: item.isEnd ? 200 - bucket.items.length * 58 : 'inherit',
                // // height: '100vh',
                // fontWeight: item.isHeader ? 600 : 200,
                color: 'black',
              }}
            >
              <Typography variant={item.isHeader ? 'h5' : 'h6'} component="div">
                {item.name}
              </Typography>
              {i === 0 && <Button onClick={addTask}>Add Task</Button>}
               {showField && (
                <input autoFocus={true} onBlur={onFieldBlur} onKeyUp={handleFieldKeyUp} />
              )}
              <Button onClick={() => setShowField(true)}>Add Task</Button>
            </div>*/}
            </Draggable>
          ))}
          <Button onClick={addTask}>Add Task</Button>
        </Droppable>
      </ColumnCard>
    </Draggable>
  );
};
