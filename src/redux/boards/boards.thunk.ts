import { createAsyncThunk } from '@reduxjs/toolkit';
import { createBoard, deleteBoard, getAllBoards } from '../../api/boards';
import { Board, MyKnownError } from './boards.types';

export const fetchBoards = createAsyncThunk<Array<Board>>(
  'boards/fetchBoards',
  async (props, thunkAPI) => {
    try {
      const res = await getAllBoards();
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as MyKnownError).response.data);
    }
  }
);

export const fetchCreateBoard = createAsyncThunk<Board, { title: string; description: string }>(
  'boards/fetchCreateBoard',
  async (props, thunkAPI) => {
    try {
      const res = await createBoard(props.title, props.description);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as MyKnownError).response.data);
    }
  }
);

export const fetchDeleteBoard = createAsyncThunk<
  { statusCode: number; message: string },
  { id: string }
>('boards/fetchDeleteBoard', async (props, thunkAPI) => {
  try {
    const res = await deleteBoard(props.id);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as MyKnownError).response.data);
  }
});
