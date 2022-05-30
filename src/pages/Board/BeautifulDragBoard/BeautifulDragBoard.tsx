import React, { useEffect, useState } from 'react';
import { createTasksObj, initialState } from './BoardUtils';
import { ColumnBeautifulProps } from '../../../redux/boards/boards.types';
import { ColumnBeautiful } from '../../../components/ColumnBeautiful';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../../redux/store';
import { Button, Stack } from '@mui/material';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { BoardContent } from './Board.styles';
import { AddColumnDialog } from '../../../components/AddColumnDialog';
import { useTranslation } from 'react-i18next';
import {
  fetchBoard,
  fetchCreateColumn,
  fetchUpdateColumn,
  fetchUpdateTack,
} from '../../../redux/board/board.thunk';
import { BeautifulTaskProps } from '../../../components/BeautifulTaskCard/BeautifulTaskCardt.types';
import { Add } from '@mui/icons-material';

export interface Props {
  columns: Record<string, ColumnBeautifulProps>;
  newColumnIds: string[];
}
export const BeautifulDragBoard = () => {
  const board = useSelector((state: RootState) => state.board.boardData);

  const errorMessage = useSelector((state: RootState) => state.board.error.message);
  const { t } = useTranslation();
  const [showAddColumnDialog, setShowAddColumnDialog] = useState(false);
  const [state, setState] = useState(initialState);
  useEffect(() => {
    const newState = createTasksObj(board.columns);
    setState(newState);
  }, [board.columns]);

  const addColumn = (title: string) => {
    store.dispatch(fetchCreateColumn({ boardId: board.id, title: title })).then(() => {
      store.dispatch(fetchBoard(board.id));
    });
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index == source.index) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(state.columnOrder);
      const columnId = draggableId;
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      const col = board.columns.find((column) => column.id === columnId);
      const title = col?.title ?? '';

      store
        .dispatch(
          fetchUpdateColumn({
            boardId: board.id,
            columnId: draggableId,
            title,
            order: destination.index + 1,
          })
        )
        .then(() => {
          store.dispatch(fetchBoard(board.id));
        });

      const newState = {
        ...state,
        columnOrder: newColumnOrder,
      };
      setState(newState);
      return;
    }

    const startColumn = state.columns[source.droppableId];
    const finishColumn = state.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newTasksIds = Array.from(startColumn.taskIds);
      const columnId = startColumn.id;
      const taskId = draggableId;
      const task = startColumn.tasks.find((task) => task.id === taskId);
      newTasksIds.splice(source.index, 1);
      newTasksIds.splice(destination.index, 0, draggableId);
      console.log('Col: ', startColumn.title);
      console.log('columnId: ', columnId);
      console.log('taskId', taskId);
      console.log('NewOrder', destination.index + 1);
      console.log('Task order', task?.order);
      // console.log('fetchUpdateTaskInOldColumn with order', destination.index + 1);
      store
        .dispatch(
          fetchUpdateTack({
            boardId: board.id,
            columnId,
            taskId,
            title: task?.title ?? ' ',
            description: task?.description ?? ' ',
            userId: task?.userId ?? ' ',
            order: destination.index + 1,
            // order: task?.order ?? 1,
            // order: 3,
          })
        )
        .then(() => {
          store.dispatch(fetchBoard(board.id));
        });

      const newColumn = {
        ...startColumn,
        taskIds: newTasksIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);
      return;
    }
    // Moving from one list to another
    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);

    const newStartColumn = {
      ...startColumn,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finishColumn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    // console.log('fetchUpdateTaskInNewColumn with order', destination.index + 1);

    const newFinishColumn = {
      ...finishColumn,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    };
    setState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={'board-1'} direction={'horizontal'} type={'column'}>
        {(provided) => (
          <BoardContent ref={provided.innerRef} {...provided.droppableProps}>
            <Stack direction={'row'} sx={{ gap: 2 }}>
              {state.columnOrder.map((columnId, index) => {
                const column = state.columns[columnId];
                const tasks = column.taskIds.map((taskId) => {
                  return state.tasks[taskId];
                });
                return (
                  <ColumnBeautiful key={column.id} column={column} tasks={tasks} index={index} />
                );
              })}
            </Stack>
            <Button
              variant={'contained'}
              color={'success'}
              startIcon={<Add />}
              sx={{
                height: 50,
                minWidth: '230px',
                opacity: 0.85,
              }}
              onClick={() => setShowAddColumnDialog(true)}
            >
              {t('Add column')}
            </Button>
            <AddColumnDialog
              itemName={t('column')}
              open={showAddColumnDialog}
              setOpen={setShowAddColumnDialog}
              addColumn={addColumn}
            />
            {provided.placeholder}
          </BoardContent>
        )}
      </Droppable>
    </DragDropContext>
  );
};
