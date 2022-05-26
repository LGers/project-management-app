import { Button } from '@mui/material';
import React, { ReactElement, useState } from 'react';
import {
  ColumnBeautifulProps,
  DragBucket,
  Task,
  TaskBeautiful,
} from '../../redux/boards/boards.types';
import { Droppable, Draggable } from 'react-virtualized-dnd';
import { store } from '../../redux';
import {
  fetchBoard,
  fetchCreateTask,
  fetchDeleteColumn,
  fetchUpdateColumn,
} from '../../redux/board/board.thunk';
import { TitleField } from '../TitleField';
import { FakeTaskCard } from '../FakeTaskCard/FakeTaskCard';
import { ColumnCard } from './ColumnBeautiful.styles';
import { AddTaskCard } from '../AddTaskCard';
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
}

export const ColumnBeautiful = ({ column, tasks }: ColumnProps): ReactElement => {
  const board = useSelector((state: RootState) => state.board.boardData);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const { order, id } = column;

  const boardId = board.id;
  const columnId = column.id;

  const tasks2 = column.tasks;
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

  const addTaskHandler = (index: number, title: string, description: string) => {
    store
      .dispatch(
        fetchCreateTask({
          boardId: board.id,
          columnId: columnId,
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
    <div>
      <ColumnCard>
        <div style={{ minWidth: 400 }}>
          <TitleField title={column.title} setField={onUpdateColumnTitle} />
          <Button onClick={onDeleteColumn}>Delete</Button>
        </div>
        {tasks.map((task, index) => {
          return <BeautifulTaskCard key={task.id} task={task} onClick={onClickTask} />;
        })}
        {/*{isAddTaskOpen && (
          <AddTaskCard open={isAddTaskOpen} setOpen={setIsAddTaskOpen} addTask={addTaskHandler} />
        )}*/}
      </ColumnCard>
      {/*<CreateItemDialog
        itemName={'task'}
        open={isAddTaskOpen}
        setOpen={setIsAddTaskOpen}
        createItem={addTaskHandler}
        // createItem={addTask}
      />*/}
      <ConfirmationDialog
        open={open}
        setOpen={setOpen}
        itemName={'column'}
        itemTitle={column.title}
        deleteItem={deleteColumn}
      />
    </div>
  );
};
