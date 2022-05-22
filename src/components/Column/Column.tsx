import { Button } from '@mui/material';
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
import { setDeleteColumn } from '../../redux/board/board.slice';
import { useDispatch } from 'react-redux';
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
  const dispatch = useDispatch();
  const { groupName, bucket, addTask, title, columnId, boardId } = props;
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const setColumnName = (value: string) => {
    store.dispatch(fetchUpdateColumn({ boardId, columnId, title: value, order: props.order }));
    store.dispatch(fetchBoard(boardId));
  };

  const deleteColumn = async () => {
    await store.dispatch(fetchDeleteColumn({ boardId, columnId }));
    // dispatch(setDeleteColumn(columnId));
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
            <TitleField title={title} setField={setColumnName} />
            <Button onClick={onDeleteColumn}>Delete</Button>
            {bucket.items.map((item, i) => (
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
        itemTitle={props.title}
        deleteItem={deleteColumn}
      />
    </div>
  );
};
