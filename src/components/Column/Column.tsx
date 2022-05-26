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
import { ConfirmationDialog } from '../ConfirmationDialog';
import { CreateItemDialog } from '../CreateItemDialog';
import { TaskCard } from '../TaskCard/TaskCard';

interface ColumnProps {
  groupName: string;
  bucket: DragBucket;
  title: string;
  boardId: string;
  columnId: string;
  order: number;
  addTask: (title: string, description: string) => void;
}
const isCrossCheckVersion = true;

export const Column = (props: ColumnProps): ReactElement => {
  const { t } = useTranslation();
  const { groupName, bucket, addTask, title, columnId, boardId, order } = props;
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const onUpdateColumnTitle = (title: string) => {
    store.dispatch(fetchUpdateColumn({ boardId, columnId, title, order })).then(() => {
      store.dispatch(fetchBoard(boardId));
    });
  };

  const deleteColumn = async () => {
    await store.dispatch(fetchDeleteColumn({ boardId, columnId }));
    store.dispatch(fetchBoard(boardId));
  };

  const onDeleteColumn = () => {
    setOpen(true);
  };

  const onClickTask = () => {
    console.log('TaskOpen');
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
            <div style={{ minWidth: 400, height: 60 }}>
              <TitleField title={title} setField={onUpdateColumnTitle} />
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
                  {/* {!item.isHeader && !item.isEnd && (
                    <FakeTaskCard
                      item={item}
                      boardId={boardId}
                      columnId={columnId}
                      onClick={onClickTask}
                    />
                  )} */}
                  {!item.isHeader && !item.isEnd && (
                    <TaskCard
                      item={item}
                      boardId={boardId}
                      columnId={columnId}
                      onClick={onClickTask}
                    />
                  )}
                </Draggable>
              ))}
            {isAddTaskOpen && !isCrossCheckVersion ? (
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
      <CreateItemDialog
        itemName={'task'}
        open={isAddTaskOpen}
        setOpen={setIsAddTaskOpen}
        createItem={addTask}
      />
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
