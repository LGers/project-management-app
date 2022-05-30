import { Button, Card } from '@mui/material';
import React, { ReactElement, useState } from 'react';
import { ColumnBeautifulProps, TaskBeautiful } from '../../redux/boards/boards.types';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { store } from '../../redux';
import {
  fetchBoard,
  fetchCreateTask,
  fetchDeleteColumn,
  fetchUpdateColumn,
} from '../../redux/board/board.thunk';
import { TitleField } from '../TitleField';
import { ColumnCard, ColumnHeader, ColumnTasks } from './ColumnBeautiful.styles';
import { Add } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { ConfirmationDialog } from '../ConfirmationDialog';
import { CreateItemDialog } from '../CreateItemDialog';
import { BeautifulTaskCard } from '../BeautifulTaskCard/BeautifulTaskCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface ColumnProps {
  column: ColumnBeautifulProps;
  tasks: TaskBeautiful[];
  index: number;
}

export const ColumnBeautiful = ({ column, tasks, index }: ColumnProps): ReactElement => {
  const board = useSelector((state: RootState) => state.board.boardData);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const { order } = column;
  const boardId = board.id;
  const columnId = column.id;

  const { t } = useTranslation();
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

  const addTaskHandler = (title: string, description: string) => {
    store
      .dispatch(
        fetchCreateTask({
          boardId,
          columnId,
          title,
          description,
          userId,
        })
      )
      .then(() => {
        store.dispatch(fetchBoard(board.id));
      });
  };

  const onDeleteColumn = () => {
    setOpen(true);
  };

  const onClickTask = () => {
    console.log('TaskOpen');
  };

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <ColumnCard
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <ColumnHeader>
            <Card sx={{ height: '30px', bgcolor: '#e1e1e1', width: 400 }} />
            <TitleField title={column.title} setField={onUpdateColumnTitle} />
            <Button onClick={onDeleteColumn}>Delete</Button>
          </ColumnHeader>
          <Droppable droppableId={column.id} type={'task'}>
            {(provided, snapshot) => (
              <ColumnTasks
                elevation={0}
                ref={provided.innerRef}
                {...provided.droppableProps}
                sx={{
                  bgcolor: snapshot.draggingOverWith ? '#bdbdd5' : '#ebebeb',
                  overflow: 'auto',
                }}
              >
                {tasks.map((task, index) => {
                  return (
                    <BeautifulTaskCard
                      key={task.id}
                      task={task}
                      onClick={onClickTask}
                      index={index}
                      columnId={columnId}
                    />
                  );
                })}
                <Button
                  onClick={() => setIsAddTaskOpen(true)}
                  startIcon={<Add />}
                  fullWidth={true}
                  sx={{ justifyContent: 'flex-start' }}
                >
                  {t('Add Task')}
                </Button>
                {provided.placeholder}
              </ColumnTasks>
            )}
          </Droppable>
          <CreateItemDialog
            itemName={'task'}
            open={isAddTaskOpen}
            setOpen={setIsAddTaskOpen}
            createItem={addTaskHandler}
          />
          <ConfirmationDialog
            open={open}
            setOpen={setOpen}
            itemName={'column'}
            itemTitle={column.title}
            deleteItem={deleteColumn}
          />
        </ColumnCard>
      )}
    </Draggable>
  );
};
