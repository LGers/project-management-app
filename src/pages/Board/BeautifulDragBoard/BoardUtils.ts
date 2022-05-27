import { ColumnBeautifulProps, Task, TaskBeautiful } from '../../../redux/boards/boards.types';

// export const createColumnsObj1 = (
//   columns: Record<string, ColumnBeautifulProps>,
//   newColumnIds: string[]
// ) => {
//   const newObj: Record<string, ColumnBeautifulProps> = {};
//   newColumnIds.map((ids) => {
//     return (newObj[ids] = columns[ids]);
//   });
//   return newObj;
// };
//
// export const createColumnsObj = (
//   columns: Record<string, ColumnBeautifulProps>,
//   newColumnIds: string[]
// ) => {
//   const newObj: Record<string, ColumnBeautifulProps> = {};
//   newColumnIds.map((ids) => {
//     return (newObj[ids] = columns[ids]);
//   });
//   return newObj;
// };
export type Tasks = Record<string, TaskBeautiful>;
export type Columns = Record<string, ColumnBeautifulProps>;
export type Boards = Record<string, Record<string, string | string[]>>;

export interface InitialState {
  tasks: Tasks;
  columns: Columns;
  boards: Boards;
  columnOrder: string[];
}

export const initialState: InitialState = {
  tasks: {},
  columns: {},
  boards: {
    'board-1': {
      id: 'board-1',
      // columnIds: ['column-1', 'column-2', 'column-3'],
      columnIds: [
        '6218a1a8-f0b9-47db-9c40-2d652ef0d411',
        '55f4e7fa-1050-44a0-bddb-d525f5cc51ba',
        '7a9fdb2f-26d5-474a-8849-dea5f29f6778',
      ],
    },
  },
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
  console.log(tasks);
  console.log(columns);
  console.log(columnOrder);
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

export const createColumnsObj = (columns: ColumnBeautifulProps[]) => {
  columns.map((column) => {
    column.tasks.map((task) => {
      return (tasks[task.id] = task);
    });
  });
};

const tasks1: Record<string, TaskBeautiful> = {
  'task-1': {
    id: 'task-1',
    title: 'task1 c2',
    order: 1,
    description: 'd1',
    userId: 'fa335c2b-89c1-4d8e-9faf-a2a4c8982d24',
    boardId: '40cef33e-b9d1-46b0-81fa-4e57e4d0e3b0',
    columnId: '55f4e7fa-1050-44a0-bddb-d525f5cc51ba',
    files: [],
  },
  'task-2': {
    id: 'task-2',
    title: 'task 2',
    order: 2,
    description: 'd2',
    userId: 'fa335c2b-89c1-4d8e-9faf-a2a4c8982d24',
    boardId: '40cef33e-b9d1-46b0-81fa-4e57e4d0e3b0',
    columnId: '55f4e7fa-1050-44a0-bddb-d525f5cc51ba',
    files: [],
  },
  'task-3': {
    id: 'task-3',
    title: 'task 3',
    order: 3,
    description: 'd1',
    userId: 'fa335c2b-89c1-4d8e-9faf-a2a4c8982d24',
    boardId: '40cef33e-b9d1-46b0-81fa-4e57e4d0e3b0',
    columnId: '55f4e7fa-1050-44a0-bddb-d525f5cc51ba',
    files: [],
  },
  'task-4': {
    // id: 'ea8b4980-1566-4b41-a56d-7bb22e08563b',
    id: 'task-4',
    title: 'task 4',
    order: 4,
    description: 'd4',
    userId: 'fa335c2b-89c1-4d8e-9faf-a2a4c8982d24',
    boardId: '40cef33e-b9d1-46b0-81fa-4e57e4d0e3b0',
    columnId: '55f4e7fa-1050-44a0-bddb-d525f5cc51ba',
    files: [],
  },
};

interface DragColumnProps extends ColumnBeautifulProps {
  taskIds: string[];
}
// const columns1: Record<string, ColumnBeautifulProps> = {
//   'column-1': { id: 'column-1', title: 'Backlog', order: 1, tasks: [] },
//   'column-2': { id: 'column-2', title: 'Todo', order: 2, tasks: [] },
//   'column-3': { id: 'column-3', title: 'InProgress', order: 3, tasks: [] },
// };
// // const initColumns = [
// //
// //   ];
// const columns: Record<string, DragColumnProps> = {
//   'column-1': {
//     id: 'column-1',
//     title: 'Backlog',
//     order: 1,
//     tasks: [],
//     taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
//   },
//   'column-2': { id: 'column-2', title: 'Todo', order: 2, tasks: [], taskIds: [] },
//   'column-3': { id: 'column-3', title: 'InProgress', order: 3, tasks: [], taskIds: [] },
// };

export const initialState2 = {
  tasks,
  columns,
  boards: {
    'board-1': {
      id: 'board-1',
      columnIds: ['column-1', 'column-2', 'column-3'],
    },
  },
  // columnOrder: ['column-1', 'column-2', 'column-3'],
  columnOrder,
};
