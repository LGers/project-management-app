import { Button, Typography } from '@mui/material';
import React, { ReactElement, useState } from 'react';
import { DragBucket } from '../../redux/boards/boards.types';
import { Droppable, Draggable } from 'react-virtualized-dnd';
import { store } from '../../redux';
import { fetchBoard, fetchDeleteColumn, fetchUpdateColumn } from '../../redux/board/board.thunk';
import { TitleField } from '../TitleField';
import { FakeTaskCard } from '../FakeTaskCard/FakeTaskCard';
import { ColumnCard } from './Column.styles';
import { AddTaskCard } from '../AddTaskCard';
import { Add } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { ConfirmationDialog } from '../ConfirmationDialog';

interface ColumnProps {
  groupName: string;
  bucket: DragBucket;
  title: string;
  boardId: string;
  columnId: string;
  order: number;
  addTask: () => void;
}

export const Column = (props: ColumnProps): ReactElement => {
  const { t } = useTranslation();
  const { groupName, bucket, addTask, title, columnId, boardId, order } = props;
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const setColumnName = async (value: string) => {
    await store.dispatch(fetchUpdateColumn({ boardId, columnId, title: value, order }));
    store.dispatch(fetchBoard(boardId));
  };

  const deleteColumn = async () => {
    await store.dispatch(fetchDeleteColumn({ boardId, columnId }));
    store.dispatch(fetchBoard(boardId));
  };

  const onDeleteColumn = () => {
    setOpen(true);
  };

  return (
    <div>
      <Draggable dragAndDropGroup={groupName} draggableId={bucket.id}>
        <ColumnCard>
          <Droppable
            dragAndDropGroup={groupName}
            droppableId={bucket.droppableId}
            key={bucket.droppableId}
            outerScrollBar={true}
            containerHeight={950}
          >
            {/* <TitleField title={title} setField={setColumnName} /> */}
            <div style={{ minWidth: 400, height: 60 }}>
              <Typography variant="h5">{title}</Typography>
            </div>
            <Button onClick={onDeleteColumn}>Delete</Button>
            {bucket.items
              .sort((a, b) => a?.task?.order - b?.task?.order)
              .map((item, i) => (
                <Draggable
                  key={`key_${i}`}
                  dragAndDropGroup={groupName}
                  draggableId={item.id}
                  isSectionHeader={item.isHeader || item.isEnd}
                  disableMove={item.isEnd}
                  outerScrollBar={true}
                >
                  {!item.isHeader && !item.isEnd && <FakeTaskCard {...item} />}
                </Draggable>
              ))}
            {isAddTaskOpen ? (
              <AddTaskCard open={isAddTaskOpen} setOpen={setIsAddTaskOpen} addTask={addTask} />
            ) : (
              <Button
                onClick={() => setIsAddTaskOpen(true)}
                startIcon={<Add />}
                fullWidth={true}
                sx={{ justifyContent: 'flex-start' }}
              >
                {t('Add Task')}
              </Button>
            )}
          </Droppable>
        </ColumnCard>
      </Draggable>
      <ConfirmationDialog
        open={open}
        setOpen={setOpen}
        itemName={'column'}
        itemTitle={title}
        deleteItem={deleteColumn}
      />
    </div>
  );
};
