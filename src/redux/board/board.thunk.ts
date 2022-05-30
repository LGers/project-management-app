import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBoardById, updateBoard } from '../../api/boards';
import { createColumn, deleteColumn, getAllColumns, updateColumn } from '../../api/columns';
import { createTask, deleteTask, updateTask } from '../../api/tasks';
import { Board, Column, MyKnownError } from '../boards/boards.types';

export const fetchBoard = createAsyncThunk<Board, string>(
  'board/fetchBoard',
  async (id, thunkAPI) => {
    try {
      const res = await getBoardById(id);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as MyKnownError).response.data);
    }
  }
);

export const fetchUpdateBoard = createAsyncThunk<
  Board,
  { boardId: string; title: string; description: string }
>('board/fetchUpdateBoard', async ({ boardId, title, description }, thunkAPI) => {
  try {
    const res = await updateBoard(boardId, title, description);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as MyKnownError).response.data);
  }
});

export const fetchUpdateColumn1 = createAsyncThunk<
  Column,
  { boardId: string; columnId: string; title: string; order: number }
>('board/fetchUpdateBoard', async ({ boardId, columnId, title, order }, thunkAPI) => {
  try {
    const res = await updateColumn(boardId, columnId, title, order);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as MyKnownError).response.data);
  }
});

export const fetchCreateColumn = createAsyncThunk<Column, { boardId: string; title: string }>(
  'board/fetchCreateColumn',
  async ({ boardId, title }, thunkAPI) => {
    try {
      const res = await createColumn(boardId, title);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as MyKnownError).response.data);
    }
  }
);

export const fetchDeleteColumn = createAsyncThunk<Column, { boardId: string; columnId: string }>(
  'board/fetchDeleteColumn',
  async ({ boardId, columnId }, thunkAPI) => {
    try {
      const res = await deleteColumn(boardId, columnId);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as MyKnownError).response.data);
    }
  }
);

type FetchUpdateColumn = { boardId: string; columnId: string; title: string; order: number };

export const fetchUpdateColumn = createAsyncThunk<Column, FetchUpdateColumn>(
  'board/fetchUpdateColumn',
  async ({ boardId, columnId, title, order }, thunkAPI) => {
    try {
      const res = await updateColumn(boardId, columnId, title, order);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as MyKnownError).response.data);
    }
  }
);

export const fetchAllColumns = createAsyncThunk<Column[], { boardId: string }>(
  'board/fetchAllColumns',
  async ({ boardId }, thunkAPI) => {
    try {
      const res = await getAllColumns(boardId);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as MyKnownError).response.data);
    }
  }
);

type FetchCreateTask = {
  boardId: string;
  columnId: string;
  title: string;
  description: string;
  userId: string;
};
export const fetchCreateTask = createAsyncThunk<Column, FetchCreateTask>(
  'board/fetchCreateTask',
  async ({ boardId, columnId, title, description, userId }, thunkAPI) => {
    try {
      const res = await createTask(boardId, columnId, title, description, userId);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as MyKnownError).response.data);
    }
  }
);

type FetchUpdateTack = {
  boardId: string;
  columnId: string;
  taskId: string;
  title: string;
  description: string;
  userId: string;
  order: number;
  newBoardId: string;
  newColumnId: string;
};

export const fetchUpdateTack = createAsyncThunk<Column, FetchUpdateTack>(
  'board/fetchUpdateTack',
  async (
    { boardId, columnId, taskId, title, description, userId, order, newBoardId, newColumnId },
    thunkAPI
  ) => {
    try {
      const res = await updateTask(
        boardId,
        columnId,
        taskId,
        title,
        description,
        userId,
        order,
        newBoardId,
        newColumnId
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as MyKnownError).response.data);
    }
  }
);

type FetchDeleteTaskProps = {
  boardId: string;
  columnId: string;
  taskId: string;
};

export const fetchDeleteTask = createAsyncThunk<Column, FetchDeleteTaskProps>(
  'board/fetchDeleteTask',
  async ({ boardId, columnId, taskId }, thunkAPI) => {
    try {
      const res = await deleteTask(boardId, columnId, taskId);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as MyKnownError).response.data);
    }
  }
);
