import { Task, TaskBeautiful } from '../../../redux/boards/boards.types';

const tasks: Record<string, TaskBeautiful> = {
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

export const initialState = {
  // tasks: {
  //   'task-1': { id: 'task-1', title: 'Header', description: 'Header description 1' },
  //   'task-2': { id: 'task-2', title: 'Body', description: 'Body description 2' },
  //   'task-3': { id: 'task-3', title: 'Content', description: 'Content description 3' },
  //   'task-4': { id: 'task-4', title: 'Footer', description: 'Footer description 4' },
  // },
  tasks,
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Backlog',
      description: 'Backlog description',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'Todo',
      description: 'Todo description',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'InProgress',
      description: 'InProgress description',
      taskIds: [],
    },
  },
  // columnOrder: ['column-1', 'column-2'],
  columnOrder: ['column-1', 'column-2', 'column-3'],
};
