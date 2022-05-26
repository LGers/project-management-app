import { useState } from 'react';
import { initialState } from './initData';
import { ColumnBeautifulProps as Column, TaskBeautiful } from '../../../redux/boards/boards.types';
import { ColumnBeautiful } from '../../../components/ColumnBeautiful';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Stack } from '@mui/material';

type Props = {
  // columns: Column[];
};

// export const BeautifulDragBoard = (props: Props) => {
export const BeautifulDragBoard = () => {
  const board = useSelector((state: RootState) => state.board.boardData);
  const userId = useSelector((state: RootState) => state.auth.userId);

  const [state, setState] = useState(initialState);
  const tasks: TaskBeautiful[] = Object.values(state.tasks);
  return (
    <div>
      <p>BeautifulDragBoard</p>
      <Stack direction={'row'} spacing={2}>
        {/*{props.columns.map((column) => (*/}
        {board.columns.map((column) => (
          <ColumnBeautiful key={column.id} column={column} tasks={tasks} />
        ))}
      </Stack>
    </div>
  );
};
