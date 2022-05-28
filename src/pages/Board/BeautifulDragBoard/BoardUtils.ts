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
    // boards: {
    //   // 'board-1': {
    //   //   id: 'board-1',
    //   //   columnIds: [
    //   //     '6218a1a8-f0b9-47db-9c40-2d652ef0d411--',
    //   //     '55f4e7fa-1050-44a0-bddb-d525f5cc51ba',
    //   //     '7a9fdb2f-26d5-474a-8849-dea5f29f6778',
    //   //   ],
    //   // },
    // },
    columnOrder,
  };
};
