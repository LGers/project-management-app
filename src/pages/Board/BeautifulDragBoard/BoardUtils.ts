import { ColumnBeautifulProps, TaskBeautiful } from '../../../redux/boards/boards.types';

export interface ColumnsBeautiful extends ColumnBeautifulProps {
  taskIds: string[];
}

export type Tasks = Record<string, TaskBeautiful>;
export type Columns = Record<string, ColumnsBeautiful>;
export type Boards = Record<string, Record<string, string | string[]>>;

export interface InitialState {
  tasks: Tasks;
  columns: Columns;
  columnOrder: string[];
}

export const initialState: InitialState = {
  tasks: {},
  columns: {},
  columnOrder: [],
};

const tasks: Tasks = {};
const columns: Columns = {};
let columnOrder: string[] = [];

export const createTasksObj = (columnsData: ColumnBeautifulProps[]) => {
  columnOrder = columnsData.map((columnData) => {
    const taskIds = columnData.tasks.map((taskData) => {
      tasks[taskData.id] = taskData;
      return taskData.id;
    });
    columns[columnData.id] = { ...columnData, taskIds };
    return columnData.id;
  });

  return {
    tasks,
    columns,
    columnOrder,
  };
};
