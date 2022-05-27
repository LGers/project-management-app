import { useEffect, useRef, useState } from 'react';
import { createTasksObj, initialState } from './BoardUtils';
import {
  ColumnBeautifulProps,
  ColumnBeautifulProps as Column,
  TaskBeautiful,
} from '../../../redux/boards/boards.types';
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
  // const columns = board.columns; // todo from store

  const [state, setState] = useState(initialState);
  // debugger;
  // const columns = state.columns; // todo from store
  useEffect(() => {
    // debugger;
    const newState = createTasksObj(board.columns);
    setState(newState);
  }, [board.columns]);
  const tasks: TaskBeautiful[] = Object.values(state.tasks);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index == source.index) {
      return;
    }

    const column = state.columns[source.droppableId];
    // const dropBoard = state.boards[source.droppableId];
    const dropBoard = state.boards['board-1'];
    const newColumnIds = Array.from(dropBoard.columnIds);
    newColumnIds.splice(source.index, 1);
    newColumnIds.splice(destination.index, 0, draggableId);
    // debugger;
    const newBoard = {
      ...dropBoard,
      columnIds: newColumnIds,
    };

    // debugger;
    console.log(newColumnIds);
    // const newColumns = createColumnsObj(state.columns, newColumnIds);
    const newState = {
      ...state,
      boards: {
        ...state.boards,
        // [newBoard.id]: newBoard,
        ['board-1']: newBoard,
      },
      columnOrder: newColumnIds,
    };

    setState(newState);
    return;
  };
  console.log('state', state);
  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        {/*<Droppable droppableId={board.id}>*/}
        <Droppable droppableId={'board-1'} direction={'horizontal'} type={'column'}>
          {(provided) => (
            <Stack
              direction={'row'}
              // direction={'column'}
              spacing={2}
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{ bgcolor: 'blue' }}
            >
              {/*const dragBoard = '';*/}
              {/*{columns.map((column, index) => (*/}
              {/*<div>*/}
              {/*{Object.values(columns).map((column, index) => (*/}
              {/*  <ColumnBeautiful key={column.id} column={column} tasks={tasks} index={index} />*/}
              {/*))}*/}
              {state.columnOrder.map((columnId, index) => {
                const column = state.columns[columnId];
                // debugger;
                console.log('columnId', columnId);
                return (
                  // <></>
                  <ColumnBeautiful key={column.id} column={column} tasks={tasks} index={index} />
                );
              })}
              {provided.placeholder}
              {/*</div>*/}
            </Stack>
          )}
          {/*<Stack direction={'row'} spacing={2}>*/}
          {/*  {board.columns.map((column) => (*/}
          {/*    <ColumnBeautiful key={column.id} column={column} tasks={tasks} />*/}
          {/*  ))}*/}
          {/*</Stack>*/}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
