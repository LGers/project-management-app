import { useEffect, useState } from 'react';
import { createTasksObj, initialState } from './BoardUtils';
import { ColumnBeautifulProps, TaskBeautiful } from '../../../redux/boards/boards.types';
import { ColumnBeautiful } from '../../../components/ColumnBeautiful';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Stack } from '@mui/material';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';

export interface Props {
  columns: Record<string, ColumnBeautifulProps>;
  newColumnIds: string[];
}

export const BeautifulDragBoard = () => {
  const board = useSelector((state: RootState) => state.board.boardData);

  const [state, setState] = useState(initialState);
  useEffect(() => {
    const newState = createTasksObj(board.columns);
    setState(newState);
  }, [board.columns]);

  // const tasks: TaskBeautiful[] = Object.values(state.tasks);

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
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      // console.log('destination.index', destination.index);
      // console.log('fetchUpdateColumn with order', draggableId + 1);
      console.log('fetchUpdateColumn with order', destination.index + 1);

      const newState = {
        ...state,
        columnOrder: newColumnOrder,
      };
      setState(newState);
      return;
    }

    // const column = state.columns[source.droppableId];
    const startColumn = state.columns[source.droppableId];
    const finishColumn = state.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newTasksIds = Array.from(startColumn.taskIds);
      newTasksIds.splice(source.index, 1);
      newTasksIds.splice(destination.index, 0, draggableId);
      console.log('fetchUpdateTaskInOldColumn with order', destination.index + 1);
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
    console.log('fetchUpdateTaskInNewColumn with order', destination.index + 1);

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
    // <div>
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={'board-1'} direction={'horizontal'} type={'column'}>
        {(provided) => (
          <Stack
            direction={'row'}
            spacing={2}
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              justifyContent: 'flex-start',
              // bgcolor: '#f1f111', // todo del it
              overflow: 'auto',
            }}
          >
            {state.columnOrder.map((columnId, index) => {
              const column = state.columns[columnId];
              const tasks = column.taskIds.map((taskId) => {
                return state.tasks[taskId];
              });
              return (
                <ColumnBeautiful key={column.id} column={column} tasks={tasks} index={index} />
              );
            })}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </DragDropContext>
    // </div>
  );
};
