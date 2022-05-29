import { Button, Card, Paper } from '@mui/material';
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
import { FakeTaskCard } from '../FakeTaskCard/FakeTaskCard';
import { ColumnCard, ColumnHeader, ColumnTasks } from './ColumnBeautiful.styles';
import { AddTaskCard } from '../AddTaskCard';
import { Add } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { ConfirmationDialog } from '../ConfirmationDialog';
import { CreateItemDialog } from '../CreateItemDialog';
import { BeautifulTaskCard } from '../BeautifulTaskCard/BeautifulTaskCard';
import { _BeautifulTaskCard } from '../BeautifulTaskCard/_BeautifulTaskCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { TaskCard } from '../TaskCard/TaskCard';

interface ColumnProps {
  column: ColumnBeautifulProps;
  tasks: TaskBeautiful[];
  index: number;
}

export const ColumnBeautiful = ({ column, tasks, index }: ColumnProps): ReactElement => {
  const board = useSelector((state: RootState) => state.board.boardData);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const { order, id } = column;
  // console.log(board);
  // console.log('column', column);
  const boardId = board.id;
  const columnId = column.id;

  const { t } = useTranslation();
  // const { addTask, tasks } = props;
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
        // <Card
        //   sx={{
        //     display: 'flex',
        //     flexDirection: 'column',
        //     // bgcolor: 'transparent',
        //   }}
        // >
        <ColumnCard
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <ColumnHeader>
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
                  // pb: '12px',
                  // transition: 'transform 0.05s ease',
                  bgcolor: snapshot.draggingOverWith ? '#bdbdd5' : '#ebebeb',
                  overflow: 'auto',
                }}
              >
                {tasks.map((task, index) => {
                  return (
                    <BeautifulTaskCard
                      key={task.id}
                      task={task}
                      // task={{  }}
                      onClick={onClickTask}
                      index={index}
                      columnId={columnId}
                    />
                    // <p key={task.id}>{task.id}</p>
                  );
                })}
                {/*{isAddTaskOpen && (*/}
                {/*  <AddTaskCard*/}
                {/*    open={isAddTaskOpen}*/}
                {/*    setOpen={setIsAddTaskOpen}*/}
                {/*    addTask={addTaskHandler}*/}
                {/*  />*/}
                {/*)}*/}
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
          {/*{isAddTaskOpen && (
            <AddTaskCard open={isAddTaskOpen} setOpen={setIsAddTaskOpen} addTask={addTaskHandler} />
          )}*/}
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
        // </Card>
      )}
    </Draggable>
  );
};
