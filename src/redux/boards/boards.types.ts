export interface MyKnownError {
  message: string;
  statusCode: number;
  error: {
    message: string;
  };
  response: {
    data: {
      message: string;
    };
  };
}

export interface BoardsState {
  isFetching: boolean;
  error: {
    message: string;
    statusCode: number;
  };
  boards: Board[];
}

export interface Files {
  filename: string;
  fileSize: number;
}

export interface Task {
  id: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  files: Files[];
}

export interface Column {
  id: string;
  title: string;
  order: number;
  tasks: Task[];
}

export interface DragItem {
  id: string;
  name: string;
  isHeader?: boolean;
  isEnd?: boolean;
  task: Task;
}

export interface DragBucket {
  id: string;
  column: Column;
  droppableId: string;
  items: DragItem[];
}

export interface DragData {
  droppableId: string;
  draggableId: string;
}

export interface Board {
  id: string;
  title: string;
  description: string;
  columns: Column[];
}
