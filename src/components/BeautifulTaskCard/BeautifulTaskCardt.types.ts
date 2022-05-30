import { DragItem, TaskBeautiful } from '../../redux/boards/boards.types';

export type ITaskItem = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
};

export interface BeautifulTaskProps {
  open: boolean;
  onClose: (value: boolean) => void;
  openDelDialog: () => void;
  onUpdateTask: (newTitle: string, newDescription: string) => void;
  task: TaskBeautiful;
  boardId: string;
  columnId: string;
}

export type TaskCardProps = {
  item: DragItem;
  boardId: string;
  columnId: string;
  onClick: () => void;
};
