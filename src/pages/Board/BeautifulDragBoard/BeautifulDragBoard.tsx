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

  const tasks: TaskBeautiful[] = Object.values(state.tasks);

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

      const newState = {
        ...state,
        columnOrder: newColumnOrder,
      };
      setState(newState);
      return;
    }

    const column = state.columns[source.droppableId];

    return;
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        {/*<Droppable droppableId={board.id}>*/}
        <Droppable droppableId={'board-1'} direction={'horizontal'} type={'column'}>
          {(provided) => (
            <Stack
              direction={'row'}
              spacing={2}
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{ bgcolor: 'blue' }} // todo del it
            >
              {state.columnOrder.map((columnId, index) => {
                const column = state.columns[columnId];
                return (
                  <ColumnBeautiful key={column.id} column={column} tasks={tasks} index={index} />
                );
              })}
              {provided.placeholder}
            </Stack>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
