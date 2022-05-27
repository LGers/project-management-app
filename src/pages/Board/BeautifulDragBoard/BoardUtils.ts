import { ColumnBeautifulProps, TaskBeautiful } from '../../../redux/boards/boards.types';

export type Tasks = Record<string, TaskBeautiful>;
export type Columns = Record<string, ColumnBeautifulProps>;
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
    columns[columnData.id] = columnData;
    columnData.tasks.map((taskData) => {
      return (tasks[taskData.id] = taskData);
    });
    return columnData.id;
  });

  return {
    tasks,
    columns,
    boards: {
      'board-1': {
        id: 'board-1',
        columnIds: [
          '6218a1a8-f0b9-47db-9c40-2d652ef0d411',
          '55f4e7fa-1050-44a0-bddb-d525f5cc51ba',
          '7a9fdb2f-26d5-474a-8849-dea5f29f6778',
        ],
      },
    },
    columnOrder,
  };
};
